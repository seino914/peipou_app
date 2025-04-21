'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  // メニューが開いているときはスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'アプリ概要' },
    { href: '/terms', label: '利用規約' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/plans', label: 'プラン' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            PeiPou
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={toggleMenu}
            aria-label="メニュー"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dark Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
                onClick={toggleMenu}
              />
              {/* Slide-out Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-64 bg-white md:hidden"
              >
                <div className="flex justify-end p-4">
                  <motion.button
                    onClick={toggleMenu}
                    className="text-gray-600 hover:text-gray-900"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: index * 0.1,
                        type: 'spring',
                        damping: 20,
                        stiffness: 200,
                      }}
                    >
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        onClick={toggleMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header 
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  searchQuery: z.string().min(1, {
    message: "検索キーワードを入力してください。",
  }),
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        マーケティングリサーチ支援アプリ
      </h1>
      <p className="text-xl text-muted-foreground mb-2">商圏分析、1秒で。</p>
      <p className="text-muted-foreground mb-8">
        検索した地域の人口、飲食店数、イベント件数などの統計データを一括で取得・可視化できる、出店・集客戦略のためのマーケティング支援アプリです。
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 max-w-lg">
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    type="text"
                    placeholder="地域名を入力（例：渋谷、新宿、池袋）" 
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            variant="default"
            size="default"
            className="px-8"
          >
            検索
          </Button>
        </form>
      </Form>
    </main>
  )
}

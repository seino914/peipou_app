import ContactForm from "./contactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              お問い合わせ
            </h1>
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
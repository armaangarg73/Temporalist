import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 md:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-white">Temporalist</h2>

          <p className="mt-3 max-w-sm text-zinc-500">
            AI-powered executive workspace for modern professionals.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-zinc-400">
          <Link href="#features">Features</Link>

          <Link href="#product">Product</Link>

          <Link href="#faq">FAQ</Link>

          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
        © 2026 Temporalist. Built with Next.js, Prisma and OpenAI.
      </div>
    </footer>
  );
}

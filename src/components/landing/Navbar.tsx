import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090B]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>

          <span className="text-xl font-bold tracking-tight">Temporalist</span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm text-zinc-400 md:flex">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#product" className="hover:text-white transition">
            Product
          </a>

          <a href="#how" className="hover:text-white transition">
            How it Works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-600 hover:bg-zinc-900"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium transition hover:bg-violet-500"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

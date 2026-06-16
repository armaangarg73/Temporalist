import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090B]">
      <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a18_1px,transparent_1px),linear-gradient(to_bottom,#27272a18_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-8">
        <div className="grid w-full items-center gap-20 lg:grid-cols-2">

          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-sm text-violet-300">
                Powered by OpenAI + Google
              </span>
            </div>

            <h1 className="max-w-xl text-6xl font-black leading-tight tracking-tight text-white lg:text-7xl">
              AI Executive
              <br />
              Operating
              <br />
              System
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Manage emails, meetings, priorities and daily work from one
              intelligent assistant that thinks before you have to.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-2xl bg-violet-600 px-7 py-4 font-medium transition hover:bg-violet-500"
              >
                Launch Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="#preview"
                className="rounded-2xl border border-zinc-700 px-7 py-4 transition hover:border-violet-500"
              >
                View Product
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-10 text-sm text-zinc-500">
              <span>OpenAI</span>

              <span>Google</span>

              <span>Next.js</span>

              <span>Prisma</span>

              <span>Neon</span>
            </div>
          </div>


          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-violet-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-[#18181B] shadow-2xl">
              <Image
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                width={1600}
                height={1000}
                className="w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

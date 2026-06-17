import { Sparkles } from "lucide-react";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
          <Sparkles className="h-8 w-8 text-violet-400" />
        </div>

        <h1 className="text-3xl font-bold text-white">{title}</h1>

        <p className="mt-3 text-zinc-400">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

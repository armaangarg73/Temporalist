import { auth } from "@/auth";
import { User, Mail } from "lucide-react";

export default async function ProfileCard() {
  const session = await auth();

  const user = session?.user;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h2 className="mb-6 text-xl font-semibold text-white">Profile</h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-500/10 p-3">
            <User className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <p className="text-sm text-zinc-500">Name</p>

            <p className="font-medium text-white">
              {user?.name ?? "Unknown User"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-500/10 p-3">
            <Mail className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <p className="text-sm text-zinc-500">Connected Account</p>

            <p className="font-medium text-white">
              {user?.email ?? "No email"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

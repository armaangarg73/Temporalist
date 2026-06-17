import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090B] px-6">
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to continue to Temporalist"
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}

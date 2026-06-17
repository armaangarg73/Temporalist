import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090B] px-6">
      <AuthCard
        title="Create your account"
        subtitle="Start managing your work with AI"
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}

export default function Divider() {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-zinc-800" />
      </div>

      <div className="relative flex justify-center">
        <span className="bg-[#09090B] px-4 text-sm text-zinc-500">OR</span>
      </div>
    </div>
  );
}

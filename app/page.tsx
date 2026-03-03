import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // Se já está logado, manda direto pro conteúdo
  if (data.user) redirect("/galeria");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-100 px-6">
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto w-28 h-28 rounded-full border border-amber-300/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
          <span className="text-3xl">📖</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
          Bíblia dos Primos
        </h1>
        <p className="mt-4 text-neutral-300 leading-relaxed">
          Um arquivo sagrado de fotos, vídeos e mandamentos do clã.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="px-5 py-3 rounded-xl bg-amber-300 text-neutral-950 font-semibold hover:bg-amber-200 transition"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-5 py-3 rounded-xl border border-neutral-700 hover:border-neutral-500 transition"
          >
            Criar conta
          </Link>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          “Guardar sábado e festas.” 
        </p>
      </div>
    </main>
  );
}
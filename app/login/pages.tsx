import Link from "next/link";
import { loginAction } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { msg?: string };
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 shadow-lg">
        <h1 className="text-3xl font-serif">Entrar</h1>
        {searchParams?.msg ? (
          <p className="mt-2 text-sm text-emerald-300">{searchParams.msg}</p>
        ) : (
          <p className="mt-2 text-sm text-neutral-400">
            Acesse os registros sagrados do clã.
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-amber-300/60"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-amber-300/60"
          />

          <button className="w-full rounded-xl bg-amber-300 py-3 font-semibold text-neutral-950 hover:bg-amber-200 transition">
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-400">
          Não tem conta?{" "}
          <Link className="text-amber-300 hover:underline" href="/register">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
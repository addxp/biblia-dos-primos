"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthState = {
  ok: boolean;
  message?: string;
};

export async function registerAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name) return { ok: false, message: "Digite seu nome." };
  if (!email) return { ok: false, message: "Digite seu email." };
  if (password.length < 6) return { ok: false, message: "A senha precisa ter pelo menos 6 caracteres." };

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    // mensagens comuns: User already registered, Password should be at least...
    return { ok: false, message: error.message };
  }

  // Se confirmação de email estiver ligada, não vem session:
  if (!data.session) {
    return { ok: true, message: "Conta criada! Agora confirme seu email para poder entrar." };
  }

  // Se não exigir confirmação, já pode entrar:
  redirect("/galeria");
}
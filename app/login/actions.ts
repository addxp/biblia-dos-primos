"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { AuthState } from "../register/actions";

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email) return { ok: false, message: "Digite seu email." };
  if (!password) return { ok: false, message: "Digite sua senha." };

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // quando o email não foi confirmado, normalmente vem mensagem relacionada também
    return { ok: false, message: "Não foi possível entrar. Verifique email/senha (e confirme seu email se necessário)." };
  }

  // decide rota por role
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return { ok: false, message: "Falha ao obter usuário. Tente novamente." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "MEMBER";
  if (role === "ADMIN" || role === "SUPERADMIN") redirect("/admin/dashboard");

  redirect("/galeria");
}
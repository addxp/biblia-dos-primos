"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) redirect("/register?error=1");
  if (password.length < 6) redirect("/register?error=2");

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    // email já usado, senha fraca etc.
    redirect("/register?error=3");
  }

  // Se confirmação de email estiver ligada, data.session vem null
  if (!data.session) {
    redirect("/login?msg=Conta criada! Confirme seu email e faça login.");
  }

  // Se não exige confirmação, já entra
  redirect("/galeria");
}
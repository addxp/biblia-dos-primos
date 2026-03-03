"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type State = { ok: boolean; message?: string };

export async function registerAction(
  _prevState: State,
  formData: FormData
): Promise<State> {

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, message: "Preencha todos os campos." };
  }

  if (password.length < 6) {
    return { ok: false, message: "Senha precisa ter pelo menos 6 caracteres." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  if (!data.session) {
    return { ok: true, message: "Conta criada! Verifique seu email." };
  }

  redirect("/galeria");
}
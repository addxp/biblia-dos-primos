import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, name")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role ?? "MEMBER";
  if (role !== "ADMIN" && role !== "SUPERADMIN") redirect("/galeria");

  return (
    <div style={{ color: "white", padding: 24 }}>
      Admin Dashboard — {profile?.name} ({role})
    </div>
  );
}
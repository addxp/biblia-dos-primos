import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type MediaRow = {
  id: string;
  title: string | null;
  file_path: string;
  media_type: "image" | "video";
  created_at: string;
};

export default async function GaleriaPage() {
  const supabase = await createClient();

  // precisa estar logado
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");

  // pega role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, name")
    .eq("id", userData.user.id)
    .single();

  const role = profile?.role ?? "MEMBER";
  const canUpload = role === "ADMIN" || role === "SUPERADMIN";

  // busca mídias
  const { data: media, error } = await supabase
    .from("media")
    .select("id,title,file_path,media_type,created_at")
    .order("created_at", { ascending: false })
    .limit(60);

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-10">
        <h1 className="text-3xl font-serif">Galeria</h1>
        <p className="mt-4 text-red-300 text-sm">
          Erro ao carregar a galeria: {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-10">
      <header className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-serif">Galeria Sagrada</h1>
          <p className="mt-2 text-neutral-400">
            Bem-vindo, <span className="text-amber-300">{profile?.name ?? "Primo"}</span> —{" "}
            <span className="text-neutral-300">{role}</span>
          </p>
        </div>

        <div className="flex gap-2">
          {canUpload ? (
            <Link
              href="/admin/upload"
              className="px-4 py-2 rounded-xl bg-amber-300 text-neutral-950 font-semibold hover:bg-amber-200 transition"
            >
              Fazer upload
            </Link>
          ) : null}

          <Link
            href="/"
            className="px-4 py-2 rounded-xl border border-neutral-800 hover:border-neutral-600 transition"
          >
            Voltar
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto mt-8">
        {!media || media.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
            <p className="text-neutral-300">
              Ainda não tem nada aqui. {canUpload ? "Seja o primeiro a fazer upload 🙏" : "Aguarde um admin postar 🙏"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item: MediaRow) => (
              <MediaCard key={item.id} item={item} supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function MediaCard({
  item,
  supabaseUrl,
}: {
  item: MediaRow;
  supabaseUrl: string;
}) {
  // se seu bucket for público, isso funciona direto:
  // https://<project>.supabase.co/storage/v1/object/public/<bucket>/<file_path>
  const bucket = "bible-media"; // <- MUDE se o nome do seu bucket for outro
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${item.file_path}`;

  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-950/60 overflow-hidden">
      <div className="aspect-video bg-black/40">
        {item.media_type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publicUrl}
            alt={item.title ?? "Imagem"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <video src={publicUrl} controls className="w-full h-full object-cover" />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-neutral-100 line-clamp-1">
          {item.title ?? (item.media_type === "image" ? "Imagem" : "Vídeo")}
        </h3>
        <p className="mt-1 text-xs text-neutral-500">
          {new Date(item.created_at).toLocaleString()}
        </p>
      </div>
    </article>
  );
}
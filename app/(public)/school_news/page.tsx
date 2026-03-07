import { getSchoolNews } from "@/actions/school_news";
import { Container } from "@/components/container";
import { SchoolNewsCard } from "@/components/school-news/school-news-card";
import { cacheLife } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Noticias Escolares | Unidad Educativa Pedro Luis Cedeño",
  description:
    "Mantente informado con las últimas noticias y eventos de nuestra institución educativa.",
};

export default async function SchoolNewsPage() {
  "use cache";
  cacheLife("weeks");

  const result = await getSchoolNews();

  if (!result.success) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Noticias Escolares</h1>
            <p className="text-muted-foreground">
              Error al cargar las noticias. Por favor, intenta más tarde.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  const news = result.data || [];

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Noticias Escolares</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mantente informado con las últimas noticias, eventos y actividades
            de nuestra institución educativa.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No hay noticias disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Link href={`/school_news/${item.slug}`} key={item.id}>
                <SchoolNewsCard {...item} />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

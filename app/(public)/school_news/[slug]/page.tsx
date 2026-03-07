import { getSchoolNewsBySlug } from "@/actions/school_news";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SchoolNewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SchoolNewsDetailPageProps) {
  const { slug } = await params;
  const result = await getSchoolNewsBySlug(slug);

  if (!result.success || !result.data) {
    return null;
  }

  return {
    title: `${result.data.title} | Noticias Escolares`,
    description: result.data.excerpt || result.data.excerpt,
    openGraph: {
      title: result.data.title,
      description: result.data.excerpt || result.data.excerpt,
      images: result.data.coverImageUrl ? [result.data.coverImageUrl] : [],
    },
  };
}

export default async function SchoolNewsDetailPage({
  params,
}: SchoolNewsDetailPageProps) {
  const { slug } = await params;
  const result = await getSchoolNewsBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const news = result.data;

  return (
    <div className="min-h-screen">
      <Container className="py-12">
        <div className="mb-8">
          <Link href="/school_news">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Noticias
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {news.coverImageUrl && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={news.coverImageUrl}
                alt={news.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            </div>
          )}

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">
                {news.createdAt.toLocaleDateString("es", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {news.title}
            </h1>

            {news.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {news.content}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {news.createdBy?.name && (
                <span>Publicado por {news.createdBy.name}</span>
              )}
            </div>
          </header>
        </article>
      </Container>
    </div>
  );
}

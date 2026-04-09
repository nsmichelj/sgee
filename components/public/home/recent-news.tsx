import { Container } from "@/components/container";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTag,
  SectionTitle,
} from "@/components/public/section";
import { SchoolNewsCard } from "@/components/school-news/school-news-card";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { cacheLife } from "next/cache";
import Link from "next/link";

export async function RecentNews() {
  "use cache";
  cacheLife("weeks");

  const news = await db.query.schoolNews.findMany({
    orderBy: (t, { desc }) => desc(t.createdAt),
    with: {
      createdBy: {
        columns: {
          name: true,
        },
      },
    },
    limit: 3,
  });

  if (news.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader>
          <SectionTag>Noticias y Eventos</SectionTag>
          <SectionTitle>Últimas Actualizaciones</SectionTitle>
          <SectionDescription>
            Mantente al tanto de los acontecimientos más importantes y las
            novedades de nuestra comunidad educativa.
          </SectionDescription>
        </SectionHeader>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Link
              href={`/school_news/${item.slug}`}
              key={item.id}
              className="group"
            >
              <SchoolNewsCard {...item} />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white"
            asChild
          >
            <Link href="/school_news">Explorar todas las noticias</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

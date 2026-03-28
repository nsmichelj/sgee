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
    <Section className="bg-background">
      <Container>
        <SectionHeader>
          <SectionTag>Noticias</SectionTag>
          <SectionTitle>Últimas Noticias</SectionTitle>
          <SectionDescription>
            Mantente al día con las noticias más recientes de nuestra
            institución educativa.
          </SectionDescription>
        </SectionHeader>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Link href={`/school_news/${item.slug}`} key={item.id}>
              <SchoolNewsCard {...item} />
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/school_news">
            <Button>Ver todas las noticias</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

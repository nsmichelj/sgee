import { Container } from "@/components/container";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTag,
  SectionTitle,
} from "@/components/public/section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import db from "@/lib/db";
import { photos as photosTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { cacheLife } from "next/cache";
import Image from "next/image";

export async function Gallery() {
  "use cache";
  cacheLife("max");

  const photos = await db
    .select()
    .from(photosTable)
    .where(eq(photosTable.isPublic, true))
    .orderBy(desc(photosTable.createdAt))
    .limit(8);

  if (photos.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        <SectionHeader className="text-center">
          <SectionTag>Vida Escolar</SectionTag>
          <SectionTitle>Momentos que construyen recuerdos</SectionTitle>
          <SectionDescription>
            Cada imagen refleja el compromiso, la alegría y el aprendizaje que
            vivimos día a día en nuestra comunidad educativa.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              </DialogTrigger>
              <DialogContent
                className="w-full max-w-7xl border-0 bg-transparent p-0 shadow-none"
                showCloseButton={false}
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>Galería de Momentos</DialogTitle>
                  <DialogDescription>Galería de Momentos</DialogDescription>
                </DialogHeader>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={photo.url}
                    fill
                    alt={photo.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </Container>
    </Section>
  );
}

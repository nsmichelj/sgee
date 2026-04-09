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
    <Section className="bg-muted/10">
      <Container>
        <SectionHeader className="text-center">
          <SectionTag>Galería</SectionTag>
          <SectionTitle>Momentos en Nuestra Comunidad</SectionTitle>
          <SectionDescription>
            Una ventana a las actividades, el aprendizaje y la alegría que
            compartimos día tras día.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm border border-white hover:shadow-md transition-shadow">
                  <Image
                    src={photo.url}
                    alt={photo.title || "Imagen de la galería"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
                </div>
              </DialogTrigger>
              <DialogContent
                className="w-[95vw] max-w-5xl border-0 bg-transparent p-0 shadow-none outline-none"
                showCloseButton={false}
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>
                    {photo.title || "Galería de Momentos"}
                  </DialogTitle>
                  <DialogDescription>Galería de Momentos</DialogDescription>
                </DialogHeader>
                <div className="relative aspect-video bg-black/90 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={photo.url}
                    fill
                    alt={photo.title || "Imagen de la galería"}
                    className="object-contain"
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

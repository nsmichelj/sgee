import { Container } from "@/components/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cacheLife } from "next/cache";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTag,
  SectionTitle,
} from "../section";

const images = Array(8).fill(0);

export async function Gallery() {
  "use cache";
  cacheLife("max");

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
          {images.map((_, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="aspect-square bg-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">
                      2026-{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
                <DialogHeader className="sr-only">
                  <DialogTitle>Galería de Momentos</DialogTitle>
                  <DialogDescription>Galería de Momentos</DialogDescription>
                </DialogHeader>

                <div className="aspect-square bg-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">
                      2026-{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </Container>
    </Section>
  );
}

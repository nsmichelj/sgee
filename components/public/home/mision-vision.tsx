import { Container } from "@/components/container";
import Image from "next/image";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTag,
  SectionTitle,
} from "../section";

export function MisionVision() {
  return (
    <Section className="overflow-hidden">
      <Container className="space-y-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/mision.jpeg"
                fill
                alt="Misión Institucional"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-0" />
          </div>

          <div className="w-full md:w-1/2">
            <SectionHeader className="text-start justify-start mb-0">
              <SectionTag>Nuestra Misión</SectionTag>
              <SectionTitle className="text-3xl md:text-4xl lg:text-5xl mb-6">
                Brindar una educación de calidad
              </SectionTitle>
              <SectionDescription className="text-lg leading-relaxed">
                Nos comprometemos a ofrecer una formación académica sólida que
                promueva el pensamiento crítico, la creatividad y el respeto,
                acompañando a cada estudiante en su desarrollo personal y
                social.
              </SectionDescription>
            </SectionHeader>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/vision.jpeg"
                fill
                alt="Visión Institucional"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-2xl z-0 rotate-12" />
          </div>

          <div className="w-full md:w-1/2">
            <SectionHeader className="text-start justify-start mb-0">
              <SectionTag>Nuestra Visión</SectionTag>
              <SectionTitle className="text-3xl md:text-4xl lg:text-5xl mb-6">
                Ser un referente en formación integral
              </SectionTitle>
              <SectionDescription className="text-lg leading-relaxed">
                Aspiramos a formar estudiantes seguros, responsables y
                preparados para los desafíos del futuro, integrando excelencia
                académica, innovación pedagógica y una sólida educación en
                valores.
              </SectionDescription>
            </SectionHeader>
          </div>
        </div>
      </Container>
    </Section>
  );
}

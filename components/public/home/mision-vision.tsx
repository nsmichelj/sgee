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
    <Section>
      <Container className="space-y-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full h-62 rounded-lg overflow-hidden">
            <Image
              src="/mision.jpeg"
              fill
              alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
              className="w-auto h-auto object-cover"
            />
          </div>

          <SectionHeader className="text-start justify-start mb-0">
            <SectionTag>Misión</SectionTag>
            <SectionTitle>Brindar una educación de calidad</SectionTitle>
            <SectionDescription>
              Nos comprometemos a ofrecer una formación académica sólida que
              promueva el pensamiento crítico, la creatividad y el respeto,
              acompañando a cada estudiante en su desarrollo personal y social.
            </SectionDescription>
          </SectionHeader>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <SectionHeader className="text-start justify-start mb-0 order-2">
            <SectionTag>Visión</SectionTag>
            <SectionTitle>
              Ser una institución educativa referente en formación integral y
              valores
            </SectionTitle>
            <SectionDescription>
              Aspiramos a formar estudiantes seguros, responsables y preparados
              para los desafíos del futuro, integrando excelencia académica,
              innovación pedagógica y una sólida educación en valores.
            </SectionDescription>
          </SectionHeader>
          <div className="relative w-full h-62 rounded-lg overflow-hidden order-1 md:order-3">
            <Image
              src="/vision.jpeg"
              fill
              alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
              className="w-auto h-auto object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

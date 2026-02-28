import { Container } from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cacheLife } from "next/cache";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTag,
  SectionTitle,
} from "../section";

const team = [
  {
    fullName: "Dr. Carlos Menendez",
    role: "Director General",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    initials: "CM",
  },
  {
    fullName: "Dra. Lucia Rivera",
    role: "Directora Académica",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    initials: "LR",
  },
  {
    fullName: "Prof. Alberto Soto",
    role: "Coordinador de Proyectos",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    initials: "AS",
  },
];

export async function Leadership() {
  "use cache";
  cacheLife("max");

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTag>Autoridades</SectionTag>
          <SectionTitle>Comprometidos con la educación de calidad</SectionTitle>
          <SectionDescription>
            Profesionales comprometidos con la excelencia de nuestra comunidad
            educativa
          </SectionDescription>
        </SectionHeader>

        <div className="flex flex-wrap gap-16 justify-center items-start">
          {team.map((member) => (
            <div key={member.fullName} className="text-center">
              <Avatar className="size-32 mx-auto mb-4">
                <AvatarImage src={member.image} alt={member.fullName} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="size-10" />
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-foreground text-sm md:text-base">
                {member.fullName}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

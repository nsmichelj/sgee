import { Container } from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import db from "@/lib/db";
import { authorities } from "@/lib/db/schema";
import { User } from "lucide-react";
import { cacheLife } from "next/cache";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTag,
  SectionTitle,
} from "../section";

export async function Leadership() {
  "use cache";
  cacheLife("max");

  const team = await db.select().from(authorities);

  if (team.length === 0) {
    return null;
  }

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
                <AvatarImage
                  src={member.photoUrl || ""}
                  alt={member.fullName}
                />
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

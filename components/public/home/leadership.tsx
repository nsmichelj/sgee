import { Container } from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
    <Section className="bg-muted/30">
      <Container>
        <SectionHeader>
          <SectionTag>Nuestras Autoridades</SectionTag>
          <SectionTitle>Comprometidos con la excelencia educativa</SectionTitle>
          <SectionDescription>
            Un equipo de profesionales dedicados a guiar a nuestra comunidad
            hacia el éxito académico y humano.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.fullName}>
              <CardContent className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <Avatar className="size-32 border-4 border-primary/10">
                    <AvatarImage
                      src={member.photoUrl || ""}
                      alt={member.fullName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/5 text-primary">
                      <User className="size-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">
                  {member.fullName}
                </h3>
                <p className="text-primary font-medium text-sm border-t border-primary/10 pt-2 w-full mt-2">
                  {member.role}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderBadge,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";
import { ListSchoolNews } from "@/components/school-news/school-news-table";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function SchoolarNewsPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Configuracion Academica</PanelHeaderBadge>
          <PanelTitle>
            Gestiona tus{" "}
            <span className="text-primary">Periodos Escolares</span>
          </PanelTitle>
          <PanelDescription>
            Organiza los ciclos educativos y lapsos pedagógicos para el control
            académico de la institución.
          </PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <Button asChild>
            <Link href="/dashboard/school_news/create">
              <Newspaper /> Crear Noticia
            </Link>
          </Button>
        </PanelHeaderActions>
      </PanelHeader>

      <div>
        <ListSchoolNews />
      </div>
    </PanelContainer>
  );
}

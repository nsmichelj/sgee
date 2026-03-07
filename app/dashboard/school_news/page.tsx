import {
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/dashboard/panel";
import { ListSchoolNews } from "@/components/school-news/school-news-table";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function SchoolarNewsPage() {
  return (
    <div>
      <PanelHeader>
        <PanelTitle>Gestión de Noticias Escolares</PanelTitle>
        <PanelDescription>
          Administra las noticias escolares de la institución.
        </PanelDescription>
        <Button asChild>
          <Link href="/dashboard/school_news/create">
            <Newspaper /> Crear Noticia
          </Link>
        </Button>
      </PanelHeader>

      <ListSchoolNews />
    </div>
  );
}

"use client";

import { createSchoolNewsAction } from "@/actions/school_news";
import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderBadge,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";
import { SchoolNewsForm } from "@/components/school-news/school-news-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { schoolNewsFormSchema } from "@/lib/validations/school_news";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateSchoolarNewsPage() {
  const mutation = useMutation({
    mutationFn: createSchoolNewsAction,
  });

  const onCreateSchoolNews = async (formData: schoolNewsFormSchema) => {
    const { success } = await mutation.mutateAsync({
      ...formData,
    });

    return {
      success,
    };
  };

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Noticias</PanelHeaderBadge>
          <PanelTitle>
            Crear <span className="text-primary">Noticia Escolar</span>
          </PanelTitle>
          <PanelDescription>Crea una noticia escolar</PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <Button asChild>
            <Link href="/dashboard/school_news">
              <ArrowLeft /> Volver
            </Link>
          </Button>
        </PanelHeaderActions>
      </PanelHeader>

      <Card>
        <CardContent>
          <SchoolNewsForm
            onSubmit={onCreateSchoolNews}
            resetAfterSubmit={true}
          />
        </CardContent>
      </Card>
    </PanelContainer>
  );
}

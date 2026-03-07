"use client";

import { createSchoolNewsAction } from "@/actions/school_news";
import {
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/dashboard/panel";
import { SchoolNewsForm } from "@/components/school-news/school-news-form";
import { Card, CardContent } from "@/components/ui/card";
import { schoolNewsFormSchema } from "@/lib/validations/school_news";
import { useMutation } from "@tanstack/react-query";

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
    <div>
      <PanelHeader>
        <PanelTitle>Crear Noticia Escolar</PanelTitle>
        <PanelDescription>Crea una noticia escolar</PanelDescription>
      </PanelHeader>

      <Card>
        <CardContent>
          <SchoolNewsForm
            onSubmit={onCreateSchoolNews}
            resetAfterSubmit={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}

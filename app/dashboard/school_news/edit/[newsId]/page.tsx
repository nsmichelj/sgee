"use client";

import {
  getSchoolNewsById,
  updateSchoolNewsAction,
} from "@/actions/school_news";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function EditSchoolNewsPage() {
  const queryClient = useQueryClient();

  const { newsId } = useParams<{
    newsId: string;
  }>();

  const { data: news, isLoading } = useQuery({
    queryKey: ["school_news", newsId],
    queryFn: () => getSchoolNewsById(newsId),
    enabled: !!newsId,
  });

  const currentNews = news?.data;

  const invalidateProduct = () => {
    queryClient.invalidateQueries({ queryKey: ["school_news", newsId] });
  };

  const updateMutation = useMutation({
    mutationFn: async (formData: schoolNewsFormSchema) => {
      const response = await updateSchoolNewsAction(formData);
      if (!response.success) throw new Error("Error al actualizar");
      return response;
    },
    onSuccess: () => invalidateProduct(),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = async (formData: schoolNewsFormSchema) => {
    const result = await updateMutation.mutateAsync(formData);
    return { success: result.success };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-4 min-h-full">
        <Loader2 className="animate-spin size-12 text-primary" />
        <p className="text-muted-foreground animate-pulse">
          Cargando información de la noticia escolar
        </p>
      </div>
    );
  }

  if (!currentNews) {
    return null;
  }

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Noticias</PanelHeaderBadge>
          <PanelTitle>
            Editar <span className="text-primary">Noticia Escolar</span>
          </PanelTitle>
          <PanelDescription>
            Actualiza la información de la noticia escolar
          </PanelDescription>
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
            onSubmit={handleUpdate}
            initialData={{
              ...currentNews,
              coverImageUrl: currentNews.coverImageUrl ?? undefined,
            }}
          />
        </CardContent>
      </Card>
    </PanelContainer>
  );
}

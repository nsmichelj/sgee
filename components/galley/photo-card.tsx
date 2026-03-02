"use client";

import { deletePhotoAction, updatePhotoAction } from "@/actions/gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { photoFormSchema } from "@/lib/validations/gallery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings, Trash } from "lucide-react";
import Image from "next/image";
import { PhotoForm } from "./photo-form";

interface PhotoCardProps {
  id: string;
  title: string;
  caption: string | null;
  url: string;
  isPublic: boolean;
}

export default function PhotoCard({
  id,
  title,
  caption,
  url,
  isPublic,
}: PhotoCardProps) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updatePhotoAction,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePhotoAction,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const updatePhoto = async (formData: photoFormSchema) => {
    const { success } = await updateMutation.mutateAsync(formData);
    return {
      success: success,
    };
  };

  const deletePhoto = async () => {
    const { success } = await deleteMutation.mutateAsync(id);
    return {
      success: success,
    };
  };

  return (
    <Card className="overflow-hidden p-0 pb-6">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image src={url} alt={title} fill className="object-cover" />
        <Badge
          variant={isPublic ? "default" : "secondary"}
          className={"absolute top-3 left-3"}
        >
          {isPublic ? "PUBLICA" : "PRIVADA"}
        </Badge>
      </div>

      <CardContent>
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <CardFooter className="gap-4 justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings /> Configurar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subir Nueva Foto</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <PhotoForm
              initialData={{
                id,
                title,
                caption,
                url,
                isPublic,
              }}
              onSubmit={updatePhoto}
            />
          </DialogContent>
        </Dialog>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            deletePhoto();
          }}
        >
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { createPhotoAction } from "@/actions/gallery";
import { photoFormSchema } from "@/lib/validations/gallery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PhotoForm } from "./photo-form";

export function CreatePhotoModal() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPhotoAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const createPhoto = async (formData: photoFormSchema) => {
    const { success } = await mutation.mutateAsync(formData);
    return {
      success: success,
    };
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Upload /> Subir Nueva Foto
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subir Nueva Foto</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <PhotoForm onSubmit={createPhoto} resetAfterSubmit />
        </DialogContent>
      </Dialog>
    </div>
  );
}

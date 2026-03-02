"use client";

import { createAuthorityAction } from "@/actions/authorities";
import { authorityFormSchema } from "@/lib/validations/authorities";
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
import { AuthorityForm } from "./authority-form";

export function CreateAuthoritiesModal() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAuthorityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authorities"] });
    },
  });

  const createPhoto = async (formData: authorityFormSchema) => {
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
            <Upload /> Agregar Autoridad
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Agregar Autoridad</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <AuthorityForm onSubmit={createPhoto} resetAfterSubmit />
        </DialogContent>
      </Dialog>
    </div>
  );
}

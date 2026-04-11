"use client";

import { createPersonalAction } from "@/actions/personal";
import { personalFormSchema } from "@/lib/validations/personal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PersonalForm } from "./personal-form";

export function CreatePersonalModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPersonalAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
      setOpen(false);
    },
  });

  const handleSubmit = async (formData: personalFormSchema) => {
    const { success } = await mutation.mutateAsync(formData);
    return {
      success: !!success,
    };
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Registrar Personal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Personal</DialogTitle>
          <DialogDescription>
            Ingrese los datos del nuevo miembro del personal institucional.
          </DialogDescription>
        </DialogHeader>
        <PersonalForm onSubmit={handleSubmit} resetAfterSubmit />
      </DialogContent>
    </Dialog>
  );
}

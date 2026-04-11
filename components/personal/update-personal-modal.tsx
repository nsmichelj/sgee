"use client";

import { updatePersonalAction } from "@/actions/personal";
import { personalFormSchema } from "@/lib/validations/personal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { PersonalForm } from "./personal-form";

interface UpdatePersonalModalProps {
  personal: personalFormSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdatePersonalModal({
  personal,
  open,
  onOpenChange,
}: UpdatePersonalModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePersonalAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
      onOpenChange(false);
    },
  });

  const handleSubmit = async (formData: personalFormSchema) => {
    const { success } = await mutation.mutateAsync({
      ...formData,
      id: personal.id,
    });
    return {
      success: !!success,
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Actualizar Personal</DialogTitle>
          <DialogDescription>
            Modifique la información del miembro del personal.
          </DialogDescription>
        </DialogHeader>
        <PersonalForm initialData={personal} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

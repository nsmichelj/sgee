"use client";

import { createStudentAction } from "@/actions/students";
import { studentFormSchema } from "@/lib/validations/students";
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
import { StudentForm } from "./student-form";

export function CreateStudentModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createStudentAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setOpen(false);
    },
  });

  const handleSubmit = async (formData: studentFormSchema) => {
    const { success } = await mutation.mutateAsync(formData);
    return {
      success: !!success,
    };
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Registrar Estudiante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Estudiante</DialogTitle>
          <DialogDescription>
            Ingrese los datos del estudiante para la inscripción.
          </DialogDescription>
        </DialogHeader>
        <StudentForm onSubmit={handleSubmit} resetAfterSubmit />
      </DialogContent>
    </Dialog>
  );
}

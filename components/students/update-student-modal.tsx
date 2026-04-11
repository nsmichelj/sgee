"use client";

import { updateStudentAction } from "@/actions/students";
import { studentFormSchema } from "@/lib/validations/students";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { StudentForm } from "./student-form";

interface UpdateStudentModalProps {
  student: studentFormSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateStudentModal({
  student,
  open,
  onOpenChange,
}: UpdateStudentModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateStudentAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onOpenChange(false);
    },
  });

  const handleSubmit = async (formData: studentFormSchema) => {
    const { success } = await mutation.mutateAsync({
      ...formData,
      id: student.id,
    });
    return {
      success: !!success,
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Actualizar Estudiante</DialogTitle>
          <DialogDescription>
            Modifique la información del estudiante.
          </DialogDescription>
        </DialogHeader>
        <StudentForm initialData={student} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

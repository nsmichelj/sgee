"use client";

import { deleteStudentAction } from "@/actions/students";
import { Button } from "@/components/ui/button";
import { studentFormSchema } from "@/lib/validations/students";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { UpdateStudentModal } from "../update-student-modal";

export function StudentActions({ student }: { student: studentFormSchema }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!student.id) return;
      return deleteStudentAction(student.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsUpdateModalOpen(true)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => {
          if (confirm("¿Está seguro de que desea eliminar este registro?")) {
            deleteMutation.mutate();
          }
        }}
        disabled={deleteMutation.isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {isUpdateModalOpen && (
        <UpdateStudentModal
          open={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
          student={student}
        />
      )}
    </div>
  );
}

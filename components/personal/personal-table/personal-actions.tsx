"use client";

import { deletePersonalAction } from "@/actions/personal";
import { Button } from "@/components/ui/button";
import { personalFormSchema } from "@/lib/validations/personal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { UpdatePersonalModal } from "../update-personal-modal";

export function PersonalActions({
  personal,
}: {
  personal: personalFormSchema;
}) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!personal.id) return;
      return deletePersonalAction(personal.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
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
        <UpdatePersonalModal
          open={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
          personal={personal}
        />
      )}
    </div>
  );
}

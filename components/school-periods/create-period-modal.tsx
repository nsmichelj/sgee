"use client";

import { createSchoolPeriodAction } from "@/actions/school-periods";
import { schoolPeriodSchema } from "@/lib/validations/school-period";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarPlus } from "lucide-react";
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
import { SchoolPeriodForm } from "./school-period-form";

export function CreateSchoolPeriodModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSchoolPeriodAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-periods"] });
      setOpen(false);
    },
  });

  const handleSubmit = async (formData: schoolPeriodSchema) => {
    const { success } = await mutation.mutateAsync(formData);
    return { success };
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus /> Registrar Año Escolar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Año Escolar</DialogTitle>
          <DialogDescription>
            Complete el formulario para registrar un nuevo año escolar.
          </DialogDescription>
        </DialogHeader>
        <SchoolPeriodForm onSubmit={handleSubmit} resetAfterSubmit />
      </DialogContent>
    </Dialog>
  );
}

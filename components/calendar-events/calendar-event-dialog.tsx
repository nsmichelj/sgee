"use client";

import {
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from "@/actions/calendar-events";
import type { calendarEventSchema } from "@/lib/validations/calendar-events";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CalendarEventForm } from "./calendar-event-form";

interface CalendarEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialData?: Partial<calendarEventSchema> & { id?: string };
  defaultDate?: Date;
  dateRange?: { start: Date; end: Date };
}

export function CalendarEventDialog({
  open,
  onOpenChange,
  mode,
  initialData,
  defaultDate,
  dateRange,
}: CalendarEventDialogProps) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const effectiveInitial: Partial<calendarEventSchema> = initialData ?? {
    startDate: defaultDate,
    endDate: defaultDate,
  };

  const handleSubmit = async (values: calendarEventSchema) => {
    let result: { success: boolean; error?: string };

    if (mode === "edit" && initialData?.id) {
      result = await updateCalendarEvent(initialData.id, values);
    } else {
      result = await createCalendarEvent(values);
    }

    if (result.success) {
      toast.success(
        mode === "edit"
          ? "Evento actualizado correctamente"
          : "Evento creado correctamente",
      );
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
      onOpenChange(false);
    } else {
      toast.error(result.error || "Ocurrió un error");
    }

    return result;
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;

    setIsDeleting(true);
    const result = await deleteCalendarEvent(initialData.id);

    if (result.success) {
      toast.success("Evento eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
      onOpenChange(false);
    } else {
      toast.error(result.error || "No se pudo eliminar el evento");
    }
    setIsDeleting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Editar Evento" : "Nuevo Evento"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Modifica los datos del evento en el calendario."
              : "Agrega un nuevo evento al calendario escolar."}
          </DialogDescription>
        </DialogHeader>

        <CalendarEventForm
          initialData={effectiveInitial}
          dateRange={dateRange}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={mode === "edit" ? "Guardar Cambios" : "Crear Evento"}
        />

        {mode === "edit" && initialData?.id && (
          <div className="border-t border-border/40 pt-4 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
            >
              {isDeleting ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Eliminar Evento
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import type { CalendarEvent } from "@/components/ui/event-calendar";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const DAY_OF_WEEK = [
  "Domingo", "Lunes", "Martes", "Miércoles",
  "Jueves", "Viernes", "Sábado",
];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function formatFullDate(d: Date) {
  return `${DAY_OF_WEEK[d.getDay()]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

interface DayDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateClick: (date: Date) => void;
}

export function DayDetailDialog({
  open,
  onOpenChange,
  date,
  events,
  onEventClick,
  onCreateClick,
}: DayDetailDialogProps) {
  if (!date) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {formatFullDate(date)}
          </DialogTitle>
          <DialogDescription>
            {events.length === 0
              ? "No hay eventos programados para este día."
              : `${events.length} evento${events.length !== 1 ? "s" : ""} programado${events.length !== 1 ? "s" : ""}.`}
          </DialogDescription>
        </DialogHeader>

        {/* Event list */}
        {events.length > 0 && (
          <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto">
            {events.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  // Small delay to allow dialog close animation
                  setTimeout(() => onEventClick(event), 150);
                }}
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/60"
              >
                <div
                  className="w-1 self-stretch rounded-full shrink-0"
                  style={{
                    backgroundColor: getAccentColor(event.color),
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {event.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatEventDateRange(event, date)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Create button */}
        <div className="pt-2 border-t border-border/40">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              onOpenChange(false);
              setTimeout(() => onCreateClick(date), 150);
            }}
          >
            <Plus className="mr-1.5 size-4" />
            Nuevo Evento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Extract accent color from the event's Tailwind color classes */
function getAccentColor(colorClasses?: string): string {
  if (!colorClasses) return "var(--primary)";

  // Map known Tailwind color patterns to CSS colors
  const colorMap: Record<string, string> = {
    "blue": "#3b82f6",
    "amber": "#f59e0b",
    "emerald": "#10b981",
    "violet": "#8b5cf6",
    "rose": "#f43f5e",
    "zinc": "#71717a",
  };

  for (const [name, hex] of Object.entries(colorMap)) {
    if (colorClasses.includes(name)) return hex;
  }

  return "var(--primary)";
}

/** Format event date range relative to the selected day */
function formatEventDateRange(event: CalendarEvent, selectedDate: Date): string {
  const start = event.startDate;
  const end = event.endDate;

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  if (sameDay) {
    return "Todo el día";
  }

  const fmt = (d: Date) =>
    `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}`;

  return `${fmt(start)} – ${fmt(end)}`;
}

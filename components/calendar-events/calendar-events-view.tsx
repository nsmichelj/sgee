"use client";

import { getCalendarEvents } from "@/actions/calendar-events";
import { getActiveSchoolPeriod } from "@/actions/school-periods";
import { calendarEventTypeEnum, pedagogicalMomentEnum } from "@/lib/db/schema";
import type { calendarEventSchema } from "@/lib/validations/calendar-events";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, CalendarDays, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  type CalendarEvent,
  EventCalendar,
  EventCalendarGrid,
  EventCalendarHeader,
} from "../ui/event-calendar";
import { CalendarEventDialog } from "./calendar-event-dialog";
import { DayDetailDialog } from "./day-detail-dialog";

// ─── Event Type Colors ────────────────────────────────────────────

type EventType = (typeof calendarEventTypeEnum.enumValues)[number];

const eventTypeColors: Record<EventType, string> = {
  pedagogical:
    "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  administrative:
    "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  didactic:
    "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  efemeride:
    "border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-400",
  holiday: "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400",
  other: "border-zinc-500 bg-zinc-500/10 text-zinc-700 dark:text-zinc-400",
};

const eventTypeLabels: Record<EventType, string> = {
  pedagogical: "Pedagógico",
  administrative: "Administrativo",
  didactic: "Didáctico",
  efemeride: "Efeméride",
  holiday: "Asueto",
  other: "Otro",
};

// ─── Pedagogical Moment Labels ────────────────────────────────────

type MomentType = (typeof pedagogicalMomentEnum.enumValues)[number];

const momentLabels: Record<MomentType, string> = {
  FIRST: "1er Lapso",
  SECOND: "2do Lapso",
  THIRD: "3er Lapso",
};

const momentColors: Record<MomentType, string> = {
  FIRST: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  SECOND:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  THIRD:
    "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
};

function formatRange(start: Date, end: Date) {
  const MONTHS = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getDate()} ${MONTHS[s.getMonth()]} – ${e.getDate()} ${MONTHS[e.getMonth()]}`;
}

// ─── Component ────────────────────────────────────────────────────

export function CalendarEventsView() {
  // Dialog states
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventDialogMode, setEventDialogMode] = useState<"create" | "edit">(
    "create",
  );
  const [selectedEvent, setSelectedEvent] = useState<
    (Partial<calendarEventSchema> & { id?: string }) | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Day detail dialog
  const [dayDetailOpen, setDayDetailOpen] = useState(false);
  const [dayDetailDate, setDayDetailDate] = useState<Date | null>(null);
  const [dayDetailEvents, setDayDetailEvents] = useState<CalendarEvent[]>([]);

  // Filter
  const [activeFilter, setActiveFilter] = useState<EventType | "all">("all");

  // ─── Queries ──────────────────────────────────────────────

  const { data: activePeriod, isLoading: isPeriodLoading } = useQuery({
    queryKey: ["active-school-period"],
    queryFn: getActiveSchoolPeriod,
  });

  const {
    data: events,
    isLoading: isEventsLoading,
    error,
  } = useQuery({
    queryKey: ["calendar-events"],
    queryFn: getCalendarEvents,
    enabled: !!activePeriod,
  });

  const isLoading = isPeriodLoading || isEventsLoading;

  // Derive valid date range from active period
  const validDateRange = useMemo(() => {
    if (!activePeriod) return undefined;
    return {
      start: new Date(activePeriod.startDate),
      end: new Date(activePeriod.endDate),
    };
  }, [activePeriod]);

  // Transform DB events → CalendarEvent format
  const calendarEvents: CalendarEvent[] = useMemo(() => {
    if (!events) return [];

    const filtered =
      activeFilter === "all"
        ? events
        : events.filter((e) => e.type === activeFilter);

    return filtered.map((event) => ({
      id: event.id,
      title: event.title,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      color: eventTypeColors[event.type as EventType] ?? eventTypeColors.other,
      type: event.type,
    }));
  }, [events, activeFilter]);

  // ─── Handlers ─────────────────────────────────────────────

  const handleEventClick = useCallback(
    (calEvent: CalendarEvent) => {
      const raw = events?.find((e) => e.id === calEvent.id);
      if (!raw) return;
      setSelectedEvent({
        id: raw.id,
        title: raw.title,
        description: raw.description ?? "",
        startDate: new Date(raw.startDate),
        endDate: new Date(raw.endDate),
        type: raw.type as EventType,
      });
      setEventDialogMode("edit");
      setEventDialogOpen(true);
    },
    [events],
  );

  const handleDateClick = useCallback(
    (_date: Date, dayEvents: CalendarEvent[]) => {
      setDayDetailDate(_date);
      setDayDetailEvents(dayEvents);
      setDayDetailOpen(true);
    },
    [],
  );

  const handleAddClick = useCallback((date: Date) => {
    setSelectedEvent(undefined);
    setSelectedDate(date);
    setEventDialogMode("create");
    setEventDialogOpen(true);
  }, []);

  const handleCreateFromDetail = useCallback((date: Date) => {
    setSelectedEvent(undefined);
    setSelectedDate(date);
    setEventDialogMode("create");
    setEventDialogOpen(true);
  }, []);

  const handleEditFromDetail = useCallback(
    (calEvent: CalendarEvent) => {
      handleEventClick(calEvent);
    },
    [handleEventClick],
  );

  const handleCreateNew = useCallback(() => {
    setSelectedEvent(undefined);
    setSelectedDate(new Date());
    setEventDialogMode("create");
    setEventDialogOpen(true);
  }, []);

  // ─── No Active Period State ───────────────────────────────

  if (!isLoading && !activePeriod) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-amber-500/10">
          <AlertCircle className="size-7 text-amber-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            No hay un periodo escolar activo
          </p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            Debes crear y activar un periodo escolar antes de gestionar los
            eventos del calendario.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/school-periods">
            <CalendarDays className="mr-1.5 size-4" />
            Ir a Periodos Escolares
          </Link>
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-destructive text-sm font-medium">
          Error al cargar los eventos del calendario.
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Intenta recargar la página.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Period Info & Pedagogical Moments */}
      {activePeriod && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-2 shrink-0">
            <CalendarDays className="size-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Año Escolar {activePeriod.academicYear}
            </span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-border/60" />
          <div className="flex flex-wrap items-center gap-2">
            {activePeriod.pedagogicalMoments.map((moment) => (
              <span
                key={moment.id}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${momentColors[moment.type as MomentType]}`}
              >
                <span className="font-semibold">
                  {momentLabels[moment.type as MomentType]}
                </span>
                <span className="opacity-70">
                  {formatRange(
                    new Date(moment.startDate),
                    new Date(moment.endDate),
                  )}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeFilter === "all"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Todos
          </button>
          {calendarEventTypeEnum.enumValues.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setActiveFilter(activeFilter === type ? "all" : type)
              }
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeFilter === type
                  ? eventTypeColors[type]
                      .replace("/10", "/25")
                      .concat(" ring-1 ring-current/20")
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {eventTypeLabels[type]}
            </button>
          ))}
        </div>

        <Button onClick={handleCreateNew} size="sm" className="shrink-0">
          <Plus className="mr-1.5 size-4" />
          Nuevo Evento
        </Button>
      </div>

      {/* Calendar */}
      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <EventCalendar
          events={calendarEvents}
          validDateRange={validDateRange}
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
          onAddClick={handleAddClick}
        >
          <EventCalendarHeader />
          <EventCalendarGrid />
        </EventCalendar>
      )}

      {/* Event count */}
      {events && (
        <p className="text-xs text-muted-foreground text-center">
          {events.length} evento{events.length !== 1 ? "s" : ""} registrado
          {events.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Day detail dialog */}
      <DayDetailDialog
        open={dayDetailOpen}
        onOpenChange={setDayDetailOpen}
        date={dayDetailDate}
        events={dayDetailEvents}
        onEventClick={handleEditFromDetail}
        onCreateClick={handleCreateFromDetail}
      />

      {/* Create/Edit event dialog */}
      <CalendarEventDialog
        open={eventDialogOpen}
        onOpenChange={setEventDialogOpen}
        mode={eventDialogMode}
        initialData={selectedEvent}
        defaultDate={selectedDate}
        dateRange={validDateRange}
      />
    </div>
  );
}

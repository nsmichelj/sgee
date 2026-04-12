"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Button } from "./button";

// ─── Types ────────────────────────────────────────────────────────

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  type?: string;
}

interface SpanningEventPosition {
  event: CalendarEvent;
  startCol: number;
  endCol: number;
  lane: number;
  continuesFromPrev: boolean;
  continuesToNext: boolean;
}

interface EventCalendarContextValue {
  currentDate: Date;
  today: Date;
  events: CalendarEvent[];
  totalEvents: number;
  validDateRange?: { start: Date; end: Date };
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date, dayEvents: CalendarEvent[]) => void;
  onAddClick?: (date: Date) => void;
}

const EventCalendarContext = createContext<EventCalendarContextValue | null>(
  null,
);

function useEventCalendar() {
  const ctx = useContext(EventCalendarContext);
  if (!ctx) throw new Error("useEventCalendar must be within EventCalendar");
  return ctx;
}

// ─── Helpers ──────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function daysDiff(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const MONTH_ABBREV = [
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

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function formatShortDate(d: Date) {
  return `${MONTH_ABBREV[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ─── Spanning Event Layout Algorithm ──────────────────────────────

function calculateSpanningEvents(
  weekDays: Date[],
  events: CalendarEvent[],
): { positions: SpanningEventPosition[]; maxLanes: number } {
  const weekStart = startOfDay(weekDays[0]);
  const weekEnd = startOfDay(weekDays[6]);

  const spanning = events.filter((event) => {
    const s = startOfDay(event.startDate);
    const e = startOfDay(event.endDate);
    const isMultiDay = s.getTime() !== e.getTime();
    const overlaps = s <= weekEnd && e >= weekStart;
    return isMultiDay && overlaps;
  });

  const positioned = spanning.map((event) => {
    const s = startOfDay(event.startDate);
    const e = startOfDay(event.endDate);
    return {
      event,
      startCol: Math.max(0, daysDiff(weekStart, s)),
      endCol: Math.min(6, daysDiff(weekStart, e)),
      continuesFromPrev: s < weekStart,
      continuesToNext: e > weekEnd,
      lane: 0,
    };
  });

  // Sort: earlier start, then wider span first
  positioned.sort((a, b) => {
    if (a.startCol !== b.startCol) return a.startCol - b.startCol;
    return b.endCol - b.startCol - (a.endCol - a.startCol);
  });

  // Greedy lane assignment
  const lanes: SpanningEventPosition[][] = [];
  for (const item of positioned) {
    let assigned = false;
    for (let laneIdx = 0; laneIdx < lanes.length; laneIdx++) {
      const conflicts = lanes[laneIdx].some(
        (ex) => item.startCol <= ex.endCol && item.endCol >= ex.startCol,
      );
      if (!conflicts) {
        item.lane = laneIdx;
        lanes[laneIdx].push(item);
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      item.lane = lanes.length;
      lanes.push([item]);
    }
  }

  return { positions: positioned, maxLanes: lanes.length };
}

// ─── Root ─────────────────────────────────────────────────────────

interface EventCalendarProps {
  events?: CalendarEvent[];
  defaultDate?: Date;
  validDateRange?: { start: Date; end: Date };
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date, dayEvents: CalendarEvent[]) => void;
  onAddClick?: (date: Date) => void;
  className?: string;
  children: React.ReactNode;
}

function EventCalendar({
  events = [],
  defaultDate,
  validDateRange,
  onEventClick,
  onDateClick,
  onAddClick,
  className,
  children,
}: EventCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [currentDate, setCurrentDate] = useState(
    () => defaultDate || new Date(),
  );

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const value = useMemo(
    () => ({
      currentDate,
      today,
      events,
      totalEvents: events.length,
      validDateRange,
      goToPreviousMonth,
      goToNextMonth,
      goToToday,
      onEventClick,
      onDateClick,
      onAddClick,
    }),
    [
      currentDate,
      today,
      events,
      validDateRange,
      goToPreviousMonth,
      goToNextMonth,
      goToToday,
      onEventClick,
      onDateClick,
      onAddClick,
    ],
  );

  return (
    <EventCalendarContext.Provider value={value}>
      <div
        data-slot="event-calendar"
        className={cn("flex flex-col gap-0", className)}
      >
        {children}
      </div>
    </EventCalendarContext.Provider>
  );
}

// ─── Header ───────────────────────────────────────────────────────

interface EventCalendarHeaderProps {
  className?: string;
}

function EventCalendarHeader({ className }: EventCalendarHeaderProps) {
  const {
    currentDate,
    today,
    totalEvents,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useEventCalendar();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayAbbrev = MONTH_ABBREV[today.getMonth()].toUpperCase();
  const todayDay = today.getDate();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const rangeStr = `${formatShortDate(firstDay)} – ${formatShortDate(lastDay)}`;

  return (
    <div
      data-slot="event-calendar-header"
      className={cn("flex items-start gap-4 pb-5", className)}
    >
      {/* Today badge */}
      <button
        type="button"
        onClick={goToToday}
        className="flex flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground min-w-[52px] h-[52px] px-2 shadow-sm hover:shadow-md transition-shadow shrink-0"
        title="Ir a hoy"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider leading-none mt-1">
          {todayAbbrev}
        </span>
        <span className="text-xl font-bold leading-none mt-0.5">
          {todayDay}
        </span>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2.5">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {MONTH_NAMES[month]} {year}
          </h2>
          <span className="text-sm text-muted-foreground">
            {totalEvents} evento{totalEvents !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousMonth}
            className="size-6 p-0 rounded-full"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground px-1">{rangeStr}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
            className="size-6 p-0 rounded-full"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Grid Constants ───────────────────────────────────────────────

const SPANNING_LANE_H = 22;
const DAY_HEADER_H = 32;

// ─── Grid ─────────────────────────────────────────────────────────

interface DayInfo {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
}

interface EventCalendarGridProps {
  className?: string;
}

function EventCalendarGrid({ className }: EventCalendarGridProps) {
  const { currentDate, today, events, validDateRange, onEventClick, onDateClick, onAddClick } =
    useEventCalendar();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  // Build all days (prev padding + current + next padding)
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const before: DayInfo[] = Array.from({ length: firstDay }, (_, i) => ({
    day: prevMonthDays - firstDay + i + 1,
    date: new Date(year, month - 1, prevMonthDays - firstDay + i + 1),
    isCurrentMonth: false,
  }));

  const current: DayInfo[] = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    date: new Date(year, month, i + 1),
    isCurrentMonth: true,
  }));

  const total = before.length + current.length;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  const after: DayInfo[] = Array.from({ length: remaining }, (_, i) => ({
    day: i + 1,
    date: new Date(year, month + 1, i + 1),
    isCurrentMonth: false,
  }));

  const allDays = [...before, ...current, ...after];

  // Split into weeks
  const weeks: DayInfo[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  // Helper: get single-day events for a date
  const getSingleDayEvents = useCallback(
    (date: Date) => {
      const d = startOfDay(date);
      return events.filter((ev) => {
        const s = startOfDay(ev.startDate);
        const e = startOfDay(ev.endDate);
        return isSameDay(s, e) && isSameDay(d, s);
      });
    },
    [events],
  );

  // Helper: get ALL events for a date
  const getAllEventsForDay = useCallback(
    (date: Date) => {
      const d = startOfDay(date);
      return events.filter((ev) => {
        const s = startOfDay(ev.startDate);
        const e = startOfDay(ev.endDate);
        return d >= s && d <= e;
      });
    },
    [events],
  );

  return (
    <div
      data-slot="event-calendar-grid"
      className={cn(
        "rounded-xl border border-border/60 overflow-x-auto",
        className,
      )}
    >
      {/* Day name headers */}
      <div className="grid grid-cols-7 border-b border-border/60 bg-muted/30">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="min-w-[130px] px-2 py-2.5 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {weeks.map((week, weekIdx) => {
        const weekDates = week.map((d) => d.date);
        const { positions, maxLanes } = calculateSpanningEvents(
          weekDates,
          events,
        );
        const spanH = maxLanes * SPANNING_LANE_H;
        const isLast = weekIdx === weeks.length - 1;

        return (
          <div key={weekIdx} className="relative">
            {/* Day cells */}
            <div className="grid grid-cols-7">
              {week.map((dayInfo, dayIdx) => {
                const isToday = isSameDay(dayInfo.date, today);
                const singleEvents = getSingleDayEvents(dayInfo.date);
                const allEvents = getAllEventsForDay(dayInfo.date);
                const d = startOfDay(dayInfo.date);
                const isOutOfRange = validDateRange
                  ? d < startOfDay(validDateRange.start) || d > startOfDay(validDateRange.end)
                  : false;
                const isInteractive = dayInfo.isCurrentMonth && !isOutOfRange;

                return (
                  <div
                    key={dayIdx}
                    onClick={() =>
                      isInteractive &&
                      onDateClick?.(dayInfo.date, allEvents)
                    }
                    className={cn(
                      "group/cell relative flex flex-col min-w-[130px] min-h-[110px] transition-colors",
                      !isLast && "border-b border-border/40",
                      dayIdx < 6 && "border-r border-border/40",
                      isOutOfRange
                        ? "bg-muted/15 cursor-default opacity-50"
                        : dayInfo.isCurrentMonth
                          ? "bg-background cursor-pointer hover:bg-muted/20"
                          : "bg-muted/10 cursor-default",
                      isToday && !isOutOfRange && "bg-primary/[0.03]",
                    )}
                  >
                    {/* Day header */}
                    <div
                      className="flex items-center justify-between px-2 py-1.5"
                      style={{ height: `${DAY_HEADER_H}px` }}
                    >
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full text-sm",
                          isToday
                            ? "bg-primary text-primary-foreground font-bold"
                            : dayInfo.isCurrentMonth
                              ? "text-foreground font-medium"
                              : "text-muted-foreground/40",
                        )}
                      >
                        {dayInfo.day}
                      </span>
                      {isInteractive && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddClick?.(dayInfo.date);
                          }}
                          className="flex size-6 items-center justify-center rounded-full text-muted-foreground/40 opacity-0 group-hover/cell:opacity-100 hover:bg-muted hover:text-foreground transition-all"
                          title="Agregar evento"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Spacer for spanning events */}
                    {spanH > 0 && (
                      <div
                        style={{ height: `${spanH}px` }}
                        className="shrink-0"
                      />
                    )}

                    {/* Single-day events */}
                    <div className="flex flex-1 flex-col gap-[2px] px-1 pb-1 overflow-hidden">
                      {singleEvents.slice(0, 2).map((ev) => (
                        <button
                          type="button"
                          key={ev.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(ev);
                          }}
                          title={ev.title}
                          className={cn(
                            "flex w-full items-center truncate rounded px-1.5 py-[2px] text-left text-[11px] font-medium leading-tight transition-all",
                            "border-l-2 hover:shadow-sm active:scale-[0.98]",
                            ev.color ||
                              "border-primary/60 bg-primary/10 text-primary",
                          )}
                        >
                          <span className="truncate">{ev.title}</span>
                        </button>
                      ))}
                      {singleEvents.length > 2 && (
                        <span className="px-1 text-[10px] font-medium text-muted-foreground">
                          +{singleEvents.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spanning events overlay */}
            {positions.length > 0 && (
              <div
                className="pointer-events-none absolute inset-x-0 grid grid-cols-7"
                style={{
                  top: `${DAY_HEADER_H}px`,
                  gridTemplateRows: `repeat(${maxLanes}, ${SPANNING_LANE_H}px)`,
                }}
              >
                {positions.map((sp) => (
                  <button
                    key={`${sp.event.id}-w${weekIdx}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(sp.event);
                    }}
                    title={sp.event.title}
                    className={cn(
                      "pointer-events-auto flex items-center truncate px-2 text-[11px] font-medium leading-none transition-all",
                      "hover:shadow-sm active:scale-[0.99]",
                      sp.continuesFromPrev
                        ? "rounded-l-none ml-0"
                        : "rounded-l ml-[2px] border-l-2",
                      sp.continuesToNext
                        ? "rounded-r-none mr-0"
                        : "rounded-r mr-[2px]",
                      sp.event.color ||
                        "border-primary/60 bg-primary/15 text-primary",
                    )}
                    style={{
                      gridColumn: `${sp.startCol + 1} / ${sp.endCol + 2}`,
                      gridRow: sp.lane + 1,
                      height: `${SPANNING_LANE_H - 2}px`,
                    }}
                  >
                    <span
                      className={cn(
                        "truncate",
                        sp.continuesFromPrev && "opacity-70",
                      )}
                    >
                      {sp.event.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Exports ──────────────────────────────────────────────────────

export {
  EventCalendar,
  EventCalendarGrid,
  EventCalendarHeader,
  useEventCalendar,
};

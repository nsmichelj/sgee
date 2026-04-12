import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderBadge,
  PanelTitle,
} from "@/components/dashboard/panel";
import { CalendarEventsView } from "@/components/calendar-events/calendar-events-view";

export const metadata = {
  title: "Calendario de Eventos | SIGECOM",
  description:
    "Planificación y gestión de eventos del calendario escolar institucional.",
};

export default function CalendarEventsPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Planificación Escolar</PanelHeaderBadge>
          <PanelTitle>
            Calendario de{" "}
            <span className="text-primary">Eventos</span>
          </PanelTitle>
          <PanelDescription>
            Planifica y organiza los eventos del calendario escolar:
            efemérides, feriados, actividades pedagógicas y más.
          </PanelDescription>
        </PanelHeaderContent>
      </PanelHeader>

      <CalendarEventsView />
    </PanelContainer>
  );
}

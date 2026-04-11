import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderBadge,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";
import { CreateSchoolPeriodModal } from "@/components/school-periods/create-period-modal";
import { SchoolPeriodsTable } from "@/components/school-periods/school-periods-table/school-periods-table";

export const metadata = {
  title: "Periodos Escolares | SIGECOM",
  description: "Gestión de periodos escolares y lapsos académicos",
};

export default function SchoolPeriodsPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Configuración Académica</PanelHeaderBadge>
          <PanelTitle>
            Gestión de <span className="text-primary">Periodos Escolares</span>
          </PanelTitle>
          <PanelDescription>
            Organiza los ciclos educativos y lapsos pedagógicos para el control
            académico de la institución.
          </PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <CreateSchoolPeriodModal />
        </PanelHeaderActions>
      </PanelHeader>

      <div>
        <SchoolPeriodsTable />
      </div>
    </PanelContainer>
  );
}

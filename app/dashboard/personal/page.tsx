import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderBadge,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";
import { CreatePersonalModal } from "@/components/personal/create-personal-modal";
import { ListPersonal } from "@/components/personal/personal-table";

export default function PersonalManagementPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Configuración</PanelHeaderBadge>
          <PanelTitle>
            Gestión de <span className="text-primary">Personal</span>
          </PanelTitle>
          <PanelDescription>
            Administre la base de datos de personal docente.
          </PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <CreatePersonalModal />
        </PanelHeaderActions>
      </PanelHeader>

      <ListPersonal />
    </PanelContainer>
  );
}

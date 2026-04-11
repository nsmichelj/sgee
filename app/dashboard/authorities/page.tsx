import { AuthorityList } from "@/components/authorities/authority-list";
import { CreateAuthoritiesModal } from "@/components/authorities/create-authorities-modal";
import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderBadge,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";

export default function AuthoritiesPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Configuración</PanelHeaderBadge>
          <PanelTitle>
            Gestión de <span className="text-primary">Autoridades</span>
          </PanelTitle>
          <PanelDescription>
            Administre el equipo directivo e institucional
          </PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <CreateAuthoritiesModal />
        </PanelHeaderActions>
      </PanelHeader>

      <div>
        <AuthorityList />
      </div>
    </PanelContainer>
  );
}

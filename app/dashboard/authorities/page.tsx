import { AuthorityList } from "@/components/authorities/authority-list";
import { CreateAuthoritiesModal } from "@/components/authorities/create-authorities-modal";
import {
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/dashboard/panel";

export default function AuthoritiesPage() {
  return (
    <div>
      <PanelHeader>
        <PanelTitle>Gestión de Autoridades</PanelTitle>
        <PanelDescription>
          Administre el equipo directivo e institucional
        </PanelDescription>
        <CreateAuthoritiesModal />
      </PanelHeader>

      <AuthorityList />
    </div>
  );
}

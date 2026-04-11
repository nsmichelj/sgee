import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";
import CreateUserModal from "@/components/users/create-user-modal";
import { ListUsers } from "@/components/users/users-table/list-users";

export default function DashboardUsersPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelTitle>
            Gestión de <span className="text-primary">Usuarios</span>
          </PanelTitle>
          <PanelDescription>
            Administra los usuarios del sistema.
          </PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <CreateUserModal />
        </PanelHeaderActions>
      </PanelHeader>

      <ListUsers />
    </PanelContainer>
  );
}

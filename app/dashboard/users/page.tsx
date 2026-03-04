import {
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/dashboard/panel";
import CreateUserModal from "@/components/users/create-user-modal";
import { ListUsers } from "@/components/users/users-table/list-users";

export default function DashboardUsersPage() {
  return (
    <div>
      <PanelHeader>
        <PanelTitle>Gestión de Usuarios</PanelTitle>
        <PanelDescription>
          Administra los usuarios del sistema.
        </PanelDescription>

        <CreateUserModal />
      </PanelHeader>

      <ListUsers />
    </div>
  );
}

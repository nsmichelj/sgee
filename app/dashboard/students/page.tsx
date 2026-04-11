import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderBadge,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";
import { CreateStudentModal } from "@/components/students/create-student-modal";
import { ListStudents } from "@/components/students/students-table";

export default function StudentsManagementPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Configuración</PanelHeaderBadge>
          <PanelTitle>
            Gestión de <span className="text-primary">Estudiantes</span>
          </PanelTitle>
          <PanelDescription>
            Organiza los estudiantes de la institución.
          </PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <CreateStudentModal />
        </PanelHeaderActions>
      </PanelHeader>

      <div>
        <ListStudents />
      </div>
    </PanelContainer>
  );
}

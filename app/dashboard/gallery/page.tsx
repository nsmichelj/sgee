import {
  PanelContainer,
  PanelDescription,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderBadge,
  PanelHeaderContent,
  PanelTitle,
} from "@/components/dashboard/panel";
import { CreatePhotoModal } from "@/components/galley/create-photo-modal";
import { PhotoList } from "@/components/galley/photo-list";

export default function GalleryPage() {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelHeaderContent>
          <PanelHeaderBadge>Configuración</PanelHeaderBadge>
          <PanelTitle>
            Gestión de la <span className="text-primary">galería</span>
          </PanelTitle>
          <PanelDescription>
            Administra la galería fotográfica oficial de la institución.
          </PanelDescription>
        </PanelHeaderContent>
        <PanelHeaderActions>
          <CreatePhotoModal />
        </PanelHeaderActions>
      </PanelHeader>

      <PhotoList />
    </PanelContainer>
  );
}

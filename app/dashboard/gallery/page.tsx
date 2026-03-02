import {
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/dashboard/panel";
import { CreatePhotoModal } from "@/components/galley/create-photo-modal";
import { PhotoList } from "@/components/galley/photo-list";

export default function GalleryPage() {
  return (
    <div>
      <PanelHeader>
        <PanelTitle>Gestión de la galería</PanelTitle>
        <PanelDescription>
          Administra la galería fotográfica oficial de la institución.
        </PanelDescription>
        <CreatePhotoModal />
      </PanelHeader>

      <PhotoList />
    </div>
  );
}

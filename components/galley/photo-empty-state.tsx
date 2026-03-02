import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ImageIcon } from "lucide-react";
import { CreatePhotoModal } from "./create-photo-modal";

export function PhotoEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageIcon />
        </EmptyMedia>
        <EmptyTitle>No tienes fotos registradas</EmptyTitle>
        <EmptyDescription>
          Parece que aún no has agregado ninguna foto.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreatePhotoModal />
      </EmptyContent>
    </Empty>
  );
}

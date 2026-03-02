import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { User } from "lucide-react";
import { CreateAuthoritiesModal } from "./create-authorities-modal";

export function AuthorityEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <User />
        </EmptyMedia>
        <EmptyTitle>No tienes directivos registrados</EmptyTitle>
        <EmptyDescription>
          Parece que aún no has agregado ningun directivo.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateAuthoritiesModal />
      </EmptyContent>
    </Empty>
  );
}

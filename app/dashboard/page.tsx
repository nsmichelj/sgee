import {
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/dashboard/panel";

export default function Page() {
  return (
    <div>
      <PanelHeader>
        <PanelTitle>Dashboard</PanelTitle>
        <PanelDescription>
          Bienvenido al panel de control del SGEE Pedro Luis Cedeño
        </PanelDescription>
      </PanelHeader>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function PanelContainer({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

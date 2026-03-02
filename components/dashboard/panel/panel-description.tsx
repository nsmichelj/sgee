import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function PanelDescription({
  children,
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

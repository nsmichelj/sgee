import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function PanelTitle({
  children,
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-2xl md:text-3xl font-bold text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

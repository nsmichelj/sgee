import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function SectionTitle({
  children,
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-3xl md:text-4xl font-bold text-foreground text-balance",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

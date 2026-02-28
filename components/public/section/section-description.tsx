import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function SectionDescription({
  children,
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground max-w-2xl mx-auto", className)}
      {...props}
    >
      {children}
    </p>
  );
}

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function PanelTitle({
  children,
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h1
      className={cn(
        "text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.1] max-w-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

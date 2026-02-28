import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function SectionTag({
  children,
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "py-2 px-4 bg-primary/10 text-sm font-bold inline-flex rounded-full text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

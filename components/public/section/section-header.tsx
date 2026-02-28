import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function SectionHeader({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("text-center mb-12 space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function PanelHeader({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-end justify-between gap-6 border-b pb-12 border-primary/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PanelHeaderContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

export function PanelHeaderActions({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function PanelHeaderBadge({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

import { SectionDescription } from "./section-description";
import { SectionHeader } from "./section-header";
import { SectionTag } from "./section-tag";
import { SectionTitle } from "./section-title";

export function Section({
  children,
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("py-12 md:py-24 bg-secondary", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export { SectionDescription, SectionHeader, SectionTag, SectionTitle };

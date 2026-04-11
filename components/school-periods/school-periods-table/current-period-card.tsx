import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { calculateProgressBetweenDates, formatDate } from "./utils";

interface PedagogicalMoment {
  id: string;
  type: "FIRST" | "SECOND" | "THIRD";
  startDate: Date;
  endDate: Date;
}

interface CurrentPeriodCardProps {
  id: string;
  startDate: Date;
  endDate: Date;
  academicYear: string;
  isActive: boolean;
  pedagogicalMoments: PedagogicalMoment[];
}

const pedagogicalMoments = {
  FIRST: {
    title: "Primer Momento Pedagógico",
  },
  SECOND: {
    title: "Segundo Momento Pedagógico",
  },
  THIRD: {
    title: "Tercer Momento Pedagógico",
  },
};

export function MomentCard({ type, startDate, endDate }: PedagogicalMoment) {
  const getMomentState = (startDate: Date, endDate: Date) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log(formatDate(now), formatDate(start), formatDate(end));
    if (now >= end) return "completed";
    if (now >= start && now <= end) return "ongoing";
    return "pending";
  };

  const momentState = getMomentState(startDate, endDate);

  return (
    <Card
      className={cn(
        "shadow-none h-full",
        momentState === "completed" &&
          "bg-muted/40 border-muted-foreground/20 text-muted-foreground",
        momentState === "ongoing" &&
          "bg-primary/5 border-primary/20 text-primary shadow-[0_0_20px_rgba(var(--primary),0.05)]",
        momentState === "pending" &&
          "bg-muted/30 border-border/40 text-muted-foreground/60",
      )}
    >
      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase">
            {pedagogicalMoments[type].title}
          </h3>
        </div>
        <div>
          <span className="text-sm flex gap-2">
            <span className="font-medium">{formatDate(startDate)}</span>
            <span>-</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function CurrentPeriodCard({
  startDate,
  endDate,
  academicYear,
  isActive,
  pedagogicalMoments,
}: CurrentPeriodCardProps) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const progressPercentage = calculateProgressBetweenDates(start, end, now);

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -top-60 -right-40 size-100 bg-primary/10 rounded-full pointer-events-none" />
      <CardContent className=" space-y-10">
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">
              Periodo académico actual
            </span>
            <div className="space-y-1">
              <h2 className="text-foreground text-5xl md:text-6xl font-black tracking-tighter leading-none">
                {academicYear}
              </h2>
              <div className="flex items-center gap-3 text-muted-foreground font-medium">
                <div className="p-1.5 rounded-md bg-muted/50 border border-border/40">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-sm flex gap-2">
                  <span className="font-medium">{formatDate(start)}</span>
                  <span>-</span>
                  <span className="font-medium">{formatDate(end)}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20">
              {isActive ? "EN CURSO" : "COMPLETADO"}
            </div>
          </div>
        </div>

        <Field className="w-full space-y-2">
          <div className="flex justify-between items-end">
            <FieldLabel htmlFor="progress-school-period">
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Progreso del Año Escolar
                </h4>
                <p className="normal-case text-xs text-muted-foreground/60">
                  Calculado en base a la fecha actual
                </p>
              </div>
            </FieldLabel>
            <div className="text-4xl font-black tracking-tighter text-primary">
              {progressPercentage}%
            </div>
          </div>
          <Progress value={progressPercentage} id="progress-school-period" />
        </Field>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground shrink-0">
              Momentos Pedagogicos
            </h4>
            <div className="h-px w-full bg-linear-to-r from-border/60 to-transparent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {pedagogicalMoments.map((moment) => (
              <MomentCard key={moment.id} {...moment} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { deleteSchoolPeriod, getSchoolPeriods } from "@/actions/school-periods";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { CurrentPeriodCard } from "./current-period-card";

const statusMap = {
  active: {
    label: "Activo",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  ongoing: {
    label: "En Curso",
    color:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  completed: {
    label: "Finalizado",
    color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  },
};

import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Layers, RefreshCw } from "lucide-react";
import { useState } from "react";
import { formatDate } from "./utils";

export function SchoolPeriodsTable() {
  const queryClient = useQueryClient();
  const [showHistory, setShowHistory] = useState(false);

  const {
    data: periods,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["school-periods"],
    queryFn: () => getSchoolPeriods(),
  });

  const deletePeriodMutation = useMutation({
    mutationFn: (id: string) => deleteSchoolPeriod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-periods"] });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <Skeleton className="h-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-16 rounded-[2rem] border border-destructive/20 bg-destructive/5 text-center space-y-6">
        <div className="p-4 rounded-full bg-destructive/10">
          <AlertCircle className="h-10 w-10 text-destructive stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">
            Error de Sincronizacion
          </h3>
          <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
            No pudimos recuperar los periodos escolares. Por favor, verifica tu
            conexion e intenta de nuevo.
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="rounded-full px-8 border-destructive/30 hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
      </div>
    );
  }

  if (!periods || periods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center space-y-8 opacity-60">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Layers className="h-12 w-12 text-muted-foreground/40 stroke-1" />
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-light tracking-tight text-foreground">
              Sin Actividad Academica
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto font-medium">
              Aun no se han definido periodos escolares para esta institucion.
            </p>
          </div>
        </div>
        <div className="h-px w-24 bg-border/40 mx-auto" />
      </div>
    );
  }

  const currentPeriod = periods.find((period) => period.isActive);
  const otherPeriods = periods.filter(
    (period) => period.id !== currentPeriod?.id,
  );

  return (
    <div className="space-y-12">
      {currentPeriod && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <CurrentPeriodCard {...currentPeriod} />
        </div>
      )}

      {otherPeriods.length > 0 && (
        <Collapsible
          open={showHistory}
          onOpenChange={setShowHistory}
          className="flex w-full flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
              Historial de Periodos
            </h2>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-muted/50 text-xs font-bold uppercase tracking-widest text-primary gap-2"
              >
                {showHistory ? (
                  <>
                    Ocultar <ChevronUp />
                  </>
                ) : (
                  <>
                    Ver {otherPeriods.length} Anterior
                    {otherPeriods.length > 1 ? "es" : ""} <ChevronDown />
                  </>
                )}
                <span className="sr-only">Toggle details</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            {showHistory && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {otherPeriods.map((period) => (
                  <Card key={period.id}>
                    <CardContent>
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                            Finalizado
                          </span>
                          <h3 className="text-2xl font-black tracking-tight text-muted-foreground">
                            {period.academicYear}
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatDate(period.startDate)} —{" "}
                              {formatDate(period.endDate)}
                            </span>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="rounded-xl border-border/40"
                          >
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive focus:bg-destructive/10 rounded-lg cursor-pointer"
                              onClick={() =>
                                deletePeriodMutation.mutate(period.id)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar Historial
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

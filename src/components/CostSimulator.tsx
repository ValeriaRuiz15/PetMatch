import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UtensilsCrossed, Stethoscope, Sparkles, Gift } from "lucide-react";

type PetType = "perro_grande" | "perro_mediano" | "perro_pequeno" | "gato" | "conejo";

interface Props {
  petType: PetType;
  setPetType: (type: PetType) => void;
}

interface CostBreakdown {
  alimentacion: number;
  salud: number;
  higiene: number;
  accesorios: number;
}

export const PET_COSTS: Record<PetType, { label: string; emoji: string; costs: CostBreakdown }> = {
  perro_grande: {
    label: "Perro Grande",
    emoji: "🐕",
    costs: { alimentacion: 3500, salud: 1200, higiene: 800, accesorios: 600 },
  },
  perro_mediano: {
    label: "Perro Mediano",
    emoji: "🐶",
    costs: { alimentacion: 2200, salud: 1000, higiene: 600, accesorios: 500 },
  },
  perro_pequeno: {
    label: "Perro Pequeño",
    emoji: "🐾",
    costs: { alimentacion: 1200, salud: 900, higiene: 500, accesorios: 450 },
  },
  gato: {
    label: "Gato",
    emoji: "🐱",
    costs: { alimentacion: 1000, salud: 800, higiene: 400, accesorios: 350 },
  },
  conejo: {
    label: "Conejo",
    emoji: "🐰",
    costs: { alimentacion: 600, salud: 500, higiene: 250, accesorios: 200 },
  },
};

const COST_CATEGORIES = [
  { key: "alimentacion" as const, label: "Alimentación", icon: UtensilsCrossed, color: "bg-primary" },
  { key: "salud" as const, label: "Salud (Veterinario/Vacunas)", icon: Stethoscope, color: "bg-accent" },
  { key: "higiene" as const, label: "Higiene", icon: Sparkles, color: "bg-peach" },
  { key: "accesorios" as const, label: "Juguetes / Accesorios", icon: Gift, color: "bg-secondary" },
];

const CostSimulator = ({ petType, setPetType }: Props) => {
  //const [petType, setPetType] = useState<PetType>("perro_mediano");

  const pet = PET_COSTS[petType];
  const total = Object.values(pet.costs).reduce((a, b) => a + b, 0);
  const maxCost = Math.max(...Object.values(pet.costs));

  return (
    <Card className="mt-6 overflow-hidden border-2 border-primary/20">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          💰 Simulador de Costos Mensuales
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Estima cuánto gastarás al mes según el tipo de mascota.
        </p>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        {/* Pet type selector */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tipo de mascota</Label>
          <Select value={petType} onValueChange={(v) => setPetType(v as PetType)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PET_COSTS).map(([key, { label, emoji }]) => (
                <SelectItem key={key} value={key}>
                  {emoji} {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cost bars */}
        <div className="space-y-4">
          {COST_CATEGORIES.map(({ key, label, icon: Icon, color }) => {
            const cost = pet.costs[key];
            const pct = (cost / maxCost) * 100;
            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {label}
                  </span>
                  <span className="font-semibold tabular-nums">
                    ${cost.toLocaleString("es-MX")} MXN
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <span className="font-display text-base font-bold">Costo Total Mensual</span>
          <span className="font-display text-2xl font-bold text-primary">
            ${total.toLocaleString("es-MX")} MXN
          </span>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Valores estimados. Los costos reales pueden variar según tu ubicación y las necesidades específicas de tu mascota.
        </p>
      </CardContent>
    </Card>
  );
};

export default CostSimulator;

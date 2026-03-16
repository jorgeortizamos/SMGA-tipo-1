import FormLayout from "@/components/FormLayout";
import { Table, TableHeader, TableHead, TableRow, TableBody } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { number: 1, title: "Reporte Vacas Leche", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "TC Leche"] },
  { number: 2, title: "Reporte Vacas de Cría Cruce", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "N° Intentos"] },
  { number: 3, title: "Reporte Vacas de Cría Peligro", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "TC Preñez"] },
  { number: 4, title: "Mal Pedigree - Mejorar", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "Índice Marginal"] },
  { number: 5, title: "Reporte Intervalo Parto Servicio (IPS)", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "Orden"] },
  { number: 6, title: "Reporte Intervalo Parto Concepción (IPC)", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "Intervalo Parto Concep"] },
  { number: 7, title: "Reporte Número Servicios por Concepción", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "Servicio / Concep"] },
  { number: 8, title: "Reporte de Mortalidad en Terneros (MT)", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "Mortalidad"] },
  { number: 9, title: "Reporte Vacas Vacías", subtitle: "Cantidad de Animales", columns: ["Identificación Animal", "Prod. Sólidos (Kg)"] },
];

const ReporteVacas = () => {
  return (
    <FormLayout title="Reporte Vacas">
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.number} className="border-2 border-primary/20">
            <CardHeader className="bg-accent/50 pb-2">
              <CardTitle className="text-lg font-bold">
                {section.number}. {section.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{section.subtitle}</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10">
                    {section.columns.map((col) => (
                      <TableHead key={col} className="font-semibold text-foreground">
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody />
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </FormLayout>
  );
};

export default ReporteVacas;

import FormLayout from "@/components/FormLayout";
import { Table, TableHeader, TableHead, TableRow, TableBody } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    number: 1,
    title: "Reporte Producción de Leche",
    subtitle: "Cantidad de Animales",
    columns: ["# Identificación Animal", "Índice INIA", "Características"],
  },
  {
    number: 2,
    title: "Reporte Umbrales Toros",
    subtitle: "Lista Toros que Cumplen con regla",
    columns: ["#Id Toro", "Características", "Código"],
  },
];

const ReporteToros = () => {
  return (
    <FormLayout title="Reporte Toros">
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

export default ReporteToros;

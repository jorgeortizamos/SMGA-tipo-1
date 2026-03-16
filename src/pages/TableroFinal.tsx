import FormLayout from "@/components/FormLayout";
import { Table, TableHeader, TableHead, TableRow, TableBody } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TableroFinal = () => {
  return (
    <FormLayout title="Tablero Final">
      <div className="space-y-6">
        {/* Indicadores */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-accent/50 pb-2">
            <CardTitle className="text-lg font-bold">Indicadores</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-semibold text-foreground">Indicador</TableHead>
                  <TableHead className="font-semibold text-foreground">Primíparas</TableHead>
                  <TableHead className="font-semibold text-foreground">Multíparas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody />
            </Table>
          </CardContent>
        </Card>

        {/* Comparación por años */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-accent/50 pb-2">
            <CardTitle className="text-lg font-bold">Comparación por Años</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-semibold text-foreground">Indicador</TableHead>
                  <TableHead className="font-semibold text-foreground">21/22</TableHead>
                  <TableHead className="font-semibold text-foreground">22/23</TableHead>
                  <TableHead className="font-semibold text-foreground">23/24</TableHead>
                  <TableHead className="font-semibold text-foreground">24/25</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody />
            </Table>
          </CardContent>
        </Card>

        {/* Edad de Vacas */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-accent/50 pb-2">
            <CardTitle className="text-lg font-bold">Edad de Vacas (años)</CardTitle>
            <p className="text-sm text-muted-foreground">Distribución por edad</p>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm italic">Gráfico de torta próximamente...</p>
          </CardContent>
        </Card>

        <Separator />

        {/* Comparación de Toros */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-accent/50 pb-2">
            <CardTitle className="text-lg font-bold">Comparación de Toros</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-semibold text-foreground">Toro</TableHead>
                  <TableHead className="font-semibold text-foreground">Características del Toro</TableHead>
                  <TableHead className="font-semibold text-foreground">Código</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody />
            </Table>
          </CardContent>
        </Card>

        {/* Índice Integral de Hembras */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-accent/50 pb-2">
            <CardTitle className="text-lg font-bold">Índice Integral de Hembras</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-semibold text-foreground">Criterio</TableHead>
                  <TableHead className="font-semibold text-foreground">Umbral</TableHead>
                  <TableHead className="font-semibold text-foreground">Parámetro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody />
            </Table>
          </CardContent>
        </Card>

        {/* Vacas con cumplimiento */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-accent/50 pb-2">
            <CardTitle className="text-lg font-bold">Lista de Vacas que Cumplen Regla</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-semibold text-foreground">#Id Vaca</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody />
            </Table>
          </CardContent>
        </Card>

        <Separator />

        {/* Propuesta de Apareamiento */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-accent/50 pb-2">
            <CardTitle className="text-lg font-bold">Propuesta de Apareamiento</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="font-semibold text-foreground">Propuesta</TableHead>
                  <TableHead className="font-semibold text-foreground">Vaca</TableHead>
                  <TableHead className="font-semibold text-foreground">DEP Leche</TableHead>
                  <TableHead className="font-semibold text-foreground">Toro</TableHead>
                  <TableHead className="font-semibold text-foreground">Índice</TableHead>
                  <TableHead className="font-semibold text-foreground">RDLP</TableHead>
                  <TableHead className="font-semibold text-foreground">Características Toro</TableHead>
                  <TableHead className="font-semibold text-foreground">Código</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody />
            </Table>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
};

export default TableroFinal;

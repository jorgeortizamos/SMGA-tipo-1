import { useState } from "react";
import FormLayout from "@/components/FormLayout";
import FieldSelect from "@/components/FieldSelect";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { useGanaderia, RegistroOtro } from "@/context/GanaderiaContext";

const scoreOptions = Array.from({ length: 5 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

const emptyOtro = (id_vaca: string, ejercicio: string): RegistroOtro => ({
  id_vaca, ejercicio, renguera: "", mastitis: "", facParto: "", longevidad: "", fortalezaPatas: "",
});

const RegistrosOtros = () => {
  const { registrosBasicos, registrosOtros, setRegistrosOtros } = useGanaderia();
  const [form, setForm] = useState<RegistroOtro | null>(null);
  const [editVacaId, setEditVacaId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const update = (key: keyof RegistroOtro) => (value: string) =>
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);

  const findOtro = (id_vaca: string) => registrosOtros.find((r) => r.id_vaca === id_vaca);

  const startEdit = (id_vaca: string, ejercicio: string) => {
    const existing = findOtro(id_vaca);
    setForm(existing || emptyOtro(id_vaca, ejercicio));
    setEditVacaId(id_vaca);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const existingIdx = registrosOtros.findIndex((r) => r.id_vaca === editVacaId);
    if (existingIdx >= 0) {
      setRegistrosOtros((prev) => prev.map((r, i) => (i === existingIdx ? form : r)));
      toast.success("Registro actualizado");
    } else {
      setRegistrosOtros((prev) => [...prev, form]);
      toast.success("Registro guardado");
    }
    setForm(null); setEditVacaId(null); setOpen(false);
  };

  return (
    <FormLayout title="Registros Otros">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Otros Datos - Vaca #{form?.id_vaca}</DialogTitle>
          </DialogHeader>
          {form && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FieldSelect label="Renguera" value={form.renguera} onChange={update("renguera")} options={scoreOptions} placeholder="1-5" highlighted />
                <FieldSelect label="Mastitis" value={form.mastitis} onChange={update("mastitis")} options={scoreOptions} placeholder="1-5" highlighted />
                <FieldSelect label="Fac. Parto" value={form.facParto} onChange={update("facParto")} options={scoreOptions} placeholder="1-5" highlighted />
                <FieldSelect label="Longevidad" value={form.longevidad} onChange={update("longevidad")} options={scoreOptions} placeholder="1-5" highlighted />
                <FieldSelect label="Fortaleza Patas" value={form.fortalezaPatas} onChange={update("fortalezaPatas")} options={scoreOptions} placeholder="1-5" highlighted />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Ejercicio</TableHead>
              <TableHead>Id Vaca</TableHead>
              <TableHead>Renguera</TableHead>
              <TableHead>Mastitis</TableHead>
              <TableHead>Fac. Parto</TableHead>
              <TableHead>Longevidad</TableHead>
              <TableHead>Fort. Patas</TableHead>
              <TableHead className="w-16">Acc.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrosBasicos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No hay vacas registradas. Ingrese vacas en Registros Básicos primero.
                </TableCell>
              </TableRow>
            ) : registrosBasicos.map((vaca, i) => {
              const otro = findOtro(vaca.id_vaca);
              return (
                <TableRow key={i}>
                  <TableCell>{vaca.ejercicio}</TableCell>
                  <TableCell className="font-medium">{vaca.id_vaca}</TableCell>
                  <TableCell>{otro?.renguera || "—"}</TableCell>
                  <TableCell>{otro?.mastitis || "—"}</TableCell>
                  <TableCell>{otro?.facParto || "—"}</TableCell>
                  <TableCell>{otro?.longevidad || "—"}</TableCell>
                  <TableCell>{otro?.fortalezaPatas || "—"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => startEdit(vaca.id_vaca, vaca.ejercicio)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </FormLayout>
  );
};

export default RegistrosOtros;

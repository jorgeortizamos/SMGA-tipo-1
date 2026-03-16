import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGanaderia, RegistroBasico, RegistroProductivo, RegistroReproductivo, RegistroOtro } from "@/context/GanaderiaContext";

// Expected columns per sheet/section
const BASICOS_COLS = ["ejercicio", "id_vaca", "partos", "fecha_nacimiento", "raza", "lactancia", "edad", "potencial_vaca"];
const PRODUCTIVOS_COLS = ["ejercicio", "id_vaca", "reg_1_dia30", "reg_2_dia120", "reg_3_dia210", "reg_4_dia270", "porcentaje_grasa", "porcentaje_proteina"];
const REPRODUCTIVOS_COLS = ["ejercicio", "id_vaca", "parto", "raza", "servicio1", "servicio2", "servicio3", "concepcion1", "toroUsado", "aborto1", "aborto2", "parto1"];
const OTROS_COLS = ["ejercicio", "id_vaca", "renguera", "mastitis", "facParto", "longevidad", "fortalezaPatas"];

const ALL_SECTIONS = [
  { name: "Básicos", cols: BASICOS_COLS },
  { name: "Productivos", cols: PRODUCTIVOS_COLS },
  { name: "Reproductivos", cols: REPRODUCTIVOS_COLS },
  { name: "Otros", cols: OTROS_COLS },
];

const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");

const matchSection = (headers: string[]) => {
  const normalized = headers.map(normalize);
  for (const section of ALL_SECTIONS) {
    const required = section.cols.filter((c) => c !== "ejercicio" && c !== "id_vaca");
    const matchCount = required.filter((c) => normalized.includes(normalize(c))).length;
    if (matchCount >= required.length * 0.6) return section;
  }
  return null;
};

const BulkUpload = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { setRegistrosBasicos, setRegistrosProductivos, setRegistrosReproductivos, setRegistrosOtros } = useGanaderia();

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        let totalRows = 0;
        const errors: string[] = [];
        const loaded: string[] = [];

        for (const sheetName of wb.SheetNames) {
          const ws = wb.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: "" });
          if (json.length === 0) continue;

          const headers = Object.keys(json[0]);
          const section = matchSection(headers);

          if (!section) {
            // Try to detect from sheet name
            const sn = normalize(sheetName);
            const found = ALL_SECTIONS.find((s) => sn.includes(normalize(s.name)));
            if (!found) {
              errors.push(`Hoja "${sheetName}": columnas no reconocidas`);
              continue;
            }
          }

          const sec = section || ALL_SECTIONS.find((s) => normalize(sheetName).includes(normalize(s.name)))!;
          const rows = json.map((row) => {
            const mapped: Record<string, string> = {};
            for (const col of sec.cols) {
              const key = Object.keys(row).find((k) => normalize(k) === normalize(col));
              mapped[col] = key ? String(row[key]) : "";
            }
            return mapped;
          }).filter((r) => r.id_vaca);

          if (rows.length === 0) {
            errors.push(`Hoja "${sheetName}": sin filas válidas (falta id_vaca)`);
            continue;
          }

          if (sec.name === "Básicos") {
            setRegistrosBasicos((prev) => [...prev, ...rows as unknown as RegistroBasico[]]);
          } else if (sec.name === "Productivos") {
            const prodRows = rows.map((r) => ({
              ...r, lc305_wood: "", lact1: "", lact2: "", lact3: "", lact4: "", lact5: "",
            }));
            setRegistrosProductivos((prev) => [...prev, ...prodRows as unknown as RegistroProductivo[]]);
          } else if (sec.name === "Reproductivos") {
            const reproRows = rows.map((r) => ({
              ...r, iip: "", ipc: "", serv_conc: "",
            }));
            setRegistrosReproductivos((prev) => [...prev, ...reproRows as unknown as RegistroReproductivo[]]);
          } else if (sec.name === "Otros") {
            setRegistrosOtros((prev) => [...prev, ...rows as unknown as RegistroOtro[]]);
          }

          totalRows += rows.length;
          loaded.push(`${sec.name}: ${rows.length}`);
        }

        if (totalRows > 0) {
          setStatus({ type: "success", message: `✅ ${totalRows} registros cargados (${loaded.join(", ")})` });
          toast.success(`${totalRows} registros importados exitosamente`);
        }
        if (errors.length > 0) {
          setStatus((prev) => ({
            type: prev?.type === "success" ? "success" : "error",
            message: `${prev?.message || ""}\n⚠️ ${errors.join("; ")}`,
          }));
          errors.forEach((err) => toast.warning(err));
        }
        if (totalRows === 0 && errors.length === 0) {
          setStatus({ type: "error", message: "No se encontraron datos válidos en el archivo" });
          toast.error("No se encontraron datos válidos");
        }
      } catch {
        setStatus({ type: "error", message: "Error al leer el archivo" });
        toast.error("Error al procesar el archivo");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-primary/30 bg-card p-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <FileSpreadsheet className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold text-card-foreground">Carga masiva de datos</p>
          <p className="text-xs text-muted-foreground">Suba un archivo Excel o CSV con las columnas del sistema</p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) processFile(f);
            e.target.value = "";
          }}
        />
        <Button size="sm" onClick={() => fileRef.current?.click()} className="gap-2">
          <Upload className="h-4 w-4" /> Subir Excel/CSV
        </Button>
      </div>
      {status && (
        <div className={`mt-3 flex items-start gap-2 text-xs rounded-lg p-2 ${status.type === "success" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
          {status.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />}
          <span className="whitespace-pre-line">{status.message}</span>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;

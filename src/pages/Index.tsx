import { Link } from "react-router-dom";
import { Milk, ClipboardList, NotebookPen, FileBarChart, BarChart3, LayoutDashboard, BookOpen, Calculator, Heart, Dna, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import BulkUpload from "@/components/BulkUpload";
import PdfDownload from "@/components/PdfDownload";

const inputItems = [
  { title: "Registros Básicos", description: "Datos base de cada vaca: raza, parto, edad", icon: BookOpen, path: "/basicos" },
  { title: "Registros Reproductivos", description: "Parto, servicios, concepción, toro usado y más", icon: NotebookPen, path: "/reproductivos" },
  { title: "Registros Productivos", description: "Producción de leche, grasa y proteína", icon: Milk, path: "/productivos" },
  { title: "Registros Otros", description: "Renguera, mastitis, longevidad y más", icon: ClipboardList, path: "/otros" },
];

const resultItems = [
  { title: "Cálculo Wood 305", description: "Producción estimada con fórmula de Wood", icon: Calculator, path: "/produccion-wood" },
  { title: "Indicadores Reproductivos", description: "IIP, IPC, servicios/concepción y ranking", icon: Heart, path: "/indicadores-reproductivos" },
  { title: "Valor de Cría", description: "Cálculo genético BV y valor hijas", icon: Dna, path: "/valor-cria" },
];

const reporteItems = [
  { title: "Reporte Vacas", description: "Reportes e indicadores de vacas", icon: FileBarChart, path: "/reporte-vacas" },
  { title: "Reporte Toros", description: "Índices genéticos y retorno económico", icon: BarChart3, path: "/reporte-toros" },
  { title: "Tablero Final", description: "Dashboard general del sistema", icon: LayoutDashboard, path: "/tablero-final" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-3">
          🐄 Sistema de Mejora Genética
        </h1>
        <p className="text-lg text-muted-foreground">
          Seleccione el módulo de registro
        </p>
      </div>

      {/* Carga masiva y PDF */}
      <div className="flex flex-col md:flex-row gap-4 max-w-5xl w-full mb-10">
        <BulkUpload />
        <PdfDownload />
      </div>

      {/* Ingreso de información */}
      <p className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
        📥 Ingreso de Información
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        {inputItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/60"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300" />
            <div className="relative flex flex-col items-center text-center gap-4">
              <div className="rounded-xl bg-primary/15 p-4">
                <item.icon className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-card-foreground">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Separador */}
      <div className="max-w-5xl w-full my-10">
        <Separator className="bg-border" />
      </div>

      {/* Resultados */}
      <p className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--result-accent))] mb-4">
        📊 Resultados
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
        {resultItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative overflow-hidden rounded-xl border-2 border-[hsl(var(--result-border))]/40 bg-[hsl(var(--result-bg))] p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[hsl(var(--result-border))]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--result-accent))]/5 to-[hsl(var(--result-accent))]/10 group-hover:from-[hsl(var(--result-accent))]/10 group-hover:to-[hsl(var(--result-accent))]/20 transition-all duration-300" />
            <div className="relative flex flex-col items-center text-center gap-3">
              <div className="rounded-lg bg-[hsl(var(--result-accent))]/15 p-3">
                <item.icon className="h-7 w-7 text-[hsl(var(--result-accent))]" />
              </div>
              <h2 className="text-base font-bold text-card-foreground">{item.title}</h2>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Separador */}
      <div className="max-w-5xl w-full my-10">
        <Separator className="bg-border" />
      </div>

      {/* Reportes y Tablero - color azul destacado */}
      <p className="text-sm font-medium uppercase tracking-wider text-blue-600 mb-4">
        📈 Reportes y Tablero
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {reporteItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative overflow-hidden rounded-2xl border-2 border-blue-400/40 bg-blue-50 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 group-hover:from-blue-500/15 group-hover:to-blue-600/20 transition-all duration-300" />
            <div className="relative flex flex-col items-center text-center gap-4">
              <div className="rounded-xl bg-blue-500/15 p-4">
                <item.icon className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-blue-900">{item.title}</h2>
              <p className="text-sm text-blue-700/70">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Ajustes - tarjeta pequeña al pie */}
      <div className="max-w-4xl w-full mt-8 flex justify-end">
        <Link
          to="/ajustes"
          className="group inline-flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-5 py-3 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-muted/70 hover:border-muted-foreground/30"
        >
          <div className="rounded-lg bg-muted p-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">Ajustes del Sistema</p>
            <p className="text-xs text-muted-foreground">Potenciales, heredabilidad y factores de corrección</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;

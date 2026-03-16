import { Link } from "react-router-dom";
import { Milk, ClipboardList, NotebookPen, FileBarChart, BarChart3, LayoutDashboard, BookOpen, Calculator, SlidersHorizontal, Heart, Dna } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const registroItems = [
  {
    title: "Registros Básicos",
    description: "Datos base de cada vaca: raza, parto, edad",
    icon: BookOpen,
    path: "/basicos",
    color: "from-accent to-accent/80",
  },
  {
    title: "Registros Reproductivos",
    description: "Parto, servicios, concepción, toro usado y más",
    icon: NotebookPen,
    path: "/reproductivos",
    color: "from-primary to-primary/80",
  },
  {
    title: "Registros Productivos",
    description: "Producción de leche, grasa y proteína",
    icon: Milk,
    path: "/productivos",
    color: "from-secondary to-accent",
  },
  {
    title: "Registros Otros",
    description: "Renguera, mastitis, longevidad y más",
    icon: ClipboardList,
    path: "/otros",
    color: "from-primary/70 to-primary",
  },
  {
    title: "Factores de Corrección",
    description: "Tabla de factores por raza, edad y lactancia",
    icon: SlidersHorizontal,
    path: "/factores",
    color: "from-accent/80 to-primary/60",
  },
  {
    title: "Cálculo Wood 305",
    description: "Producción estimada con fórmula de Wood",
    icon: Calculator,
    path: "/produccion-wood",
    color: "from-primary/60 to-accent",
  },
  {
    title: "Indicadores Reproductivos",
    description: "IIP, IPC, servicios/concepción y ranking",
    icon: Heart,
    path: "/indicadores-reproductivos",
    color: "from-accent to-primary/70",
  },
  {
    title: "Valor de Cría",
    description: "Cálculo genético BV y valor hijas",
    icon: Dna,
    path: "/valor-cria",
    color: "from-primary/80 to-accent/60",
  },
];

const reporteItems = [
  {
    title: "Reporte Vacas",
    description: "Reportes e indicadores de vacas",
    icon: FileBarChart,
    path: "/reporte-vacas",
    color: "from-[hsl(210,70%,50%)] to-[hsl(210,70%,40%)]",
    iconBg: "bg-[hsl(210,70%,90%)]",
    iconColor: "text-[hsl(210,70%,50%)]",
  },
  {
    title: "Reporte Toros",
    description: "Reportes e indicadores de toros",
    icon: BarChart3,
    path: "/reporte-toros",
    color: "from-[hsl(210,70%,50%)] to-[hsl(210,70%,40%)]",
    iconBg: "bg-[hsl(210,70%,90%)]",
    iconColor: "text-[hsl(210,70%,50%)]",
  },
  {
    title: "Tablero Final",
    description: "Dashboard general del sistema",
    icon: LayoutDashboard,
    path: "/tablero-final",
    color: "from-[hsl(210,70%,50%)] to-[hsl(210,70%,40%)]",
    iconBg: "bg-[hsl(210,70%,90%)]",
    iconColor: "text-[hsl(210,70%,50%)]",
  },
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

      {/* Registros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {registroItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            <div className="relative flex flex-col items-center text-center gap-4">
              <div className="rounded-xl bg-primary/10 p-4">
                <item.icon className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-card-foreground">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Separador */}
      <div className="max-w-4xl w-full my-10">
        <Separator className="bg-border" />
        <p className="text-center text-muted-foreground mt-4 mb-2 text-sm font-medium uppercase tracking-wider">
          Reportes y Tablero
        </p>
      </div>

      {/* Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {reporteItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            <div className="relative flex flex-col items-center text-center gap-4">
              <div className={`rounded-xl ${item.iconBg} p-4`}>
                <item.icon className={`h-10 w-10 ${item.iconColor}`} />
              </div>
              <h2 className="text-xl font-bold text-card-foreground">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;

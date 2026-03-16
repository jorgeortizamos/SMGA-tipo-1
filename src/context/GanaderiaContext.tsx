import { createContext, useContext, useState, ReactNode } from "react";

export interface RegistroReproductivo {
  id_vaca: string;
  ejercicio: string;
  parto: string;
  raza: string;
  servicio1: string;
  servicio2: string;
  servicio3: string;
  concepcion1: string;
  toroUsado: string;
  aborto1: string;
  aborto2: string;
  parto1: string;
  iip: string;
  ipc: string;
  serv_conc: string;
}

export interface RegistroOtro {
  id_vaca: string;
  ejercicio: string;
  renguera: string;
  mastitis: string;
  facParto: string;
  longevidad: string;
  fortalezaPatas: string;
}

export interface RegistroBasico {
  ejercicio: string;
  id_vaca: string;
  partos: string;
  fecha_nacimiento: string;
  raza: string;
  lactancia: string;
  edad: string;
  potencial_vaca: string;
}

export interface RegistroProductivo {
  ejercicio: string;
  id_vaca: string;
  reg_1_dia30: string;
  reg_2_dia120: string;
  reg_3_dia210: string;
  reg_4_dia270: string;
  lc305_wood: string;
  porcentaje_grasa: string;
  porcentaje_proteina: string;
  lact1: string;
  lact2: string;
  lact3: string;
  lact4: string;
  lact5: string;
}

export interface FactorCorreccion {
  raza: string;
  nivel_produccion: string;
  edad: number;
  lactancia: number;
  factor: number;
}

export const defaultFactores: FactorCorreccion[] = [
  // Holstein - Alto
  { raza: "Holstein", nivel_produccion: "Alto", edad: 2, lactancia: 1, factor: 1.222 },
  { raza: "Holstein", nivel_produccion: "Alto", edad: 3, lactancia: 1, factor: 1.187 },
  { raza: "Holstein", nivel_produccion: "Alto", edad: 3, lactancia: 2, factor: 1.056 },
  { raza: "Holstein", nivel_produccion: "Alto", edad: 4, lactancia: 1, factor: 1.127 },
  { raza: "Holstein", nivel_produccion: "Alto", edad: 4, lactancia: 2, factor: 1.021 },
  { raza: "Holstein", nivel_produccion: "Alto", edad: 4, lactancia: 3, factor: 1.000 },
  // Jersey - Alto
  { raza: "Jersey", nivel_produccion: "Alto", edad: 2, lactancia: 1, factor: 1.208 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 3, lactancia: 1, factor: 1.148 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 3, lactancia: 2, factor: 1.061 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 4, lactancia: 1, factor: 1.146 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 4, lactancia: 2, factor: 1.027 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 4, lactancia: 3, factor: 1.000 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 5, lactancia: 3, factor: 0.993 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 5, lactancia: 4, factor: 0.982 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 5, lactancia: 5, factor: 0.987 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 6, lactancia: 3, factor: 0.972 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 6, lactancia: 4, factor: 0.970 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 6, lactancia: 5, factor: 0.986 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 7, lactancia: 4, factor: 0.982 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 7, lactancia: 5, factor: 0.984 },
  { raza: "Jersey", nivel_produccion: "Alto", edad: 8, lactancia: 5, factor: 1.008 },
  // Jersey - Medio
  { raza: "Jersey", nivel_produccion: "Medio", edad: 2, lactancia: 1, factor: 1.208 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 3, lactancia: 1, factor: 1.159 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 3, lactancia: 2, factor: 1.060 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 4, lactancia: 1, factor: 1.116 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 4, lactancia: 2, factor: 1.029 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 4, lactancia: 3, factor: 1.000 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 5, lactancia: 2, factor: 1.002 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 5, lactancia: 3, factor: 0.985 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 5, lactancia: 4, factor: 0.984 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 6, lactancia: 3, factor: 0.986 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 6, lactancia: 4, factor: 0.980 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 6, lactancia: 5, factor: 0.982 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 7, lactancia: 4, factor: 0.988 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 7, lactancia: 5, factor: 0.988 },
  { raza: "Jersey", nivel_produccion: "Medio", edad: 8, lactancia: 5, factor: 1.014 },
  // Jersey - Bajo
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 2, lactancia: 1, factor: 1.182 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 3, lactancia: 1, factor: 1.167 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 3, lactancia: 2, factor: 1.058 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 4, lactancia: 1, factor: 1.111 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 4, lactancia: 2, factor: 1.026 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 4, lactancia: 3, factor: 1.000 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 5, lactancia: 2, factor: 1.030 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 5, lactancia: 3, factor: 0.980 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 5, lactancia: 4, factor: 0.998 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 6, lactancia: 3, factor: 1.031 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 6, lactancia: 4, factor: 0.998 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 6, lactancia: 5, factor: 0.981 },
  { raza: "Jersey", nivel_produccion: "Bajo", edad: 7, lactancia: 5, factor: 0.981 },
];

// Wood formula
export const calcWood = (potencial_vaca: number, dia: number): number => {
  return (potencial_vaca * 0.00318) * Math.pow(dia, 0.1027) * Math.exp(-0.003 * dia);
};

interface GanaderiaContextType {
  registrosBasicos: RegistroBasico[];
  setRegistrosBasicos: React.Dispatch<React.SetStateAction<RegistroBasico[]>>;
  registrosProductivos: RegistroProductivo[];
  setRegistrosProductivos: React.Dispatch<React.SetStateAction<RegistroProductivo[]>>;
  factores: FactorCorreccion[];
  setFactores: React.Dispatch<React.SetStateAction<FactorCorreccion[]>>;
  registrosReproductivos: RegistroReproductivo[];
  setRegistrosReproductivos: React.Dispatch<React.SetStateAction<RegistroReproductivo[]>>;
  registrosOtros: RegistroOtro[];
  setRegistrosOtros: React.Dispatch<React.SetStateAction<RegistroOtro[]>>;
}

const GanaderiaContext = createContext<GanaderiaContextType | undefined>(undefined);

export const GanaderiaProvider = ({ children }: { children: ReactNode }) => {
  const [registrosBasicos, setRegistrosBasicos] = useState<RegistroBasico[]>([]);
  const [registrosProductivos, setRegistrosProductivos] = useState<RegistroProductivo[]>([]);
  const [factores, setFactores] = useState<FactorCorreccion[]>(defaultFactores);
  const [registrosReproductivos, setRegistrosReproductivos] = useState<RegistroReproductivo[]>([]);
  const [registrosOtros, setRegistrosOtros] = useState<RegistroOtro[]>([]);

  return (
    <GanaderiaContext.Provider value={{
      registrosBasicos, setRegistrosBasicos,
      registrosProductivos, setRegistrosProductivos,
      factores, setFactores,
      registrosReproductivos, setRegistrosReproductivos,
      registrosOtros, setRegistrosOtros,
    }}>
      {children}
    </GanaderiaContext.Provider>
  );
};

export const useGanaderia = () => {
  const ctx = useContext(GanaderiaContext);
  if (!ctx) throw new Error("useGanaderia must be used within GanaderiaProvider");
  return ctx;
};

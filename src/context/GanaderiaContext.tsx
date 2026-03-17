import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

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

export interface Toro {
  id_toro: string;
  nombre: string;
  dep_leche: number;
  dep_grasa: number;
  dep_prot: number;
  dep_tph: number;
  indice_inia: number;
  indice_rovere: number;
  caracteristicas: string;
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
  toros: Toro[];
  setToros: React.Dispatch<React.SetStateAction<Toro[]>>;
  saveToSupabase: () => Promise<void>;
  loading: boolean;
}

const GanaderiaContext = createContext<GanaderiaContextType | undefined>(undefined);

export const GanaderiaProvider = ({ children }: { children: ReactNode }) => {
  const [registrosBasicos, setRegistrosBasicos] = useState<RegistroBasico[]>([]);
  const [registrosProductivos, setRegistrosProductivos] = useState<RegistroProductivo[]>([]);
  const [factores, setFactores] = useState<FactorCorreccion[]>(defaultFactores);
  const [registrosReproductivos, setRegistrosReproductivos] = useState<RegistroReproductivo[]>([]);
  const [registrosOtros, setRegistrosOtros] = useState<RegistroOtro[]>([]);
  const [toros, setToros] = useState<Toro[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [basicos, productivos, reproductivos, otros, torosData] = await Promise.all([
          supabase.from('registros_basicos').select('*'),
          supabase.from('registros_productivos').select('*'),
          supabase.from('registros_reproductivos').select('*'),
          supabase.from('registros_otros').select('*'),
          supabase.from('toros').select('*'),
        ]);

        if (basicos.data?.length) {
          setRegistrosBasicos(basicos.data.map((r: any) => ({
            ejercicio: r.ejercicio || '', id_vaca: r.id_vaca || '', partos: r.partos || '',
            fecha_nacimiento: r.fecha_nacimiento || '', raza: r.raza || '', lactancia: r.lactancia || '',
            edad: r.edad || '', potencial_vaca: r.potencial_vaca || '',
          })));
        }
        if (productivos.data?.length) {
          setRegistrosProductivos(productivos.data.map((r: any) => ({
            ejercicio: r.ejercicio || '', id_vaca: r.id_vaca || '',
            reg_1_dia30: r.reg_1_dia30 || '', reg_2_dia120: r.reg_2_dia120 || '',
            reg_3_dia210: r.reg_3_dia210 || '', reg_4_dia270: r.reg_4_dia270 || '',
            lc305_wood: r.lc305_wood || '', porcentaje_grasa: r.porcentaje_grasa || '',
            porcentaje_proteina: r.porcentaje_proteina || '',
            lact1: r.lact1 || '', lact2: r.lact2 || '', lact3: r.lact3 || '',
            lact4: r.lact4 || '', lact5: r.lact5 || '',
          })));
        }
        if (reproductivos.data?.length) {
          setRegistrosReproductivos(reproductivos.data.map((r: any) => ({
            id_vaca: r.id_vaca || '', ejercicio: r.ejercicio || '', parto: r.parto || '',
            raza: r.raza || '', servicio1: r.servicio1 || '', servicio2: r.servicio2 || '',
            servicio3: r.servicio3 || '', concepcion1: r.concepcion1 || '',
            toroUsado: r.toro_usado || '', aborto1: r.aborto1 || '', aborto2: r.aborto2 || '',
            parto1: r.parto1 || '', iip: r.iip || '', ipc: r.ipc || '', serv_conc: r.serv_conc || '',
          })));
        }
        if (otros.data?.length) {
          setRegistrosOtros(otros.data.map((r: any) => ({
            id_vaca: r.id_vaca || '', ejercicio: r.ejercicio || '',
            renguera: r.renguera || '', mastitis: r.mastitis || '',
            facParto: r.fac_parto || '', longevidad: r.longevidad || '',
            fortalezaPatas: r.fortaleza_patas || '',
          })));
        }
        if (torosData.data?.length) {
          setToros(torosData.data.map((r: any) => ({
            id_toro: r.id_toro || '', nombre: r.nombre || '',
            dep_leche: r.dep_leche || 0, dep_grasa: r.dep_grasa || 0,
            dep_prot: r.dep_prot || 0, dep_tph: r.dep_tph || 0,
            indice_inia: r.indice_inia || 0, indice_rovere: r.indice_rovere || 0,
            caracteristicas: r.caracteristicas || '',
          })));
        }
      } catch (err) {
        console.error('Error loading data from Supabase:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const saveToSupabase = async () => {
    // Clear and re-insert all data
    await Promise.all([
      supabase.from('registros_basicos').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
      supabase.from('registros_productivos').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
      supabase.from('registros_reproductivos').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
      supabase.from('registros_otros').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
      supabase.from('toros').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
    ]);

    const inserts = [];
    if (registrosBasicos.length > 0) {
      inserts.push(supabase.from('registros_basicos').insert(
        registrosBasicos.map(r => ({
          ejercicio: r.ejercicio, id_vaca: r.id_vaca, partos: r.partos,
          fecha_nacimiento: r.fecha_nacimiento, raza: r.raza, lactancia: r.lactancia,
          edad: r.edad, potencial_vaca: r.potencial_vaca,
        }))
      ));
    }
    if (registrosProductivos.length > 0) {
      inserts.push(supabase.from('registros_productivos').insert(
        registrosProductivos.map(r => ({
          ejercicio: r.ejercicio, id_vaca: r.id_vaca,
          reg_1_dia30: r.reg_1_dia30, reg_2_dia120: r.reg_2_dia120,
          reg_3_dia210: r.reg_3_dia210, reg_4_dia270: r.reg_4_dia270,
          lc305_wood: r.lc305_wood, porcentaje_grasa: r.porcentaje_grasa,
          porcentaje_proteina: r.porcentaje_proteina,
          lact1: r.lact1, lact2: r.lact2, lact3: r.lact3, lact4: r.lact4, lact5: r.lact5,
        }))
      ));
    }
    if (registrosReproductivos.length > 0) {
      inserts.push(supabase.from('registros_reproductivos').insert(
        registrosReproductivos.map(r => ({
          id_vaca: r.id_vaca, ejercicio: r.ejercicio, parto: r.parto, raza: r.raza,
          servicio1: r.servicio1, servicio2: r.servicio2, servicio3: r.servicio3,
          concepcion1: r.concepcion1, toro_usado: r.toroUsado,
          aborto1: r.aborto1, aborto2: r.aborto2, parto1: r.parto1,
          iip: r.iip, ipc: r.ipc, serv_conc: r.serv_conc,
        }))
      ));
    }
    if (registrosOtros.length > 0) {
      inserts.push(supabase.from('registros_otros').insert(
        registrosOtros.map(r => ({
          id_vaca: r.id_vaca, ejercicio: r.ejercicio,
          renguera: r.renguera, mastitis: r.mastitis, fac_parto: r.facParto,
          longevidad: r.longevidad, fortaleza_patas: r.fortalezaPatas,
        }))
      ));
    }
    if (toros.length > 0) {
      inserts.push(supabase.from('toros').insert(
        toros.map(r => ({
          id_toro: r.id_toro, nombre: r.nombre,
          dep_leche: r.dep_leche, dep_grasa: r.dep_grasa,
          dep_prot: r.dep_prot, dep_tph: r.dep_tph,
          indice_inia: r.indice_inia, indice_rovere: r.indice_rovere,
          caracteristicas: r.caracteristicas,
        }))
      ));
    }
    await Promise.all(inserts);
  };

  return (
    <GanaderiaContext.Provider value={{
      registrosBasicos, setRegistrosBasicos,
      registrosProductivos, setRegistrosProductivos,
      factores, setFactores,
      registrosReproductivos, setRegistrosReproductivos,
      registrosOtros, setRegistrosOtros,
      toros, setToros,
      saveToSupabase, loading,
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

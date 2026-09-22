export type ServiceCategory = "Cejas y Pestañas" | "Uñas" | "Faciales";

export interface ServiceAddon {
  id: string;
  name: string;
  priceArs: number;
  description: string;
}

export interface SalonService {
  id: string;
  name: string;
  category: ServiceCategory;
  priceArs: number | null; // null = Consultar por WhatsApp
  duration: string;
  tag?: string;
  description: string;
  benefits: string[];
  care: string;
  waMessage: string;
}

export const SALON_SERVICES: SalonService[] = [
  // ----------------------------------------------------
  // 1. CEJAS Y PESTAÑAS
  // ----------------------------------------------------
  {
    id: "lifting-pestanas",
    name: "Lifting de pestañas",
    category: "Cejas y Pestañas",
    priceArs: 35000,
    duration: "60 a 75 min",
    tag: "Más pedido",
    description:
      "Arqueado y elevación de pestañas naturales desde la raíz mediante moldes anatómicos de silicona. Incluye tinte negro intenso y baño de nutrición con keratina y botox capilar.",
    benefits: [
      "Apertura total de la mirada sin extensiones",
      "Pestañas visualmente más largas y arqueadas",
      "Nutrición que engrosa y fortalece la fibra",
      "Duración de 6 a 8 semanas según ciclo capilar",
    ],
    care: "Mantener secas durante las primeras 24 horas (sin vapor, agua caliente ni máscara de pestañas).",
    waMessage: "Hola Geraldine! Quisiera reservar un turno para Lifting de pestañas ($35.000) en el estudio.",
  },
  {
    id: "lifting-tecnica-coreana",
    name: "Lifting de pestañas Téc. Coreana",
    category: "Cejas y Pestañas",
    priceArs: 40000,
    duration: "75 min",
    tag: "Técnica Innovadora",
    description:
      "Metodología avanzada coreana de curvatura milimétrica con agentes tensores ultra suaves. Logra un arqueado tipo abanico ultra definido y natural, preservando al máximo la salud y elasticidad de la fibra.",
    benefits: [
      "Fórmula hipoalergénica con tiempos de exposición calibrados",
      "Efecto abanico perfectamente separado y armónico",
      "Ideal para pestañas finas, rectas o hacia abajo",
      "Incluye nutrición botánica intensiva",
    ],
    care: "Evitar fricción y desmaquillantes bifásicos las primeras 24 horas.",
    waMessage: "Hola Geraldine! Quisiera consultar turno para el Lifting de pestañas Técnica Coreana ($40.000).",
  },
  {
    id: "laminado-cejas",
    name: "Laminado de cejas",
    category: "Cejas y Pestañas",
    priceArs: 32900,
    duration: "60 min",
    tag: "Tratamiento Estrella",
    description:
      "Tratamiento alisador y fijador que disciplina el pelo rebelde hacia la dirección deseada. Otorga mayor grosor óptico, definición peinada y aspecto de ceja más tupida.",
    benefits: [
      "Corrige remolinos, asimetrías y vello rebelde",
      "Efecto peinado y abundante al instante",
      "Duración de 4 a 6 semanas",
      "Nutrición profunda con activos acondicionadores",
    ],
    care: "No mojar ni aplicar productos oleosos las primeras 24 horas. Cepillar a diario en seco.",
    waMessage: "Hola! Me gustaría agendar un turno para Laminado de cejas ($32.900) en Recoleta.",
  },
  {
    id: "cejas-hd",
    name: "Cejas HD (Styling y henna)",
    category: "Cejas y Pestañas",
    priceArs: 22000,
    duration: "45 min",
    tag: "Definición Total",
    description:
      "Protocolo integral de alta definición: diseño de forma según tu fisonomía, depilación y sombreado con henna botánica personalizada para rellenar claros y aportar densidad visual.",
    benefits: [
      "Color en vello por hasta 3-4 semanas",
      "Sombra suave sobre la piel por 7 a 10 días",
      "Pigmentos botánicos naturales no agresivos",
      "Enmarca y estiliza la mirada de forma inmediata",
    ],
    care: "Evitar frotar con jabones o limpiadores abrasivos sobre la zona tratada.",
    waMessage: "Hola Geraldine! Quisiera reservar un turno para Cejas HD (Styling y henna) ($22.000).",
  },
  {
    id: "diseno-perfilado",
    name: "Diseño y perfilado",
    category: "Cejas y Pestañas",
    priceArs: 20000,
    duration: "35 a 45 min",
    tag: "Personalizado",
    description:
      "Mapeo visagista y depilación precisa con hilo inductor y pinza estéril para resaltar la estructura natural de tus cejas sin perder su grosor característico.",
    benefits: [
      "Medición de proporciones áureas de tu rostro",
      "Extracción desde la raíz sin irritar la piel",
      "Limpia vellitos finos imperceptibles",
    ],
    care: "Aplicar gel calmante o protector solar post-perfilado.",
    waMessage: "Hola! Quisiera pedir un turno para Diseño y perfilado de cejas ($20.000).",
  },

  // ----------------------------------------------------
  // 2. UÑAS
  // ----------------------------------------------------
  {
    id: "esmaltado-semi",
    name: "Esmaltado Semi",
    category: "Uñas",
    priceArs: 26500,
    duration: "60 min",
    tag: "Clásico Impecable",
    description:
      "Manicuría combinada rusa con limpieza profunda de cutículas, limado con forma armónica y esmaltado semipermanente curado en lámpara LED con brillo cristal de hasta 21 días.",
    benefits: [
      "Contorno de cutícula limpio y pulido sin lastimar",
      "Secado inmediato y brillo impecable",
      "Amplia paleta de tonos nude, rojos, milky y de temporada",
    ],
    care: "Usar aceite de cutículas a diario y no retirar el esmalte tironeando.",
    waMessage: "Hola! Quisiera reservar turno para Esmaltado Semipermanente ($26.500).",
  },
  {
    id: "capping-gel",
    name: "Capping Gel",
    category: "Uñas",
    priceArs: 28000,
    duration: "75 a 90 min",
    tag: "Mayor Fuerza",
    description:
      "Fina capa de gel estructural sobre tu uña natural que aporta resistencia, firmeza y previene fisuras, permitiendo que crezcan largas y sanas sin quebrarse. Incluye esmaltado semi.",
    benefits: [
      "Ideal para uñas quebradizas, descamadas o débiles",
      "Grosor natural que no añade volumen excesivo",
      "Durabilidad prolongada de 20 a 25 días",
      "Protege la placa ungueal durante el crecimiento",
    ],
    care: "Evitar usar las uñas como herramientas para abrir objetos.",
    waMessage: "Hola! Me interesa reservar un turno para Capping Gel ($28.000).",
  },
  {
    id: "capping-polygel",
    name: "Capping Polygel",
    category: "Uñas",
    priceArs: 30000,
    duration: "90 min",
    tag: "Resistencia Extrema",
    description:
      "Refuerzo premium con tecnología híbrida de polygel (fusión de acrílico y gel). Aporta la máxima rigidez y durabilidad ante impactos, perfecto para uñas muy finas o exigidas.",
    benefits: [
      "Máxima resistencia estructural sin pesadez",
      "Nivelación perfecta de estrías o irregularidades",
      "Brillo intacto y cero astillamiento",
    ],
    care: "Hidratar manos y cutículas periódicamente.",
    waMessage: "Hola Geraldine! Quisiera pedir un turno para Capping Polygel ($30.000).",
  },
  {
    id: "belleza-pies",
    name: "Belleza de pies",
    category: "Uñas",
    priceArs: 27000,
    duration: "60 min",
    tag: "Cuidado Integral",
    description:
      "Servicio integral de pedicuría estética: limado, higiene profunda de cutículas, exfoliación suavizante y esmaltado semipermanente de alta resistencia.",
    benefits: [
      "Pies suaves, prolijos y descansados",
      "Esmalte intacto por semanas",
      "Higiene profunda con instrumentos 100% esterilizados",
    ],
    care: "Aplicar crema humectante podal nocturna.",
    waMessage: "Hola! Quisiera reservar turno para Belleza de pies ($27.000).",
  },

  // ----------------------------------------------------
  // 3. FACIALES
  // ----------------------------------------------------
  {
    id: "limpieza-facial-profunda",
    name: "Limpieza facial profunda",
    category: "Faciales",
    priceArs: 43000,
    duration: "60 a 75 min",
    tag: "Higiene Esencial",
    description:
      "Protocolo dermatológico de higiene cutánea: doble limpieza, exfoliación enzimática, extracción minuciosa de comedones, alta frecuencia descongestiva y máscara hidratante calmante.",
    benefits: [
      "Poros limpios y libres de puntos negros",
      "Eliminación de impurezas y células muertas",
      "Piel suave, descongestionada y luminosa",
      "Productos aprobados por ANMAT aptos para piel sensible",
    ],
    care: "Usar protector solar FPS 50+ y no aplicar maquillaje pesado las primeras 12 hs.",
    waMessage: "Hola! Quisiera agendar un turno para Limpieza facial profunda ($43.000).",
  },
  {
    id: "limpieza-dermaplaning",
    name: "Limpieza facial prof. + Dermaplaning",
    category: "Faciales",
    priceArs: 45000,
    duration: "75 a 90 min",
    tag: "Efecto Porcelana",
    description:
      "Tratamiento doble acción que suma a la limpieza profunda una exfoliación física con bisturí quirúrgico descartable. Remueve vello facial fino (vellus) y capa córnea para un glow inmediato.",
    benefits: [
      "Piel ultra suave con textura efecto porcelana",
      "Aumenta hasta un 80% la absorción de sérums",
      "Facilita un maquillaje más parejo y sedoso",
      "Luminosidad y renovación celular instantánea",
    ],
    care: "Uso obligatorio de protector solar y evitar exfoliantes químicos por 48 horas.",
    waMessage: "Hola Geraldine! Quisiera pedir turno para Limpieza facial profunda + Dermaplaning ($45.000).",
  },
  {
    id: "hydra-lips",
    name: "Hydra Lips",
    category: "Faciales",
    priceArs: null,
    duration: "45 min",
    tag: "Nutrición Labial",
    description:
      "Tratamiento intensivo de regeneración labial mediante micropunción superficial con cóctel de ácido hialurónico y vitaminas. Restaura labios resecos, aportando volumen óptico, suavidad y color natural.",
    benefits: [
      "Elimina pellejitos y grietas labiales",
      "Aporta hidratación profunda y jugosidad",
      "Efecto de labios más turgentes y carnosos",
    ],
    care: "Aplicar bálsamo labial nutritivo frecuentemente y no exfoliar la zona.",
    waMessage: "Hola! Quisiera consultar precio y disponibilidad para el tratamiento de Hydra Lips.",
  },
  {
    id: "microneedling",
    name: "Microneedling",
    category: "Faciales",
    priceArs: null,
    duration: "60 min",
    tag: "Colágeno & Firmeza",
    description:
      "Terapia de micro-inducción de colágeno dérmico mediante nano-punciones controladas para ingresar principios activos tensores, atenuar poros dilatados, líneas finas y manchas superficiales.",
    benefits: [
      "Estimula la producción natural de colágeno y elastina",
      "Mejora la textura, firmeza y tono de la piel",
      "Atenúa marcas leves de acné y poros visibles",
    ],
    care: "Evitar exposición solar directa, calor y saunas por 72 horas.",
    waMessage: "Hola Geraldine! Quisiera consultar información y precio para una sesión de Microneedling.",
  },
];

export const SALON_ADDONS: ServiceAddon[] = [
  {
    id: "retiro-capping",
    name: "Retiro capping",
    priceArs: 9000,
    description: "Remoción profesional y no invasiva de gel o polygel cuidando la placa ungueal.",
  },
  {
    id: "retiro-semi",
    name: "Retiro semi",
    priceArs: 6000,
    description: "Remoción cuidadosa de esmaltado semipermanente con pulido e hidratación.",
  },
  {
    id: "french-plus",
    name: "French +",
    priceArs: 4000,
    description: "Diseño clásico o moderno de francesita prolija y estilizada.",
  },
  {
    id: "deco-plus",
    name: "Deco +",
    priceArs: 5000,
    description: "Nail art fino, glitter, líneas, apliques o diseño personalizado a mano alzada.",
  },
];

export function formatServicePrice(price: number | null): string {
  if (price === null) return "Consultar";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

import type { QuizQuestion } from "@/lib/types";

/**
 * Banco de evaluaciones por módulo. Multiple choice de opción única.
 *
 * Preguntas y respuestas derivadas EXCLUSIVAMENTE del contenido real de cada módulo
 * (ver src/content/courses.ts y COURSE_ARCHITECTURE.md). No se inventó información técnica.
 *
 * `correctIndex` y `explanation` viven solo en el server: la corrección es server-side
 * (ver lib/domain/quiz.ts) y al cliente se le envían las preguntas sin la respuesta correcta.
 *
 * `revisitLessonSlug` apunta a la clase exacta a repasar cuando la respuesta es incorrecta.
 */
export const MODULE_QUIZZES: Record<string, QuizQuestion[]> = {
  // ============================== LAMINADO ==============================
  "mod-lam-01": [
    {
      id: "q-lam-01-1",
      question: "¿Qué representa la ceja en el rostro?",
      options: [
        "Un detalle sin impacto en la armonía",
        "El marco del rostro",
        "Solo una cuestión de moda pasajera",
      ],
      correctIndex: 1,
      explanation:
        "La ceja es el marco del rostro: un diseño correcto realza y armoniza las facciones.",
      revisitLessonSlug: "que-son-las-cejas",
    },
    {
      id: "q-lam-01-2",
      question: "¿Para qué sirve el visagismo?",
      options: [
        "Para elegir el color de la henna",
        "Para desinfectar los materiales",
        "Para determinar anchura, grosor, dimensión y curvatura según el rostro",
      ],
      correctIndex: 2,
      explanation:
        "El visagismo define el diseño según los rasgos del rostro para aportar equilibrio y simetría.",
      revisitLessonSlug: "visagismo-medicion-hilo",
    },
    {
      id: "q-lam-01-3",
      question: "¿Con qué se realiza la marcación del diseño?",
      options: [
        "Con hilo y lapicera de gel blanca",
        "Solo con la pinza",
        "Con henna directamente",
      ],
      correctIndex: 0,
      explanation:
        "La marcación se hace con hilo y se dibuja el diseño con la lapicera de gel blanca antes de depilar.",
      revisitLessonSlug: "materiales-laminado",
    },
  ],
  "mod-lam-02": [
    {
      id: "q-lam-02-1",
      question: "¿Cuál es la diferencia de uso entre la pinza y la navaja?",
      options: [
        "Ambas hacen exactamente lo mismo",
        "La pinza retira el exceso por fuera del diseño y la navaja las pelusas al ras",
        "La navaja retira todo el vello y la pinza no se usa",
      ],
      correctIndex: 1,
      explanation:
        "Con la pinza se retira el exceso por fuera del diseño; con la navaja, solo las pelusas al ras (no vello).",
      revisitLessonSlug: "metodo-depilacion",
    },
    {
      id: "q-lam-02-2",
      question: "Antes de empezar a depilar, ¿qué paso es importante?",
      options: [
        "Aplicar el botox",
        "Aplicar la henna",
        "Mostrar el diseño y que la clienta lo apruebe",
      ],
      correctIndex: 2,
      explanation:
        "Siempre se muestra el diseño a la clienta y recién con su aprobación se empieza a depilar.",
      revisitLessonSlug: "paso-a-paso-perfilado",
    },
    {
      id: "q-lam-02-3",
      question: "¿Qué incluye el servicio Full Brows?",
      options: [
        "Laminado, visagismo, depilación y henna opcional",
        "Solo el perfilado clásico",
        "Solo la aplicación de henna",
      ],
      correctIndex: 0,
      explanation:
        "Full Brows combina laminado, luego visagismo, depilación y por último henna (opcional).",
      revisitLessonSlug: "tres-servicios",
    },
  ],
  "mod-lam-03": [
    {
      id: "q-lam-03-1",
      question: "¿En qué proporción se prepara la henna?",
      options: [
        "Dos partes de henna por una de activador",
        "Partes iguales de henna y activador",
        "Solo henna, sin activador",
      ],
      correctIndex: 1,
      explanation:
        "Se prepara una parte de henna y una de activador (partes iguales) y se mezcla hasta homogeneizar.",
      revisitLessonSlug: "henna-aplicacion-tonos",
    },
    {
      id: "q-lam-03-2",
      question: "¿Cuánto permanece aproximadamente el color de la henna en el pelo?",
      options: ["Al menos 10 días", "Un solo día", "No permanece nada"],
      correctIndex: 0,
      explanation:
        "En el pelo dura al menos 10 días y en la piel de 5 a 10 días, según lavado y skincare.",
      revisitLessonSlug: "henna-que-es",
    },
    {
      id: "q-lam-03-3",
      question: "¿Cómo se logra un castaño medio?",
      options: [
        "Usando solo negro",
        "Con más activador",
        "Rubio y negro en partes iguales",
      ],
      correctIndex: 2,
      explanation:
        "Rubio + negro en partes iguales da castaño medio; más rubio aclara y más negro oscurece.",
      revisitLessonSlug: "henna-aplicacion-tonos",
    },
  ],
  "mod-lam-04": [
    {
      id: "q-lam-04-1",
      question: "¿Qué paso es indispensable al final del laminado?",
      options: ["Aplicar botox", "Aplicar henna", "Depilar con navaja"],
      correctIndex: 0,
      explanation:
        "Tras el paso 1 y 2 se aplica botox (indispensable), se deja actuar 10 minutos y se retira.",
      revisitLessonSlug: "laminado-paso-a-paso",
    },
    {
      id: "q-lam-04-2",
      question: "¿Cuánto se deja actuar el paso 1 (permanente)?",
      options: ["1 minuto fijo", "10 a 15 minutos según el tipo de vello", "Una hora"],
      correctIndex: 1,
      explanation:
        "El paso 1 actúa de 10 a 15 minutos según el tipo de vello; el paso 2 el mismo tiempo.",
      revisitLessonSlug: "laminado-paso-a-paso",
    },
    {
      id: "q-lam-04-3",
      question: "¿Para qué se utiliza el laminado?",
      options: [
        "Para teñir la piel",
        "Para reemplazar al visagismo",
        "Para dar forma a vellos rebeldes y generar grosor realzando el color",
      ],
      correctIndex: 2,
      explanation:
        "El laminado da forma a vellos rebeldes, genera grosor en cejas finas y realza el color natural.",
      revisitLessonSlug: "laminado-que-es",
    },
  ],
  "mod-lam-05": [
    {
      id: "q-lam-05-1",
      question: "En las primeras 24 hs, ¿qué NO se debe hacer?",
      options: [
        "Lavar, refregar o maquillar la zona",
        "Dormir boca arriba",
        "Tomar agua",
      ],
      correctIndex: 0,
      explanation:
        "En las primeras 24 hs no se lava ni refriega la zona y no se aplica maquillaje ni cosméticos.",
      revisitLessonSlug: "cuidados-post-servicio",
    },
    {
      id: "q-lam-05-2",
      question: "¿Qué organismo debe tener aprobado el producto que usamos?",
      options: ["AFIP", "ANMAT", "El proveedor del producto"],
      correctIndex: 1,
      explanation:
        "Siempre hay que verificar que el producto esté aprobado por ANMAT (eficacia, seguridad y calidad).",
      revisitLessonSlug: "higiene-anmat",
    },
    {
      id: "q-lam-05-3",
      question: "¿Qué se hace con los materiales descartables?",
      options: [
        "Se lavan y se reutilizan",
        "Se comparten entre clientas",
        "No se reutilizan",
      ],
      correctIndex: 2,
      explanation:
        "Los materiales descartables no se reutilizan; el espacio y las manos siempre desinfectados.",
      revisitLessonSlug: "higiene-anmat",
    },
  ],

  // ============================== LIFTING ==============================
  "mod-lif-01": [
    {
      id: "q-lif-01-1",
      question: "¿Cuál es la diferencia entre el lifting y la permanente?",
      options: ["El químico utilizado", "El molde", "El precio del servicio"],
      correctIndex: 1,
      explanation:
        "La diferencia radica únicamente en el molde: ambas técnicas pueden usar el mismo químico.",
      revisitLessonSlug: "que-es-el-lifting",
    },
    {
      id: "q-lif-01-2",
      question: "¿Qué componente aporta estructura y resistencia al pelo?",
      options: ["La queratina", "La melanina", "El agua"],
      correctIndex: 0,
      explanation:
        "La queratina es la proteína fibrosa responsable de la estructura y resistencia del pelo.",
      revisitLessonSlug: "el-pelo-componentes",
    },
    {
      id: "q-lif-01-3",
      question: "¿Qué determina el color del pelo?",
      options: ["El agua y los lípidos", "La queratina", "La melanina"],
      correctIndex: 2,
      explanation:
        "La melanina es el pigmento que da color al pelo y su cantidad determina el tono.",
      revisitLessonSlug: "el-pelo-componentes",
    },
  ],
  "mod-lif-02": [
    {
      id: "q-lif-02-1",
      question: "¿Qué hace el paso 1 del químico?",
      options: [
        "Sella la cutícula",
        "Fragmenta la cutícula y rompe queratina y melanina",
        "Solo hidrata el pelo",
      ],
      correctIndex: 1,
      explanation:
        "El paso 1 fragmenta la cutícula y rompe moléculas de queratina (fuerza) y luego melanina (color).",
      revisitLessonSlug: "correcta-accion-quimicos",
    },
    {
      id: "q-lif-02-2",
      question: "¿Dónde se logra el cambio de estructura del pelo?",
      options: ["En la corteza (cortex)", "En la punta", "En la piel"],
      correctIndex: 0,
      explanation:
        "Se abren las cutículas para llegar al cortex, que es donde se logran los cambios de estructura.",
      revisitLessonSlug: "corteza-cortex",
    },
    {
      id: "q-lif-02-3",
      question: "¿Cómo se identifican los químicos de acción rápida?",
      options: ["Por su color", "Por su marca", "Por sus tiempos de acción cortos"],
      correctIndex: 2,
      explanation:
        "Se identifican por sus tiempos de acción, que varían según el Ph. Los rápidos tienen tiempos cortos.",
      revisitLessonSlug: "tiempos-de-accion",
    },
  ],
  "mod-lif-03": [
    {
      id: "q-lif-03-1",
      question: "¿Cuál es el instrumento principal para modificar el pelo?",
      options: ["El molde", "El pincel", "El algodón"],
      correctIndex: 0,
      explanation:
        "El molde es el instrumento principal; entenderlo permite lograr los cambios sin dificultades.",
      revisitLessonSlug: "herramientas-moldes",
    },
    {
      id: "q-lif-03-2",
      question: "¿Qué efecto da un molde redondo / curva C?",
      options: [
        "Efecto full up con el punto más alto abajo",
        "Full curvatura con el punto más alto arriba",
        "No genera curvatura",
      ],
      correctIndex: 1,
      explanation:
        "El redondo/curva C da full curvatura (punto más alto arriba); el plano da full up (punto abajo).",
      revisitLessonSlug: "curvas-formatos-moldes",
    },
    {
      id: "q-lif-03-3",
      question: "¿De qué depende la elección de la curva?",
      options: [
        "Solo del químico",
        "Solo del precio",
        "Del ojo, el gusto de la clienta y el consejo profesional",
      ],
      correctIndex: 2,
      explanation:
        "La curva (C·U·D·LD) depende del ojo, el gusto de la clienta y el consejo profesional.",
      revisitLessonSlug: "curvas-formatos-moldes",
    },
  ],
  "mod-lif-04": [
    {
      id: "q-lif-04-1",
      question: "¿Cuál es una causa frecuente de mala praxis?",
      options: [
        "Desinfectar los materiales",
        "Hidratar con keratina",
        "Usar tiempos de acción incorrectos para el tipo de pelo",
      ],
      correctIndex: 2,
      explanation:
        "Entre las causas están: químico en las puntas sin necesidad, mal molde, tiempos incorrectos y productos muy alcalinos.",
      revisitLessonSlug: "mala-praxis",
    },
    {
      id: "q-lif-04-2",
      question: "Luego de 24 hs, ¿cómo se cuidan las pestañas?",
      options: [
        "Hidratando con keratina o serum y usando desmaquillante bifásico",
        "Con máscara a prueba de agua",
        "Refregándolas con agua caliente",
      ],
      correctIndex: 0,
      explanation:
        "Se hidratan con keratina o serum, se evitan las máscaras a prueba de agua y se usa desmaquillante bifásico.",
      revisitLessonSlug: "cuidados-post-servicio-lifting",
    },
    {
      id: "q-lif-04-3",
      question: "¿Qué organismo debe tener aprobado el producto?",
      options: ["El proveedor", "ANMAT", "AFIP"],
      correctIndex: 1,
      explanation:
        "Siempre se verifica que el producto esté aprobado por ANMAT antes de usarlo con clientas.",
      revisitLessonSlug: "higiene-anmat-lifting",
    },
  ],
};

export function getModuleQuiz(moduleId: string): QuizQuestion[] {
  return MODULE_QUIZZES[moduleId] ?? [];
}

export function moduleHasQuiz(moduleId: string): boolean {
  return (MODULE_QUIZZES[moduleId]?.length ?? 0) > 0;
}

import type { Course } from "@/lib/types";
import { siteConfig } from "@/config/site.config";

/**
 * FUENTE DE VERDAD del contenido educativo de GCStudio.
 *
 * Derivado EXCLUSIVAMENTE del material real (ver COURSE_ARCHITECTURE.md):
 * - Curso Laminado de Cejas.pdf (21 pág.) + Curso Laminado de cejas Video.mp4 (529.92 s)
 * - Curso Lifting.pdf (23 pág.) + Curso Lifting Video.mp4 (857.31 s, con subtítulos)
 *
 * Este archivo alimenta:
 *  - el modo mock/desarrollo (render sin base de datos),
 *  - el generador del seed SQL (scripts/generate-seed.mjs → supabase/seed.sql).
 *
 * NO se inventó contenido técnico. Los timestamps por clase son null (NO CONFIRMADO):
 * los videos son grabaciones continuas sin cortes; se cargan desde el Admin.
 */

const laminado: Course = {
  id: "course-laminado",
  slug: "laminado-de-cejas",
  title: "Laminado de Cejas",
  subtitle: "Full Brows · Taller Cejas Perfectas",
  description:
    "Formación profesional en diseño, perfilado, henna y laminado de cejas. Para profesionales y principiantes. Dictado por Geraldine Colman.",
  level: "Profesionales y principiantes",
  status: "published",
  videoDurationSeconds: 529.92,
  videoAssetId: null,
  coverImage: "/media/covers/laminado.jpg",
  heroImage: "/media/covers/laminado-hero.jpg",
  priceArs: siteConfig.pricing.laminadoArs,
  outcomes: [
    "Diseñar cejas con visagismo y medición con hilo en base a medidas exactas",
    "Ejecutar el perfilado clásico con pinza y navaja de forma prolija y segura",
    "Aplicar henna: preparación, tiempos y mezcla de tonos",
    "Realizar el laminado (Full Brows) paso a paso, incluido el botox final",
    "Aplicar cuidados post servicio y bioseguridad según normativa ANMAT",
  ],
  audience: [
    "Esteticistas que quieren sumar el servicio de cejas",
    "Principiantes que arrancan de cero con método",
    "Profesionales que buscan estandarizar su técnica",
  ],
  modules: [
    {
      id: "mod-lam-01",
      courseId: "course-laminado",
      order: 1,
      title: "Fundamentos y diseño",
      summary: "La ceja como marco del rostro, materiales y visagismo.",
      lessons: [
        {
          id: "les-lam-0101",
          slug: "que-son-las-cejas",
          moduleId: "mod-lam-01",
          order: 1,
          title: "¿Qué son las cejas y por qué importan?",
          summary:
            "La ceja como marco del rostro y por qué un diseño correcto realza y armoniza las facciones.",
          objectives: [
            "Entender el rol de la ceja en la armonía facial",
            "Comprender por qué el diseño debe ser natural y personalizado",
          ],
          highlights: [
            "La ceja es el marco del rostro",
            "Un diseño correcto realza; uno mal ejecutado logra el efecto opuesto",
            "Las modas cambian (grosor, longitud, color) pero el resultado siempre debe ser natural",
          ],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "Las cejas son el marco de nuestro rostro. Un diseño correcto puede realzar y armonizar las facciones, u ocasionar el resultado opuesto si se ejecuta de mala manera.",
            },
            {
              kind: "callout",
              tone: "gold",
              title: "Principio rector",
              text: "A lo largo de los años cambiaron las modas de grosor, longitud y color, pero el resultado siempre debe ser un diseño natural, apto y personalizado para el rostro, en base a medidas exactas.",
            },
          ],
          resources: [
            {
              id: "res-lam-0101-pdf",
              title: "PDF del curso — Laminado de Cejas",
              type: "pdf",
              url: "/media/resources/laminado.pdf",
            },
          ],
        },
        {
          id: "les-lam-0102",
          slug: "materiales-laminado",
          moduleId: "mod-lam-01",
          order: 2,
          title: "Materiales de trabajo",
          summary: "El kit completo para diseñar y perfilar cejas de forma profesional.",
          objectives: ["Conocer cada material y su función", "Armar tu kit de trabajo"],
          highlights: [
            "Herramientas de medición y marcación",
            "Herramientas de depilación",
            "Consumibles e higiene",
          ],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Materiales necesarios",
              items: [
                "Pinza de depilar recta, diagonal o en punta",
                "Calibre medidor",
                "Lápiz dermográfico y lapicera de gel blanca",
                "Tijera de punta fina",
                "Perfilador o navaja profesional",
                "Hilo de algodón, brow shampoo, algodón y cepillos",
              ],
            },
          ],
          resources: [
            {
              id: "res-lam-0102-check",
              title: "Checklist de materiales",
              type: "checklist",
              url: null,
              body: [
                {
                  kind: "list",
                  title: "Antes de empezar, verificá tener",
                  items: [
                    "Pinza (recta / diagonal / punta)",
                    "Calibre medidor",
                    "Lápiz dermográfico + lapicera de gel blanca",
                    "Tijera de punta fina",
                    "Perfilador o navaja profesional",
                    "Hilo de algodón + brow shampoo + algodón + cepillos",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "les-lam-0103",
          slug: "visagismo-medicion-hilo",
          moduleId: "mod-lam-01",
          order: 3,
          title: "Visagismo: medición con hilo",
          summary:
            "Técnica para determinar anchura, grosor, dimensión y curvatura según el rostro.",
          objectives: [
            "Aplicar visagismo para equilibrar el rostro",
            "Medir con hilo para lograr simetría",
          ],
          highlights: [
            "Anchura, grosor, dimensión y curvatura",
            "Aporta equilibrio y armonía",
            "Rostro más simétrico",
          ],
          source: "both",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "El visagismo de cejas es una técnica para saber qué diseño (anchura, grosor, dimensión y curvatura) deben tener las cejas según los rasgos y dimensiones del rostro. Bien hecho, aporta equilibrio y armonía, haciendo lucir el rostro más simétrico.",
            },
          ],
          resources: [
            {
              id: "res-lam-0103-pdf",
              title: "PDF del curso — Laminado de Cejas",
              type: "pdf",
              url: "/media/resources/laminado.pdf",
            },
          ],
        },
      ],
    },
    {
      id: "mod-lam-02",
      courseId: "course-laminado",
      order: 2,
      title: "Perfilado y depilación",
      summary: "Los tres servicios, el método de depilación y el paso a paso.",
      lessons: [
        {
          id: "les-lam-0201",
          slug: "tres-servicios",
          moduleId: "mod-lam-02",
          order: 1,
          title: "Los 3 servicios a ofrecer",
          summary: "Perfilado clásico, perfilado con henna y Full Brows (laminado).",
          objectives: ["Diferenciar los tres servicios", "Saber qué incluye cada uno"],
          highlights: ["Perfilado clásico", "Perfilado con henna", "Full Brows (laminado)"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "table",
              title: "Comparativa de servicios",
              headers: ["Servicio", "En qué consiste"],
              rows: [
                [
                  "1 · Perfilado clásico",
                  "Visagismo y marcación correspondiente. Luego se depila con pinza y navaja.",
                ],
                [
                  "2 · Perfilado con henna",
                  "Perfilado clásico y, una vez terminado, se rellena el diseño de visagismo con henna.",
                ],
                [
                  "3 · Full Brows (laminado)",
                  "Primero el laminado, luego el visagismo, la depilación y por último la henna (opcional).",
                ],
              ],
            },
          ],
          resources: [],
        },
        {
          id: "les-lam-0202",
          slug: "metodo-depilacion",
          moduleId: "mod-lam-02",
          order: 2,
          title: "Método de depilación (pinza y navaja)",
          summary: "Cómo retirar el exceso con pinza y las pelusas al ras con la navaja.",
          objectives: ["Depilar por fuera del diseño con pinza", "Retirar pelusas al ras con navaja"],
          highlights: [
            "Marcar con lápiz blanco antes de depilar",
            "Pinza: exceso por fuera del diseño",
            "Navaja: solo pelusas al ras, no vello",
          ],
          source: "both",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "Una vez realizado el diseño y marcado con el lápiz blanco, retiramos con la pinza todo el exceso de vello por fuera del mismo. Con la navaja, muy cuidadosamente, retiramos solo las pelusas al ras del diseño (no vello) para que el trabajo quede mucho más limpio.",
            },
          ],
          resources: [],
        },
        {
          id: "les-lam-0203",
          slug: "paso-a-paso-perfilado",
          moduleId: "mod-lam-02",
          order: 3,
          title: "Paso a paso del perfilado",
          summary: "El procedimiento completo, de la limpieza a la corrección final.",
          objectives: ["Ejecutar el perfilado en orden", "Validar el diseño con la clienta"],
          highlights: ["Limpieza", "Marcación con hilo", "Aprobación del diseño", "Depilación y corrección"],
          source: "both",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "steps",
              title: "Procedimiento",
              items: [
                "Limpiar muy bien la zona de las cejas con lash shampoo y retirar con un algodón humedecido.",
                "Realizar la marcación con hilo y dibujar el diseño con la lapicera de gel blanca. Es importante mostrar el diseño a la clienta antes de comenzar.",
                "Una vez aprobado el diseño, retirar todo el exceso de vello por fuera de la marcación blanca y, con la navaja, cuidadosamente retirar la pelusa.",
                "Borrar toda la marcación con algodón y antibacterial o agua. Si es necesario, corregir.",
              ],
            },
          ],
          resources: [
            {
              id: "res-lam-0203-guide",
              title: "Guía de procedimiento del perfilado",
              type: "guide",
              url: null,
              body: [
                {
                  kind: "steps",
                  items: [
                    "Limpieza con lash shampoo",
                    "Marcación con hilo + diseño con gel blanca",
                    "Mostrar y aprobar el diseño",
                    "Depilar exceso (pinza) + pelusas al ras (navaja)",
                    "Borrar marcación y corregir",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "mod-lam-03",
      courseId: "course-laminado",
      order: 3,
      title: "Henna",
      summary: "Qué es la henna, cómo se aplica y cómo se mezclan los tonos.",
      lessons: [
        {
          id: "les-lam-0301",
          slug: "henna-que-es",
          moduleId: "mod-lam-03",
          order: 1,
          title: "Qué es la henna y cuánto dura",
          summary: "Materiales de henna y su duración en pelo y piel.",
          objectives: ["Conocer los materiales de henna", "Explicar la duración a la clienta"],
          highlights: ["Materiales", "Duración en pelo (~10 días)", "Duración en piel (5–10 días)"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Materiales",
              items: [
                "Henna marrón y negra (se pueden mezclar entre sí)",
                "Activador",
                "Pincel biselado",
                "Hisopos / micro hisopos / algodón",
              ],
            },
            {
              kind: "paragraph",
              text: "La duración depende de la frecuencia de lavado y del skincare de la clienta. Aproximadamente el color permanece en el PELO al menos 10 días y en la PIEL de 5 a 10 días.",
            },
          ],
          resources: [],
        },
        {
          id: "les-lam-0302",
          slug: "henna-aplicacion-tonos",
          moduleId: "mod-lam-03",
          order: 2,
          title: "Aplicación y mezcla de tonos",
          summary: "Preparación, tiempos de acción y cómo lograr cada tono de castaño.",
          objectives: ["Preparar y aplicar la henna", "Mezclar tonos según el resultado buscado"],
          highlights: ["Partes iguales henna + activador", "5 a 15 minutos de acción", "Mezcla de tonos"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "steps",
              title: "Cómo utilizar la henna",
              items: [
                "Preparar en un vaso dappen una parte de henna y otra de activador (partes iguales).",
                "Mezclar muy bien hasta obtener una mezcla homogénea.",
                "Aplicar inmediatamente sobre la piel con el pincel.",
                "Dejar actuar de 5 a 15 minutos (retirando el inicio antes) con algodón y agua.",
              ],
            },
            {
              kind: "table",
              title: "Cómo mezclamos los tonos",
              headers: ["Mezcla", "Resultado"],
              rows: [
                ["Rubio y negro en partes iguales", "Castaño medio"],
                ["Más rubio y un poco de negro", "Castaño claro"],
                ["Más negro y un poco de rubio", "Castaño oscuro"],
              ],
            },
          ],
          resources: [],
        },
      ],
    },
    {
      id: "mod-lam-04",
      courseId: "course-laminado",
      order: 4,
      title: "Laminado (Full Brows)",
      summary: "Qué es el laminado y su paso a paso completo.",
      lessons: [
        {
          id: "les-lam-0401",
          slug: "laminado-que-es",
          moduleId: "mod-lam-04",
          order: 1,
          title: "Qué es el laminado de cejas",
          summary: "Tratamiento semipermanente para dar forma, grosor y realzar el color.",
          objectives: ["Explicar el laminado y sus beneficios", "Detectar cuándo indicarlo"],
          highlights: [
            "Da forma a vellos rebeldes que el perfilado no corrige",
            "Genera grosor en cejas finas",
            "Realza el color natural del vello",
          ],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "El laminado de cejas es un tratamiento semipermanente con el que podemos dar forma a los vellos curvos o rebeldes que con un perfilado clásico no podríamos corregir. También se utiliza en cejas finas para generar grosor y dar una forma adecuada. Cabe destacar que realza el color natural del vello, haciéndolo ver más poblado y llamativo.",
            },
          ],
          resources: [],
        },
        {
          id: "les-lam-0402",
          slug: "laminado-paso-a-paso",
          moduleId: "mod-lam-04",
          order: 2,
          title: "Paso a paso del laminado",
          summary: "Permanente, neutralizante y botox: tiempos y técnica.",
          objectives: ["Aplicar los pasos 1 y 2 con los tiempos correctos", "Finalizar con botox"],
          highlights: ["Paso 1 permanente", "Paso 2 neutralizante", "Botox indispensable"],
          source: "both",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "steps",
              title: "Procedimiento",
              items: [
                "Limpiar muy bien la zona de las cejas con lash shampoo y retirar con algodón humedecido.",
                "Aplicar el paso N°1 (permanente) en toda la ceja, tratando de no tocar la piel, y dejar actuar de 10 a 15 minutos según el tipo de vello.",
                "Retirar el paso N°1 con algodón seco y colocar el paso N°2 (neutralizante); dejar actuar el mismo tiempo que el anterior.",
                "Retirar el paso N°2 con algodón humedecido, aplicar botox (indispensable), dejar actuar 10 minutos y retirar.",
              ],
            },
            {
              kind: "callout",
              tone: "warning",
              title: "Tiempos según el vello",
              text: "Los tiempos de acción se ajustan al tipo de vello. El botox final es indispensable para nutrir y sellar el resultado.",
            },
          ],
          resources: [],
        },
      ],
    },
    {
      id: "mod-lam-05",
      courseId: "course-laminado",
      order: 5,
      title: "Cuidados, higiene y seguridad",
      summary: "Cuidados post servicio, bioseguridad y normativa ANMAT.",
      lessons: [
        {
          id: "les-lam-0501",
          slug: "cuidados-post-servicio",
          moduleId: "mod-lam-05",
          order: 1,
          title: "Cuidados post servicio",
          summary: "Qué indicar a la clienta en las primeras 24 horas y después.",
          objectives: ["Entregar indicaciones claras de cuidado", "Proteger el resultado"],
          highlights: ["Primeras 24 h", "Luego de 24 h"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Primeras 24 hs",
              items: [
                "No lavar ni refregar la zona para evitar remover el producto de la piel o el vello.",
                "No aplicar maquillaje ni ningún producto cosmético.",
              ],
            },
            {
              kind: "list",
              title: "Luego de las 24 hs",
              items: [
                "Evitar refregar la zona y evitar el agua caliente.",
                "No utilizar productos cosméticos ni desmaquillantes en la zona.",
              ],
            },
          ],
          resources: [
            {
              id: "res-lam-0501-ficha",
              title: "Ficha de cuidados para la clienta",
              type: "guide",
              url: null,
              body: [
                {
                  kind: "list",
                  title: "Primeras 24 hs",
                  items: ["No lavar ni refregar", "Sin maquillaje ni cosméticos"],
                },
                {
                  kind: "list",
                  title: "Luego de 24 hs",
                  items: ["Sin agua caliente ni refregar", "Sin cosméticos ni desmaquillantes"],
                },
              ],
            },
          ],
        },
        {
          id: "les-lam-0502",
          slug: "higiene-anmat",
          moduleId: "mod-lam-05",
          order: 2,
          title: "Higiene, espacio de trabajo y ANMAT",
          summary: "Bioseguridad del espacio y verificación de productos aprobados.",
          objectives: ["Mantener un espacio seguro y desinfectado", "Verificar aprobación ANMAT"],
          highlights: ["Desinfección", "Descartables", "ANMAT"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Higiene y espacio de trabajo",
              items: [
                "Desinfectar siempre manos y materiales.",
                "Los materiales descartables no se pueden volver a usar.",
                "Zona de trabajo limpia y desinfectada.",
                "Procurar el uso de barbijo.",
                "Camilla con colchoneta o silla cómoda.",
                "Ambiente con buen aroma.",
              ],
            },
            {
              kind: "callout",
              tone: "warning",
              title: "Importante — ANMAT",
              text: "Al comprar cualquier producto debemos verificar que esté aprobado por la ANMAT (Administración Nacional de Medicamentos, Alimentos y Tecnología Médica) para garantizar productos eficaces, seguros y de calidad.",
            },
          ],
          resources: [],
        },
      ],
    },
  ],
};

const lifting: Course = {
  id: "course-lifting",
  slug: "lifting-de-pestanas",
  title: "Lifting de Pestañas",
  subtitle: "Lash Lifting",
  description:
    "Formación profesional en lifting de pestañas: química, moldes, curvaturas y seguridad. Para profesionales y principiantes. Dictado por Geraldine Colman.",
  level: "Profesionales y principiantes",
  status: "published",
  videoDurationSeconds: 857.31,
  videoAssetId: null,
  coverImage: "/media/covers/lifting.jpg",
  heroImage: "/media/covers/lifting-hero.jpg",
  priceArs: siteConfig.pricing.liftingArs,
  outcomes: [
    "Explicar qué es el lifting y su diferencia con la permanente",
    "Comprender la estructura del pelo y la acción química (paso 1 y 2)",
    "Identificar tiempos de acción de los químicos según su Ph",
    "Elegir molde y curvatura (C·U·D·LD) según el ojo y la clienta",
    "Prevenir la mala praxis y aplicar bioseguridad y ANMAT",
  ],
  audience: [
    "Esteticistas que quieren dominar el lash lifting",
    "Principiantes que buscan una base técnica sólida",
    "Profesionales que quieren entender la química para evitar errores",
  ],
  modules: [
    {
      id: "mod-lif-01",
      courseId: "course-lifting",
      order: 1,
      title: "Fundamentos del lifting",
      summary: "Qué es el lifting, materiales y estructura del pelo.",
      lessons: [
        {
          id: "les-lif-0101",
          slug: "que-es-el-lifting",
          moduleId: "mod-lif-01",
          order: 1,
          title: "Qué es el lifting y su diferencia con la permanente",
          summary: "Levantar la pestaña desde la raíz y en qué se diferencia de la permanente.",
          objectives: ["Definir el lifting", "Diferenciarlo de la permanente"],
          highlights: [
            "Levanta la pestaña desde la raíz",
            "Modifica la estructura con químicos y herramientas",
            "La diferencia con la permanente es el molde",
          ],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "El lifting de pestañas es un procedimiento estético que implica levantar las pestañas desde la raíz para dar un aspecto de proyección y curvatura. Al realizarlo modificamos la estructura del pelo con químicos y herramientas.",
            },
            {
              kind: "callout",
              tone: "gold",
              title: "Diferencia con la permanente",
              text: "La diferencia en el procedimiento radica únicamente en el molde, ya que ambas técnicas pueden realizarse con el mismo químico.",
            },
          ],
          resources: [
            {
              id: "res-lif-0101-pdf",
              title: "PDF del curso — Lifting de Pestañas",
              type: "pdf",
              url: "/media/resources/lifting.pdf",
            },
          ],
        },
        {
          id: "les-lif-0102",
          slug: "materiales-lifting",
          moduleId: "mod-lif-01",
          order: 2,
          title: "Materiales",
          summary: "El kit completo para realizar lifting de pestañas.",
          objectives: ["Conocer cada material", "Armar tu kit de lifting"],
          highlights: ["Moldes y herramientas", "Químicos", "Consumibles"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Materiales necesarios",
              items: [
                "Lash shampoo",
                "Algodón",
                "Moldes",
                "Pinza o herramienta para lifting y peines para lifting",
                "Pincel o aplicadores",
                "Químicos",
              ],
            },
          ],
          resources: [],
        },
        {
          id: "les-lif-0103",
          slug: "el-pelo-componentes",
          moduleId: "mod-lif-01",
          order: 3,
          title: "El pelo y sus componentes",
          summary: "Queratina, melanina, agua y lípidos: qué aporta cada uno.",
          objectives: ["Comprender la composición del pelo", "Relacionar componentes con el resultado"],
          highlights: ["Queratina", "Melanina", "Agua y lípidos"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "El pelo es un filamento formado por una fibra de queratina, constituido por raíz y tallo. Se forma en un folículo piloso de la dermis y contiene agua, melanina, queratina y lípidos.",
            },
            {
              kind: "table",
              title: "Componentes",
              headers: ["Componente", "Función"],
              rows: [
                ["Queratina", "Proteína fibrosa responsable de la estructura y resistencia del pelo. Aporta fuerza y rigidez."],
                ["Melanina", "Pigmento que da color al pelo y la piel. Su cantidad determina el color y aporta flexibilidad."],
                ["Agua y lípidos", "El agua da elasticidad; los lípidos mantienen el pelo suave y flexible. Fundamentales para su salud."],
              ],
            },
          ],
          resources: [],
        },
      ],
    },
    {
      id: "mod-lif-02",
      courseId: "course-lifting",
      order: 2,
      title: "Química del lifting",
      summary: "Acción de los químicos, la corteza y los tiempos de acción.",
      lessons: [
        {
          id: "les-lif-0201",
          slug: "correcta-accion-quimicos",
          moduleId: "mod-lif-02",
          order: 1,
          title: "Correcta acción de los químicos (Paso 1 y 2)",
          summary: "Qué hace cada paso sobre la cutícula, la queratina y la melanina.",
          objectives: ["Entender la acción del paso 1", "Entender el sellado del paso 2"],
          highlights: ["Paso 1: fragmenta la cutícula", "Paso 2: detiene y sella"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "steps",
              title: "Acción química",
              items: [
                "Paso 1: fragmenta la cutícula y comienza a romper moléculas de queratina (perdemos fuerza en el pelo); luego sigue por la melanina, donde perdemos un poco de color.",
                "Paso 2: se encarga de que el agente del paso 1 se detenga y, con ayuda del oxidante y del Ph, esas cutículas se vuelven a sellar.",
              ],
            },
          ],
          resources: [],
        },
        {
          id: "les-lif-0202",
          slug: "corteza-cortex",
          moduleId: "mod-lif-02",
          order: 2,
          title: "La corteza (cortex) y el cambio de estructura",
          summary: "Por qué abrimos la cutícula para llegar al cortex.",
          objectives: ["Ubicar dónde se produce el cambio", "Dimensionar la pérdida de componentes"],
          highlights: ["Abrir cutículas", "Llegar al cortex", "Pérdida de lípidos, queratina y melanina"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "En un lifting/laminado, el objetivo del paso 1 y 2 es abrir las cutículas para llegar a la corteza (cortex), porque ahí es donde logramos los cambios de estructura. En el proceso perdemos una cantidad muy importante de lípidos, queratina y melanina.",
            },
          ],
          resources: [],
        },
        {
          id: "les-lif-0203",
          slug: "tiempos-de-accion",
          moduleId: "mod-lif-02",
          order: 3,
          title: "Tiempos de acción: rápida, lenta y moderada",
          summary: "Cómo identificar los químicos por su tiempo de acción y su Ph.",
          objectives: ["Clasificar químicos por tiempo de acción", "Relacionar el Ph con la velocidad"],
          highlights: ["Rápida", "Lenta", "Moderada"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "Los químicos se identifican por sus tiempos de acción, que varían según su Ph.",
            },
            {
              kind: "table",
              title: "Tipos de acción",
              headers: ["Acción", "Tiempos"],
              rows: [
                ["Rápida", "Cortos tiempos de acción (7-8-9-10-11-12-13)"],
                ["Lenta", "Tiempos largos (14-16-18-20-22)"],
                ["Moderada", "Intermedia, ni muy larga ni muy corta (entre 12 y 18)"],
              ],
            },
          ],
          resources: [],
        },
        {
          id: "les-lif-0204",
          slug: "quimicos-por-marca",
          moduleId: "mod-lif-02",
          order: 4,
          title: "Químicos por marca, botox, keratinas y pegamentos",
          summary: "Catálogo de referencia según la acción y el uso.",
          objectives: ["Reconocer marcas por tipo de acción", "Identificar botox, keratinas y pegamentos"],
          highlights: ["Acción lenta", "Rápida/moderada", "No recomendados", "Botox y keratinas"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "table",
              title: "Catálogo de químicos (según el material)",
              headers: ["Categoría", "Marcas citadas"],
              rows: [
                ["Acción lenta", "DLUX (paso 1 y 2), Dolly Lash (paso 1 y 2)"],
                ["Acción rápida y moderada", "Dermolash, Easy Kit Neicha, Lion Beauty"],
                ["Acción rápida (no recomendados)", "Lash Lifting, Iconsign, Meisheng"],
                ["Botox y keratinas", "Melania, Puluk Neicha, Lion Beauty"],
                ["Pegamentos y bálsamos", "Neicha, Iconsign, Cherimoya"],
              ],
            },
          ],
          resources: [],
        },
      ],
    },
    {
      id: "mod-lif-03",
      courseId: "course-lifting",
      order: 3,
      title: "Moldes y curvaturas",
      summary: "Herramientas, moldes y las curvas C·U·D·LD.",
      lessons: [
        {
          id: "les-lif-0301",
          slug: "herramientas-moldes",
          moduleId: "mod-lif-03",
          order: 1,
          title: "Herramientas y moldes",
          summary: "El molde como instrumento principal para modificar el pelo.",
          objectives: ["Conocer las herramientas", "Entender el rol del molde"],
          highlights: ["Moldes", "Cepillos", "Herramienta"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "Los moldes son el instrumento principal para la modificación del pelo. Lo importante es entenderlos para lograr cambios sin dificultades. Las herramientas base son: moldes, cepillos y herramienta.",
            },
          ],
          resources: [],
        },
        {
          id: "les-lif-0302",
          slug: "curvas-formatos-moldes",
          moduleId: "mod-lif-03",
          order: 2,
          title: "Curvas (C·U·D·LD) y formatos de moldes",
          summary: "Qué curva lograr según el molde, el ojo y la clienta.",
          objectives: ["Elegir la curva adecuada", "Relacionar formato de molde con el efecto"],
          highlights: ["Curvas C·U·D·LD", "Plano / semiplano", "Semirredondo / redondo"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "paragraph",
              text: "Las diferentes curvas se logran según el molde que utilicemos y la aplicación del químico. Las más utilizadas son C, U, D y LD. La elección depende del ojo, el gusto de la clienta y el consejo profesional.",
            },
            {
              kind: "table",
              title: "Formatos de moldes",
              headers: ["Formato", "Efecto", "Punto más alto"],
              rows: [
                ["Plano / semiplano", "Full up", "Abajo (S-M molde nube)"],
                ["Semirredondo / curva U", "Efecto muñeca", "Por el medio (M1-M2 molde nube)"],
                ["Redondo / curva C", "Full curvatura", "Arriba (L molde nube)"],
              ],
            },
          ],
          resources: [],
        },
      ],
    },
    {
      id: "mod-lif-04",
      courseId: "course-lifting",
      order: 4,
      title: "Cuidados, seguridad y mala praxis",
      summary: "Cuidados post servicio, errores frecuentes y bioseguridad.",
      lessons: [
        {
          id: "les-lif-0401",
          slug: "cuidados-post-servicio-lifting",
          moduleId: "mod-lif-04",
          order: 1,
          title: "Cuidados post servicio",
          summary: "Indicaciones para las primeras 12 y 24 horas.",
          objectives: ["Entregar indicaciones claras", "Cuidar la durabilidad del lifting"],
          highlights: ["Primeras 12 h", "Luego de 24 h", "Hidratación"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Primeras 12 hs",
              items: [
                "No lavar ni refregar la zona para evitar remover el producto del pelo.",
                "No aplicar maquillaje ni mojarlas.",
              ],
            },
            {
              kind: "list",
              title: "Luego de las 24 hs",
              items: [
                "Hidratarlas con keratina o serum.",
                "Evitar máscaras a prueba de agua y usar desmaquillantes bifásicos que faciliten la remoción del maquillaje.",
              ],
            },
          ],
          resources: [
            {
              id: "res-lif-0401-ficha",
              title: "Ficha de cuidados para la clienta",
              type: "guide",
              url: null,
              body: [
                { kind: "list", title: "Primeras 12 hs", items: ["No lavar ni refregar", "Sin maquillaje ni mojar"] },
                { kind: "list", title: "Luego de 24 hs", items: ["Hidratar con keratina/serum", "Desmaquillante bifásico"] },
              ],
            },
          ],
        },
        {
          id: "les-lif-0402",
          slug: "mala-praxis",
          moduleId: "mod-lif-04",
          order: 2,
          title: "Mala praxis y cómo evitarla",
          summary: "Las causas más frecuentes de un mal resultado.",
          objectives: ["Reconocer errores frecuentes", "Prevenir la mala praxis"],
          highlights: ["Químicos en las puntas", "Mala elección del molde", "Tiempos incorrectos", "Productos alcalinos"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Causas principales de mala praxis",
              items: [
                "Colocar químicos en las puntas cuando no es necesario.",
                "Mala elección del molde.",
                "Tiempos de acción incorrectos para el tipo de pelo.",
                "Productos muy alcalinos.",
              ],
            },
          ],
          resources: [
            {
              id: "res-lif-0402-check",
              title: "Checklist de control de calidad",
              type: "checklist",
              url: null,
              body: [
                {
                  kind: "list",
                  title: "Antes de cerrar el servicio, verificá",
                  items: [
                    "No colocaste químico en las puntas sin necesidad",
                    "Elegiste el molde correcto para el ojo",
                    "Respetaste los tiempos según el tipo de pelo",
                    "Evitaste productos demasiado alcalinos",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "les-lif-0403",
          slug: "higiene-anmat-lifting",
          moduleId: "mod-lif-04",
          order: 3,
          title: "Higiene, espacio de trabajo y ANMAT",
          summary: "Bioseguridad del espacio y verificación de productos aprobados.",
          objectives: ["Mantener un espacio seguro", "Verificar aprobación ANMAT"],
          highlights: ["Desinfección", "Descartables", "ANMAT"],
          source: "pdf",
          videoStartSeconds: null,
          videoEndSeconds: null,
          content: [
            {
              kind: "list",
              title: "Higiene y espacio de trabajo",
              items: [
                "Desinfectar siempre manos y materiales.",
                "Los materiales descartables no se pueden volver a usar.",
                "Zona de trabajo limpia y desinfectada.",
                "Procurar el uso de barbijo.",
                "Camilla con colchoneta o silla cómoda.",
                "Ambiente con buen aroma.",
              ],
            },
            {
              kind: "callout",
              tone: "warning",
              title: "Importante — ANMAT",
              text: "Al comprar cualquier producto debemos verificar que esté aprobado por la ANMAT para garantizar productos eficaces, seguros y de calidad.",
            },
          ],
          resources: [],
        },
      ],
    },
  ],
};

export const COURSES: Course[] = [laminado, lifting];

/** Producto bundle: acceso a ambos cursos. */
export const BUNDLE = {
  id: "bundle-full",
  slug: "bundle-full",
  title: "Bundle Full — Laminado + Lifting",
  courseIds: ["course-laminado", "course-lifting"] as const,
  priceArs: siteConfig.pricing.bundleArs,
};

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function countLessons(course: Course): number {
  return course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
}

export function allLessons(course: Course) {
  return course.modules.flatMap((m) => m.lessons);
}

# COURSE_ARCHITECTURE.md

Arquitectura educativa de GCStudio. Estructura derivada **exclusivamente** del material real:
los dos PDFs (autoridad pedagógica) y los dos videos (demostración práctica).

## Método de derivación

- Los PDFs se leyeron completos con `pdftotext` (Laminado: 21 páginas / Lifting: 23 páginas).
- Los videos se sondearon con `ffprobe` (duración real) y muestreo de fotogramas con `ffmpeg`.
- Detección de cortes con `ffmpeg` (`select='gt(scene,0.3)')`: **0 cortes duros**. Ambos videos son
  grabaciones **continuas** de demostración práctica sobre clienta real. El de Lifting incluye
  subtítulos quemados en español.
- Conclusión: **no existen timestamps de capítulo reales**. No se inventan. Cada clase es una
  unidad pedagógica derivada del PDF; el video completo del curso se reproduce como demostración
  integral y los timestamps por clase quedan como campo editable en el Admin (`video_start_seconds`,
  `video_end_seconds`) para que Geraldine los cargue viendo el material. Marcado como `NO CONFIRMADO`.

## Fuentes de contacto reales detectadas (no inventadas)

- Marca: **GC Studio** (@gc.studioba) — Owner: Geraldine Colman.
- Ubicación: Recoleta, CABA — Arenales 1999.
- WhatsApp: wa.me/5491164857085.
- Emails detectados en los PDFs: `gcstudioba@gmail.com` y `geraldinecolman2@gmail.com`.
- Teléfono en PDF: 113345-5436.
- Productos citados (marcas reales del material): The Lion Beauty, Thuya, Dermolash, DLUX,
  Dolly Lash, Easy Kit Neicha, Iconsign, Meisheng, Melania, Puluk Neicha, Cherimoya.

---

# CURSO 1 · Laminado de Cejas — "Full Brows / Taller Cejas Perfectas"

- **Autoridad:** `Curso Laminado de Cejas.pdf` (21 pág.) + `Curso Laminado de cejas Video.mp4`.
- **Duración real del video:** 529.92 s ≈ **8 min 50 s** (1920×1080, h264, 24 fps).
- **Dictado por:** Geraldine Colman.
- **Nivel:** Para profesionales y principiantes.
- **Estructura:** 5 módulos · 12 clases.

## Módulo 01 · Fundamentos y diseño

### Clase 01 — ¿Qué son las cejas y por qué importan?
- Origen: PDF (Introducción).
- Contenido: la ceja como marco del rostro; un diseño correcto realza y armoniza; la moda cambia
  (grosor, longitud, color) pero el resultado siempre debe ser natural, apto y personalizado en base
  a medidas exactas.
- Recursos: PDF del curso; ficha "Conceptos clave".

### Clase 02 — Materiales de trabajo
- Origen: PDF (Materiales).
- Contenido: pinza (recta/diagonal/punta), calibre medidor, lápiz dermográfico y lapicera de gel
  blanca, tijera de punta fina, perfilador o navaja profesional, hilo de algodón, brow shampoo,
  algodón, cepillos.
- Recursos: checklist de materiales imprimible.

### Clase 03 — Visagismo: medición con hilo
- Origen: PDF (Visagismo).
- Contenido: técnica para determinar anchura, grosor, dimensión y curvatura según los rasgos del
  rostro; aporta equilibrio y simetría.
- Recursos: PDF; ficha de procedimiento de medición.

## Módulo 02 · Perfilado y depilación

### Clase 04 — Los 3 servicios a ofrecer
- Origen: PDF (3 Servicios a ofrecer).
- Contenido: (1) Perfilado clásico — visagismo, marcación y depilación con pinza y navaja.
  (2) Perfilado con henna — perfilado clásico + relleno del diseño con henna. (3) Full Brows
  (Laminado) — laminado, visagismo, depilación y henna opcional.
- Recursos: cuadro comparativo de servicios.

### Clase 05 — Método de depilación (pinza y navaja)
- Origen: PDF (Método de depilación).
- Contenido: tras marcar con lápiz blanco, retirar con pinza el exceso por fuera del diseño; con la
  navaja retirar solo pelusas al ras (no vello) para un trabajo más limpio.
- Recursos: video (demostración práctica).

### Clase 06 — Paso a paso del perfilado
- Origen: PDF (Paso a paso) + video.
- Contenido: limpiar con lash shampoo; marcar con hilo y dibujar con lapicera de gel blanca; mostrar
  el diseño a la clienta; retirar exceso; corregir; borrar la marcación con antibacterial o agua.
- Recursos: guía de procedimiento; video.

## Módulo 03 · Henna

### Clase 07 — Qué es la henna y cuánto dura
- Origen: PDF (Henna).
- Contenido: materiales (henna marrón y negra mezclables, activador, pincel biselado, hisopos);
  duración aprox. 10 días en el pelo y 5–10 días en la piel según lavado y skincare.
- Recursos: ficha de henna.

### Clase 08 — Aplicación y mezcla de tonos
- Origen: PDF (Cómo utilizar la henna / Mezclar tonos).
- Contenido: preparar henna + activador en partes iguales; mezcla homogénea; aplicar de inmediato;
  dejar 5–15 min. Mezcla de tonos: rubio+negro (castaño medio), más rubio (castaño claro), más negro
  (castaño oscuro).
- Recursos: tabla de mezcla de tonos.

## Módulo 04 · Laminado (Full Brows)

### Clase 09 — Qué es el laminado de cejas
- Origen: PDF (Laminado de cejas).
- Contenido: tratamiento semipermanente que da forma a vellos rebeldes que el perfilado no corrige;
  genera grosor en cejas finas; realza el color natural del vello.
- Recursos: PDF.

### Clase 10 — Paso a paso del laminado
- Origen: PDF (Paso a paso) + video.
- Contenido: limpiar con lash shampoo; Paso 1 (permanente) 10–15 min según el vello; Paso 2
  (neutralizante) mismo tiempo; retirar y aplicar Botox (indispensable) 10 min.
- Recursos: guía de procedimiento; video.

## Módulo 05 · Cuidados, higiene y seguridad

### Clase 11 — Cuidados post servicio
- Origen: PDF (Cuidados post servicio).
- Contenido: primeras 24 h — no lavar ni refregar, no maquillaje ni cosméticos. Luego de 24 h —
  evitar refregar y agua caliente, no cosméticos ni desmaquillantes en la zona.
- Recursos: ficha de cuidados para entregar a la clienta.

### Clase 12 — Higiene, espacio de trabajo y ANMAT
- Origen: PDF (Higiene y espacio de trabajo / Importante).
- Contenido: desinfectar manos y materiales; descartables no se reutilizan; zona limpia; barbijo;
  camilla cómoda; buen aroma. Verificar SIEMPRE que el producto esté aprobado por ANMAT.
- Recursos: checklist de bioseguridad.

---

# CURSO 2 · Lifting de Pestañas — "Lash Lifting"

- **Autoridad:** `Curso Lifting.pdf` (23 pág.) + `Curso Lifting Video.mp4`.
- **Duración real del video:** 857.31 s ≈ **14 min 17 s** (1920×1080, h264, 24 fps, con subtítulos).
- **Dictado por:** Geraldine Colman.
- **Nivel:** Para profesionales y principiantes.
- **Estructura:** 4 módulos · 12 clases.

## Módulo 01 · Fundamentos del lifting

### Clase 01 — Qué es el lifting y su diferencia con la permanente
- Origen: PDF (Introducción).
- Contenido: procedimiento estético que levanta la pestaña desde la raíz para dar proyección y
  curvatura; modifica la estructura del pelo con químicos y herramientas; la diferencia con la
  permanente radica únicamente en el molde (mismo químico).
- Recursos: PDF.

### Clase 02 — Materiales
- Origen: PDF (Materiales).
- Contenido: lash shampoo, algodón, moldes, pinza/herramienta y peines para lifting, pincel o
  aplicadores, químicos.
- Recursos: checklist de materiales.

### Clase 03 — El pelo y sus componentes
- Origen: PDF (El pelo / Componentes).
- Contenido: filamento de queratina con raíz y tallo formado en el folículo; contiene agua, melanina,
  queratina y lípidos. Queratina (estructura/resistencia), melanina (color/flexibilidad), agua y
  lípidos (elasticidad, suavidad, salud).
- Recursos: infografía de componentes.

## Módulo 02 · Química del lifting

### Clase 04 — Correcta acción de los químicos (Paso 1 y 2)
- Origen: PDF (Químicos · Correcta acción).
- Contenido: Paso 1 fragmenta la cutícula y rompe moléculas de queratina (se pierde fuerza) y luego
  melanina (se pierde color). Paso 2 detiene el agente del paso 1 y, con oxidante y Ph, vuelve a
  sellar las cutículas.
- Recursos: diagrama de la acción química.

### Clase 05 — La corteza (cortex) y el cambio de estructura
- Origen: PDF (Químicos II).
- Contenido: el objetivo del paso 1 y 2 es abrir cutículas para llegar al cortex, donde se logran los
  cambios de estructura; se pierde una cantidad importante de lípidos, queratina y melanina.
- Recursos: ficha conceptual.

### Clase 06 — Tiempos de acción: rápida, lenta y moderada
- Origen: PDF (Químicos III).
- Contenido: se identifican por sus tiempos de acción, que varían según el Ph. Rápida (7–13),
  lenta (14–22), moderada (12–18).
- Recursos: tabla de tiempos de acción.

### Clase 07 — Químicos por marca, botox, keratinas y pegamentos
- Origen: PDF (listados de químicos).
- Contenido: acción lenta (DLUX, Dolly Lash); rápida/moderada (Dermolash, Easy Kit Neicha, Lion
  Beauty); rápida no recomendados (Lash Lifting, Iconsign, Meisheng); botox y keratinas (Melania,
  Puluk Neicha, Lion Beauty); pegamentos y bálsamos (Neicha, Iconsign, Cherimoya).
- Recursos: catálogo de químicos.

## Módulo 03 · Moldes y curvaturas

### Clase 08 — Herramientas y moldes
- Origen: PDF (Herramientas / Moldes).
- Contenido: moldes, cepillos y herramienta; el molde es el instrumento principal para modificar el
  pelo; entenderlos permite lograr cambios sin dificultades.
- Recursos: PDF.

### Clase 09 — Curvas (C·U·D·LD) y formatos de moldes
- Origen: PDF (Curvas / Formatos de moldes).
- Contenido: las curvas dependen del molde y la aplicación del químico; las más usadas: C, U, D, LD;
  la elección depende del ojo, el gusto de la clienta y el consejo profesional. Formatos:
  plano/semiplano (full up), semirredondo/curva U (efecto muñeca), redondo/curva C (full curvatura).
- Recursos: guía de curvas y moldes.

## Módulo 04 · Cuidados, seguridad y mala praxis

### Clase 10 — Cuidados post servicio
- Origen: PDF (Cuidados post servicio).
- Contenido: primeras 12 h — no lavar ni refregar, no maquillaje ni mojar. Luego de 24 h — hidratar
  con keratina o serum; evitar máscaras a prueba de agua; usar desmaquillantes bifásicos.
- Recursos: ficha de cuidados para la clienta.

### Clase 11 — Mala praxis y cómo evitarla
- Origen: PDF (Mala Praxis).
- Contenido: causas principales — colocar químicos en las puntas sin necesidad, mala elección del
  molde, tiempos de acción incorrectos para el tipo de pelo, productos muy alcalinos.
- Recursos: checklist de control de calidad.

### Clase 12 — Higiene, espacio de trabajo y ANMAT
- Origen: PDF (Higiene y espacio de trabajo / Importante).
- Contenido: desinfectar manos y materiales; descartables no se reutilizan; zona limpia; barbijo;
  camilla cómoda; buen aroma. Verificar SIEMPRE aprobación ANMAT.
- Recursos: checklist de bioseguridad.

---

# Producto comercial

| Producto | Slug | Contenido | Precio |
|---|---|---|---|
| Laminado de Cejas | `laminado-de-cejas` | 5 módulos · 12 clases | `FALTANTE` (definir en `site.config.ts`) |
| Lifting de Pestañas | `lifting-de-pestanas` | 4 módulos · 12 clases | `FALTANTE` |
| Bundle Full (ambos) | `bundle-full` | 9 módulos · 24 clases | `FALTANTE` |

Los precios NO se inventan. Se definen en `src/config/site.config.ts` (`courses[].price` y `bundle.price`)
y se documentan en `SETUP.md`. En modo desarrollo se muestran como "Precio a confirmar" hasta cargarlos.

---

# Evaluaciones por módulo (gate de avance)

Cada módulo tiene una evaluación (multiple choice, opción única) que funciona como
**gate**: para desbloquear el módulo siguiente hay que aprobarla (todas las respuestas
correctas). El primer módulo siempre está desbloqueado.

- Banco de preguntas: `src/content/quizzes.ts` (derivado del contenido real de cada módulo).
- Corrección: `src/lib/domain/quiz.ts` — **server-side**; las respuestas correctas y las
  explicaciones nunca se envían al cliente.
- Al fallar una pregunta se muestra la explicación y un enlace para repasar la clase exacta
  (`revisitLessonSlug`). Se puede reintentar.
- Estado de aprobación por alumno/módulo: tabla `module_quiz_progress`
  (migración `supabase/migrations/0004_module_quiz.sql`), o el store mock en desarrollo.
- Flujo en el player: la última clase de cada módulo lleva a "Rendir evaluación del módulo";
  al aprobar, se pasa a la primera clase del módulo siguiente.

Preguntas por módulo: 3 en cada uno de los 9 módulos (Laminado 5 · Lifting 4).

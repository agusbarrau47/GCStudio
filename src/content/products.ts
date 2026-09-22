import type { Product } from "@/lib/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-kit-lifting-pro",
    slug: "kit-lash-lifting-pro",
    name: "Kit Lash Lifting Profesional Completo",
    category: "Kits Profesionales",
    priceArs: 48500,
    image: "/products/kit-lifting.jpg",
    badge: "Kit Oficial Alumnas",
    shortDesc: "Set completo de lifting utilizado en el curso online. Rinde de 25 a 30 servicios.",
    description:
      "El kit oficial recomendado por Geraldine Colman para iniciar tu negocio. Contiene loción permanente, neutralizante, botox de keratina, tinte negro intenso, oxidante suave y accesorios indispensables.",
    benefits: [
      "Rinde más de 25 aplicaciones completas",
      "Productos hipoalergénicos testeados por ANMAT",
      "Fórmulas con acción en 8-12 minutos",
      "Incluye estuche organizador térmico",
    ],
    howToUse:
      "Aplicar paso 1 sobre tercio medio de pestañas. Retirar en seco. Aplicar paso 2 mismo tiempo. Finalizar con nutrición.",
    anmatApproved: true,
    stock: true,
    crossSell: {
      type: "course",
      title: "Curso Lash Lifting",
      url: "/cursos/lash-lifting",
      badge: "Herramienta oficial del curso",
    },
  },
  {
    id: "prod-kit-brow-pro",
    slug: "kit-brow-lamination-pro",
    name: "Kit Brow Lamination & Visagismo Pro",
    category: "Kits Profesionales",
    priceArs: 45900,
    image: "/products/kit-brow.jpg",
    badge: "Kit Oficial Alumnas",
    shortDesc: "Insumos necesarios para dominar el laminado y diseño con hilo en cabina.",
    description:
      "Diseñado para técnicas que buscan definición y disciplina en el pelo de la ceja. Incluye soluciones de alisado, neutralizado, film osmótico profesional, cepillos de visagismo y tinte castaño.",
    benefits: [
      "Efecto de ceja ordenada y peinada hasta 6 semanas",
      "Film osmótico de corte fácil sin arrugas",
      "Tinte formulado para tono natural sin virajes",
      "Apto para vellos rebeldes y con remolinos",
    ],
    howToUse:
      "Peinar vellos hacia arriba, aplicar gel laminador con film 6-10 min. Neutralizar y sellar con bálsamo regenerador.",
    anmatApproved: true,
    stock: true,
    crossSell: {
      type: "course",
      title: "Curso Laminado de Cejas",
      url: "/cursos/laminado-de-cejas",
      badge: "Recomendado para alumnas",
    },
  },
  {
    id: "prod-serum-lash-botox",
    slug: "serum-lash-botox-keratin",
    name: "Sérum Fortalecedor Lash & Brow Botox",
    category: "Aftercare & Hogar",
    priceArs: 18200,
    image: "/products/serum-botox.jpg",
    badge: "Best Seller Aftercare",
    shortDesc: "Nutrición diaria con biotina, péptidos y keratina pura para alargar y densificar.",
    description:
      "El producto indispensable para el hogar. Ayuda a prolongar el arqueado del lifting y el orden del laminado mientras estimula el crecimiento natural de pestañas y cejas débiles.",
    benefits: [
      "Fortalece la raíz y engrosa la fibra natural",
      "Alarga la duración del lifting hasta 2 semanas extra",
      "Textura ligera transparente de rápida absorción",
      "Cepillo aplicador de microfibra de alta precisión",
    ],
    howToUse:
      "Aplicar todas las noches sobre pestañas y cejas limpias, desde la raíz hasta las puntas.",
    anmatApproved: true,
    stock: true,
    crossSell: {
      type: "service",
      title: "Servicio de Lash Lifting",
      url: "/servicios#lash-lifting-completo",
      badge: "Mantené tu servicio del salón",
    },
  },
  {
    id: "prod-lash-shampoo",
    slug: "espuma-limpiadora-lash-shampoo",
    name: "Espuma Limpiadora Lash Shampoo Oil-Free",
    category: "Aftercare & Hogar",
    priceArs: 14500,
    image: "/products/lash-shampoo.jpg",
    badge: "Cuidado Diario",
    shortDesc: "Higiene ocular suave sin aceites que protege el lifting y el laminado.",
    description:
      "Fórmula micelar con pH balanceado y extracto de manzanilla. Remueve impurezas, polución y maquillaje sin alterar la curvatura ni la estructura del pelo.",
    benefits: [
      "Fórmula 100% libre de aceites (oil-free)",
      "No arde en los ojos y es hipoalergénica",
      "Previene acumulación bacteriana y blefaritis",
      "Incluye brocha suave de cerdas sintéticas",
    ],
    howToUse:
      "Colocar un pump de espuma en la brocha, frotar delicadamente en párpados y enjuagar con agua tibia.",
    anmatApproved: true,
    stock: true,
    crossSell: {
      type: "service",
      title: "Limpiezas Faciales en Salón",
      url: "/servicios#limpieza-profunda",
      badge: "Rutina diaria recomendada",
    },
  },
  {
    id: "prod-glue-balm",
    slug: "glue-balm-lifting-vitamins",
    name: "Glue Balm Nutritivo para Lifting (Sin pegamento duro)",
    category: "Insumos & Descartables",
    priceArs: 16900,
    image: "/products/glue-balm.jpg",
    badge: "Innovación Técnica",
    shortDesc: "Bálsamo adhesivo enriquecido con vitaminas. No se seca en segundos y permite acomodar.",
    description:
      "Reemplaza los pegamentos tradicionales duros. Permite adherir las pestañas al molde de silicona sin tirones, sin dejar grumos y facilitando la penetración de los activos onduladores.",
    benefits: [
      "Permite corregir la alineación sin dañar el vello",
      "Se retira fácilmente con agua sin tirones",
      "Enriquecido con aceite de argán y vitamina E",
      "No genera película opaca que frene los químicos",
    ],
    howToUse:
      "Pintar una fina capa sobre el molde y acomodar las pestañas con cepillo en Y o aplicador.",
    anmatApproved: true,
    stock: true,
    crossSell: {
      type: "course",
      title: "Curso Lash Lifting",
      url: "/cursos/lash-lifting",
      badge: "Técnica explicada en campus",
    },
  },
  {
    id: "prod-moldes-silicona",
    slug: "pack-moldes-silicona-soft",
    name: "Pack 5 Pares Moldes Anatómicos Soft Silicone",
    category: "Insumos & Descartables",
    priceArs: 12800,
    image: "/products/moldes-silicona.jpg",
    badge: "Accesorios Pro",
    shortDesc: "Curvaturas S, M, M1, M2 y L de silicona médica flexible que no tira del párpado.",
    description:
      "Curvaturas diseñadas para todo tipo de ojos (pequeños, encapotados, almendrados). Su textura aterciopelada se adhiere naturalmente al párpado sin necesidad de adhesivo en la base.",
    benefits: [
      "5 medidas para elegir el efecto deseado (L-Curl o C-Curl)",
      "Silicona médica reutilizable y esterilizable",
      "Forma ergonómica que no se despega en los extremos",
    ],
    howToUse:
      "Desinfectar antes y después de cada servicio. Seleccionar el tamaño según el largo de pestaña.",
    anmatApproved: true,
    stock: true,
  },
  {
    id: "prod-hilo-visagismo",
    slug: "hilo-mapeo-visagismo-antibacterial",
    name: "Bobina de Hilo Negro Antibacterial para Mapeo",
    category: "Skincare & Mirada",
    priceArs: 8900,
    image: "/products/hilo-visagismo.jpg",
    badge: "Esencial Visagismo",
    shortDesc: "Hilo ultrafino pretintado con pigmento mineral para diseño simétrico de cejas.",
    description:
      "El secreto de los diseños perfectos de GC Studio. Traza líneas precisas y milimétricas sobre la piel sin manchar ni desparramar pigmento, ideal para clientas y alumnas.",
    benefits: [
      "10 metros de hilo pretintado hipoalergénico",
      "Corte limpio con cuchilla incorporada en el frasco",
      "Fácil de retirar con agua micelar",
    ],
    howToUse:
      "Cortar 30 cm de hilo, tensar entre índices y apoyar sobre los puntos clave del visagismo.",
    anmatApproved: true,
    stock: true,
    crossSell: {
      type: "service",
      title: "Diseño & Perfilado en Salón",
      url: "/servicios#perfilado-visagismo",
      badge: "Mismo método usado en salón",
    },
  },
  {
    id: "prod-aceite-cuticulas",
    slug: "elixir-botanico-cuticulas-unas",
    name: "Elixir Botánico Nutritivo para Cutículas & Uñas",
    category: "Skincare & Mirada",
    priceArs: 11400,
    image: "/products/aceite-cuticulas.jpg",
    badge: "Aftercare Salón",
    shortDesc: "Gotero nutritivo con jojoba, almendras dulces y vitamina E para alargar el esmaltado.",
    description:
      "Mantiene la piel del contorno de la uña suave, hidratada y sin padrastros. Es el compañero perfecto para quienes se realizan kapping gel o esmaltado semipermanente.",
    benefits: [
      "Absorción rápida con acabado satinado no pegajoso",
      "Previene desprendimientos prematuros del kapping",
      "Aroma suave a vainilla y almendras",
    ],
    howToUse:
      "Aplicar una gota por mano cada noche masajeando suavemente la cutícula y la uña.",
    anmatApproved: true,
    stock: true,
    crossSell: {
      type: "service",
      title: "Kapping & Semipermanente",
      url: "/servicios#kapping-semi",
      badge: "Cuidado post manicuría",
    },
  },
];

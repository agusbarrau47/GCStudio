export interface GoogleReview {
  id: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  service?: string;
  highlight?: string;
}

export const GOOGLE_REVIEWS_META = {
  rating: 4.7,
  totalReviews: 18,
  placeName: "GC Studio",
  address: "Arenales 1999, Recoleta, CABA",
  shareUrl: "https://share.google/KuI3n21SoMYJpit4o",
  writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJaz1vCPRLwpIRNwrWEKzcbzM",
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Lara R Figueroa",
    rating: 5,
    date: "Hace 2 semanas",
    verified: true,
    service: "Lifting de Pestañas + Laminado y Perfilado",
    highlight: "Servicio impecable y masajeador en camilla",
    text: "Fui hoy para lifting de pestañas + laminado y perfilado de cejas, fue la mejor experiencia. El servicio impecable, súper amable y encima con masajeador en la camilla.",
  },
  {
    id: "rev-2",
    author: "Aymê Brogian",
    rating: 5,
    date: "Hace 3 semanas",
    verified: true,
    service: "Pestañas & Belleza de Pies y Manos",
    highlight: "Salí renovada, Geraldine es la más",
    text: "El lugar es hermoso. Geraldine es la más! Me dejó las uñas de los pies y de las manos perfectas. Ni hablar de las pestañas, que mientras me las hacía me puso un masajeador en la camilla. Salí renovada.",
  },
  {
    id: "rev-3",
    author: "Edith _",
    role: "Local Guide",
    rating: 5,
    date: "Hace 1 mes",
    verified: true,
    service: "Atención personalizada en cabina",
    highlight: "Volvería mil veces",
    text: "Me encantó el servicio y la atención, el lugar es hermoso y la ambientación muy relajante. Volvería mil veces.",
  },
  {
    id: "rev-4",
    author: "Valery Alejandra Chachalo Cifuentes",
    rating: 5,
    date: "Hace 1 mes",
    verified: true,
    service: "Kapping Gel & Fortalecimiento",
    highlight: "Muy top en su manera de trabajar",
    text: "Es muy toooooop en su manera de trabajar, yo me hago las uñas y la verdad que encontrarla fué genial, hizo que mis uñas vuelvan a fortalecerse y crecer, estoy muy contenta con su trabajo.",
  },
  {
    id: "rev-5",
    author: "Carlu Pedicone",
    role: "Local Guide",
    rating: 5,
    date: "Hace 2 meses",
    verified: true,
    service: "Lifting de Pestañas VIP",
    highlight: "Camilla de masajes y dedicación única",
    text: "Me encanta hacerme las pestañas con la camilla de masajes 🫶🏼 Excelente atención, calidez humana y una dedicación súper profesional en cada detalle.",
  },
];

export interface QuestionOption {
  id: string;
  label: string;
  score: number;
}

export interface Question {
  id: string;
  category: string;
  question: string;
  options: QuestionOption[];
}

export interface ForumComment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  date: string;
  comments: ForumComment[];
}

export const FORUM_CATEGORIES = ["Dudas sobre el test", "Consejos", "General"];

export const initialQuestions: Question[] = [
  {
    id: "q1",
    category: "Estilo de Vida",
    question: "¿Cuál es tu nivel de actividad física diaria?",
    options: [
      { id: "q1o1", label: "Sedentario — paso la mayor parte del día sentado/a", score: 1 },
      { id: "q1o2", label: "Moderado — camino o hago ejercicio ligero", score: 2 },
      { id: "q1o3", label: "Activo — hago ejercicio regularmente", score: 3 },
      { id: "q1o4", label: "Muy activo — entreno o salgo a correr a diario", score: 4 },
    ],
  },
  {
    id: "q2",
    category: "Estilo de Vida",
    question: "¿Cuántas horas al día estás fuera de casa?",
    options: [
      { id: "q2o1", label: "Trabajo desde casa — casi todo el día", score: 4 },
      { id: "q2o2", label: "4 a 6 horas fuera", score: 3 },
      { id: "q2o3", label: "8 a 10 horas fuera", score: 2 },
      { id: "q2o4", label: "Más de 10 horas fuera", score: 1 },
    ],
  },
  {
    id: "q3",
    category: "Vivienda",
    question: "¿En qué tipo de vivienda vives?",
    options: [
      { id: "q3o1", label: "Departamento pequeño", score: 1 },
      { id: "q3o2", label: "Departamento grande", score: 2 },
      { id: "q3o3", label: "Casa sin jardín", score: 3 },
      { id: "q3o4", label: "Casa con jardín", score: 4 },
    ],
  },
  {
    id: "q4",
    category: "Vivienda",
    question: "¿Tienes otras mascotas actualmente?",
    options: [
      { id: "q4o1", label: "No tengo mascotas", score: 3 },
      { id: "q4o2", label: "Sí, una mascota", score: 2 },
      { id: "q4o3", label: "Sí, varias mascotas", score: 1 },
    ],
  },
  {
    id: "q5",
    category: "Tiempo Disponible",
    question: "¿Cuánto tiempo puedes dedicar diariamente al cuidado de tu mascota?",
    options: [
      { id: "q5o1", label: "Menos de 1 hora", score: 1 },
      { id: "q5o2", label: "1 a 2 horas", score: 2 },
      { id: "q5o3", label: "2 a 4 horas", score: 3 },
      { id: "q5o4", label: "Más de 4 horas", score: 4 },
    ],
  },
  {
    id: "q6",
    category: "Experiencia",
    question: "¿Cuál es tu experiencia previa con mascotas?",
    options: [
      { id: "q6o1", label: "Nunca he tenido mascotas", score: 1 },
      { id: "q6o2", label: "Tuve mascotas de niño/a", score: 2 },
      { id: "q6o3", label: "He tenido mascotas como adulto", score: 3 },
      { id: "q6o4", label: "Tengo amplia experiencia con mascotas", score: 4 },
    ],
  },
  {
    id: "q7",
    category: "Capacidad Financiera",
    question: "¿Estás preparado/a para los gastos de una mascota?",
    options: [
      { id: "q7o1", label: "Presupuesto ajustado", score: 1 },
      { id: "q7o2", label: "Puedo cubrir gastos básicos", score: 2 },
      { id: "q7o3", label: "Tengo presupuesto cómodo para su cuidado", score: 3 },
      { id: "q7o4", label: "Sin limitaciones, incluiré extras y seguros", score: 4 },
    ],
  },
];

export const initialForumPosts: ForumPost[] = [
  {
    id: "p1",
    title: "¿Cómo funciona el test de compatibilidad?",
    author: "María García",
    category: "Dudas sobre el test",
    content: "Hola a todos, acabo de descubrir PetMatch y me gustaría entender mejor cómo el cuestionario determina qué mascota es ideal para mí. ¿Alguien puede explicarme?",
    date: "2026-02-10",
    comments: [
      { id: "c1", author: "Carlos López", content: "¡Hola María! El test evalúa tu estilo de vida, espacio y tiempo disponible para encontrar la mejor mascota para ti.", date: "2026-02-11" },
    ],
  },
  {
    id: "p2",
    title: "Consejos para adoptar un perro grande en departamento",
    author: "Juan Pérez",
    category: "Consejos",
    content: "Vivo en un departamento de 60m² y me gustaría adoptar un labrador. ¿Es viable? ¿Qué recomiendan?",
    date: "2026-02-08",
    comments: [
      { id: "c2", author: "Ana Martínez", content: "Es posible si le das suficientes paseos diarios. ¡Los labradores necesitan mucho ejercicio!", date: "2026-02-09" },
      { id: "c3", author: "Pedro Ruiz", content: "Yo tengo un golden en un depa similar, lo saco 3 veces al día y está feliz.", date: "2026-02-09" },
    ],
  },
  {
    id: "p3",
    title: "Presentación: nueva en la comunidad 🐾",
    author: "Laura Sánchez",
    category: "General",
    content: "¡Hola! Soy nueva en PetMatch. Estoy buscando adoptar mi primera mascota y me encanta esta plataforma. ¿Algún consejo para una primeriza?",
    date: "2026-02-12",
    comments: [],
  },
];

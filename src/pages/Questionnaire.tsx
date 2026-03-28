import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, CheckCircle2, PawPrint, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CostSimulator from "@/components/CostSimulator";
//import EmailResultsModal from "@/components/EmailResultsModal";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PdfTemplate from "@/components/PdfTemplate";
import { PET_COSTS } from "@/components/CostSimulator";

interface Question {
  id: string;
  category: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "lifestyle_activity",
    category: "Estilo de Vida",
    question: "¿Cuál es tu nivel de actividad física diaria?",
    options: [
      { value: "sedentary", label: "Sedentario — paso la mayor parte del día sentado/a", score: 1 },
      { value: "moderate", label: "Moderado — camino o hago ejercicio ligero", score: 2 },
      { value: "active", label: "Activo — hago ejercicio regularmente", score: 3 },
      { value: "very_active", label: "Muy activo — entreno o salgo a correr a diario", score: 4 },
    ],
  },
  {
    id: "lifestyle_schedule",
    category: "Estilo de Vida",
    question: "¿Cuántas horas al día estás fuera de casa?",
    options: [
      { value: "home", label: "Trabajo desde casa — casi todo el día", score: 4 },
      { value: "part", label: "4 a 6 horas fuera", score: 3 },
      { value: "full", label: "8 a 10 horas fuera", score: 2 },
      { value: "long", label: "Más de 10 horas fuera", score: 1 },
    ],
  },
  {
    id: "housing_type",
    category: "Vivienda",
    question: "¿En qué tipo de vivienda vives?",
    options: [
      { value: "apartment_small", label: "Departamento pequeño", score: 1 },
      { value: "apartment_large", label: "Departamento grande", score: 2 },
      { value: "house_no_yard", label: "Casa sin jardín", score: 3 },
      { value: "house_yard", label: "Casa con jardín", score: 4 },
    ],
  },
  {
    id: "housing_pets",
    category: "Vivienda",
    question: "¿Tienes otras mascotas actualmente?",
    options: [
      { value: "none", label: "No tengo mascotas", score: 3 },
      { value: "one", label: "Sí, una mascota", score: 2 },
      { value: "multiple", label: "Sí, varias mascotas", score: 1 },
    ],
  },
  {
    id: "time_care",
    category: "Tiempo Disponible",
    question: "¿Cuánto tiempo puedes dedicar diariamente al cuidado de tu mascota?",
    options: [
      { value: "little", label: "Menos de 1 hora", score: 1 },
      { value: "some", label: "1 a 2 horas", score: 2 },
      { value: "good", label: "2 a 4 horas", score: 3 },
      { value: "lots", label: "Más de 4 horas", score: 4 },
    ],
  },
  {
    id: "experience",
    category: "Experiencia",
    question: "¿Cuál es tu experiencia previa con mascotas?",
    options: [
      { value: "none", label: "Nunca he tenido mascotas", score: 1 },
      { value: "childhood", label: "Tuve mascotas de niño/a", score: 2 },
      { value: "recent", label: "He tenido mascotas como adulto", score: 3 },
      { value: "expert", label: "Tengo amplia experiencia con mascotas", score: 4 },
    ],
  },
  {
    id: "finances",
    category: "Capacidad Financiera",
    question: "¿Estás preparado/a para los gastos de una mascota? (alimentación, veterinario, etc.)",
    options: [
      { value: "tight", label: "Presupuesto ajustado", score: 1 },
      { value: "moderate", label: "Puedo cubrir gastos básicos", score: 2 },
      { value: "comfortable", label: "Tengo presupuesto cómodo para su cuidado", score: 3 },
      { value: "generous", label: "Sin limitaciones, incluiré extras y seguros", score: 4 },
    ],
  },
];

const categoryIcons: Record<string, string> = {
  "Estilo de Vida": "🏃",
  "Vivienda": "🏠",
  "Tiempo Disponible": "⏰",
  "Experiencia": "📚",
  "Capacidad Financiera": "💰",
};

const Questionnaire = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const y = (295 - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("reporte-adopcion.pdf");
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setCompleted(true);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const totalScore = Object.entries(answers).reduce((sum, [id, val]) => {
    const question = questions.find((qq) => qq.id === id);
    const opt = question?.options.find((o) => o.value === val);
    return sum + (opt?.score ?? 0);
  }, 0);

  const maxScore = questions.reduce((sum, qq) => sum + Math.max(...qq.options.map((o) => o.score)), 0);
  const percentage = Math.round((totalScore / maxScore) * 100);
  const [petType, setPetType] = useState<keyof typeof PET_COSTS>("perro_mediano");

  if (completed) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-warm px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">¡Cuestionario completado!</h2>
                  <p className="mt-2 text-muted-foreground">Tu perfil de adoptante ha sido generado.</p>
                  <div className="my-8">
                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary bg-primary/5">
                      <span className="font-display text-4xl font-bold text-primary">{percentage}%</span>
                    </div>
                    <p className="mt-4 font-medium">Puntaje de compatibilidad</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {percentage >= 80 ? "¡Excelente! Eres un candidato ideal para adoptar." :
                        percentage >= 60 ? "¡Muy bien! Tienes un buen perfil de adoptante." :
                          percentage >= 40 ? "Buen inicio. Algunas mascotas pueden ser ideales para ti." :
                            "Te recomendamos evaluar tu situación actual antes de adoptar."}
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button onClick={() => { setCurrent(0); setAnswers({}); setCompleted(false); }} variant="outline">
                      Repetir cuestionario
                    </Button>
                    <Button
                      onClick={handleDownloadPDF}
                      className="gap-2 bg-peach text-peach-foreground hover:bg-peach/90"
                    >
                      <Mail className="h-4 w-4" /> Descargar resultados en PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cost Simulator */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <CostSimulator petType={petType} setPetType={setPetType} />
            </motion.div>

            {/* PDF oculto */}
            <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
              <PdfTemplate
                ref={pdfRef}
                percentage={percentage}
                petType={petType}
              />
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-warm px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{categoryIcons[q.category]} {q.category}</span>
              <span>Pregunta {current + 1} de {questions.length}</span>
            </div>
            <Progress value={progress} className="mt-2 h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl">{q.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={answers[q.id] || ""} onValueChange={handleAnswer} className="space-y-3">
                    {q.options.map((opt) => (
                      <div
                        key={opt.value}
                        className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors cursor-pointer ${answers[q.id] === opt.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                          }`}
                        onClick={() => handleAnswer(opt.value)}
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="cursor-pointer flex-1">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={prev} disabled={current === 0} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button onClick={next} disabled={!answers[q.id]} className="gap-2">
              {current === questions.length - 1 ? "Finalizar" : "Siguiente"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Questionnaire;

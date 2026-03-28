
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, GripVertical, LogOut, PawPrint } from "lucide-react";
import { initialQuestions, type Question, type QuestionOption } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const generateId = () => Math.random().toString(36).substring(2, 9);

const AdminPanel = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("admin");
    const exp = sessionStorage.getItem("admin_exp");

    if (isAdmin !== "ok" || !exp || Date.now() > Number(exp)) {
      sessionStorage.clear();
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const emptyQuestion: Question = {
    id: "",
    category: "",
    question: "",
    options: [
      { id: "", label: "", score: 1 },
      { id: "", label: "", score: 2 },
    ],
  };

  const openNew = () => {
    setEditingQuestion({ ...emptyQuestion, id: generateId(), options: emptyQuestion.options.map(o => ({ ...o, id: generateId() })) });
    setIsDialogOpen(true);
  };

  const openEdit = (q: Question) => {
    setEditingQuestion(JSON.parse(JSON.stringify(q)));
    setIsDialogOpen(true);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSave = () => {
    if (!editingQuestion || !editingQuestion.question.trim() || !editingQuestion.category.trim()) return;
    const validOptions = editingQuestion.options.filter((o) => o.label.trim());
    if (validOptions.length < 2) return;

    const toSave = { ...editingQuestion, options: validOptions };

    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q.id === toSave.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = toSave;
        return copy;
      }
      return [...prev, toSave];
    });
    setIsDialogOpen(false);
    setEditingQuestion(null);
  };

  const updateOption = (index: number, field: keyof QuestionOption, value: string | number) => {
    if (!editingQuestion) return;
    const opts = [...editingQuestion.options];
    opts[index] = { ...opts[index], [field]: value };
    setEditingQuestion({ ...editingQuestion, options: opts });
  };

  const addOption = () => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      options: [...editingQuestion.options, { id: generateId(), label: "", score: editingQuestion.options.length + 1 }],
    });
  };

  const removeOption = (index: number) => {
    if (!editingQuestion || editingQuestion.options.length <= 2) return;
    const opts = editingQuestion.options.filter((_, i) => i !== index);
    setEditingQuestion({ ...editingQuestion, options: opts });
  };

  const categoryIcons: Record<string, string> = {
    "Estilo de Vida": "🏃",
    "Vivienda": "🏠",
    "Tiempo Disponible": "⏰",
    "Experiencia": "📚",
    "Capacidad Financiera": "💰",
  };

  const categories = [...new Set(questions.map((q) => q.category))];

  const filteredQuestions =
  categoryFilter === "all"
    ? questions
    : questions.filter((q) => q.category === categoryFilter);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-warm py-8">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">Editor de Cuestionario</h1>
              <p className="mt-1 text-muted-foreground">Gestiona las preguntas del test de compatibilidad</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={openNew} className="gap-2">
                <Plus className="h-4 w-4" /> Nueva Pregunta
              </Button>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Salir
              </Button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">
              {questions.length} preguntas
            </Badge>
            <Badge
              onClick={() => setCategoryFilter("all")}
              className={`cursor-pointer text-sm ${categoryFilter === "all" ? "bg-primary text-white" : "bg-gray-400/80"
                }`}
            >
              Todas
            </Badge>

            {categories.map((cat) => (
              <Badge
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`cursor-pointer text-sm ${categoryFilter === cat ? "bg-primary text-white" : "bg-gray-400/80"
                  }`}
              >
                {categoryIcons[cat] || "📝"} {cat}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredQuestions.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="mt-1 text-2xl">{categoryIcons[q.category] || "📝"}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Badge variant="outline" className="mb-2 text-xs">{q.category}</Badge>
                            <h3 className="font-display font-semibold">{q.question}</h3>
                          </div>
                          <div className="flex shrink-0 gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEdit(q)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteQuestion(q.id)} className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {q.options.map((opt) => (
                            <span key={opt.id} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                              {opt.label}
                              <span className="ml-1 rounded-full bg-primary/10 px-1.5 text-primary">{opt.score}pt</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Edit / Create Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingQuestion && questions.some((q) => q.id === editingQuestion.id) ? "Editar Pregunta" : "Nueva Pregunta"}
                </DialogTitle>
              </DialogHeader>
              {editingQuestion && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Input
                      placeholder="Ej: Estilo de Vida"
                      value={editingQuestion.category}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pregunta</Label>
                    <Textarea
                      placeholder="Escribe la pregunta..."
                      value={editingQuestion.question}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Opciones de Respuesta</Label>
                      <Button variant="outline" size="sm" onClick={addOption} className="gap-1">
                        <Plus className="h-3 w-3" /> Opción
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {editingQuestion.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Input
                            className="flex-1"
                            placeholder={`Opción ${idx + 1}`}
                            value={opt.label}
                            onChange={(e) => updateOption(idx, "label", e.target.value)}
                          />
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-muted-foreground whitespace-nowrap">Pts:</Label>
                            <Input
                              type="number"
                              min={0}
                              max={10}
                              className="w-16"
                              value={opt.score}
                              onChange={(e) => updateOption(idx, "score", parseInt(e.target.value) || 0)}
                            />
                          </div>
                          {editingQuestion.options.length > 2 && (
                            <Button variant="ghost" size="icon" onClick={() => removeOption(idx)} className="shrink-0 text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleSave} className="gap-2">
                  <PawPrint className="h-4 w-4" /> Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;

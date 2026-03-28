import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PawPrint, ClipboardList, Heart, Search, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const steps = [
  {
    icon: ClipboardList,
    title: "Completa el cuestionario",
    desc: "Responde preguntas sobre tu estilo de vida, vivienda y experiencia con mascotas.",
  },
  {
    icon: Search,
    title: "Descubre tu match",
    desc: "Nuestro algoritmo encuentra las mascotas más compatibles contigo.",
  },
  {
    icon: Heart,
    title: "Encuentra tu compañero ideal",
    desc: "Conoce a tu futura mascota perfecta según tu estilo de vida y preferencias.",
  },
];

const stats = [
  { value: "500+", label: "Perfiles de mascotas analizados" },
  { value: "95%", label: "Matches exitosos" },
  { value: "10,000+", label: "Usuarios que completaron el cuestionario" },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-warm py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            >
              <PawPrint className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-4xl font-bold leading-tight md:text-6xl"
            >
              Encuentra a tu compañero{" "}
              <span className="text-primary">perfecto</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg text-muted-foreground md:text-xl"
            >
              Respondé un breve cuestionario y te conectamos con la mascota que
              mejor se adapta a tu vida. Adopción responsable, fácil y con amor.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link to="/cuestionario">
                <Button size="lg" className="gap-2 rounded-full px-8 text-base">
                  <ClipboardList className="h-5 w-5" />
                  Hacer el cuestionario
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            En tres simples pasos puedes encontrar a la mascota que mejor se
            adapta a tu estilo de vida.
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                <Card className="h-full border-none bg-card shadow-md transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-mint py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <p className="font-display text-4xl font-bold text-accent">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-medium text-mint-foreground">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why adopt */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            ¿Por qué usar PetMatch?
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Compatibilidad",
                desc: "Nuestro test identifica qué tipo de mascota se adapta mejor a tu estilo de vida y personalidad.",
              },
              {
                icon: Users,
                title: "Decisión informada",
                desc: "Con PetMatch sabrás qué necesidades y cuidados requiere cada tipo de mascota antes de adoptar",
              },
              {
                icon: Heart,
                title: "Diversión y aprendizaje",
                desc: "Descubre más sobre ti y sobre el perfil ideal de tu futura mascota de manera interactiva.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            ¿Listo para encontrar a tu compañero ideal?
          </h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Completa nuestro cuestionario de compatibilidad y descubre qué
            mascotas se adaptan mejor a tu vida.
          </p>
          <Link to="/cuestionario">
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 gap-2 rounded-full px-8 text-base font-semibold"
            >
              <PawPrint className="h-5 w-5" />
              Comenzar ahora
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

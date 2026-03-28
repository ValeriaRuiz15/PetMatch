import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint } from "lucide-react";
import Navbar from "@/components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    // Guardar usuario 
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("isLogged");

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-warm px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <PawPrint className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>Únete a PetMatch y encuentra a tu compañero ideal</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">

              <div className="space-y-2">
                <Label>Nombre completo</Label>
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Correo electrónico</Label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Contraseña</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full">
                Crear Cuenta
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Iniciar Sesión
              </Link>
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
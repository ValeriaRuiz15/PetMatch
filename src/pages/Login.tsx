import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint } from "lucide-react";
import Navbar from "@/components/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("isLogged", "true");
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos");
    }
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
            <CardTitle className="font-display text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa a tu cuenta de PetMatch</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">

              <div className="space-y-2">
                <Label>Correo electrónico</Label>
                <Input
                  placeholder="Correo electrónico"
                  type="email"
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
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>

            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="font-medium text-primary hover:underline">
                Regístrate
              </Link>
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, PawPrint } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminLogin = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hash SHA-256
  const hash = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // usuario 
  const ADMIN_USER = "admin";


  const ADMIN_HASH =
    "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputHash = await hash(pass);

    if (user === ADMIN_USER && inputHash === ADMIN_HASH) {
      // sesión válida
      sessionStorage.setItem("admin", "ok");
      sessionStorage.setItem("admin_exp", (Date.now() + 60 * 60 * 1000).toString()); // 1 hora

      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-warm px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">
              Panel de Administrador
            </CardTitle>
            <CardDescription>
              Ingresa tus credenciales para gestionar el cuestionario
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user">Usuario</Label>
                <Input
                  id="user"
                  placeholder="Usuario"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pass">Contraseña</Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="Contraseña"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setError("");
                  }}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full gap-2">
                <PawPrint className="h-4 w-4" /> Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
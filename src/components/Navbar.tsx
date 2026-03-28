import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PawPrint } from "lucide-react";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Detecta cambios en localStorage cuando se monta la Navbar
  useEffect(() => {
    setIsLogged(localStorage.getItem("isLogged") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLogged", "false");
    setIsLogged(false); // actualiza el estado y fuerza render
    window.location.href = "/login";
  };

  const links = [
    { label: "Inicio", href: "/" },
    { label: "Cuestionario", href: "/cuestionario" },
    { label: "Foro", href: "/foro" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <PawPrint className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            PetMatch
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}

          {isLogged ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/registro">
                <Button size="sm">Registrarse</Button>
              </Link>
            </>
          )}


          <Link to="/admin/login">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              ⚙️ Configuración
            </Button>
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                {isLogged ? (
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/registro" onClick={() => setOpen(false)}>
                      <Button className="w-full">Registrarse</Button>
                    </Link>
                  </>
                )}

                <Link to="/admin/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full gap-1 text-muted-foreground">
                    ⚙️ Configuración
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

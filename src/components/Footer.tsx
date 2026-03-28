import { PawPrint, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-warm">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold">PetMatch</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Conectamos adoptantes responsables con mascotas que necesitan un
              hogar lleno de amor.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold">Enlaces</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/mascotas" className="hover:text-primary">Mascotas</Link></li>
              <li><Link to="/cuestionario" className="hover:text-primary">Cuestionario</Link></li>
              <li><Link to="/login" className="hover:text-primary">Iniciar Sesión</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>hola@petmatch.com</li>
              <li>+1 234 567 890</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-1 border-t pt-6 text-sm text-muted-foreground">
          Hecho con <Heart className="h-4 w-4 text-primary" /> para las mascotas
        </div>
      </div>
    </footer>
  );
};

export default Footer;

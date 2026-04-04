import React from "react";
import { PET_COSTS } from "@/components/CostSimulator";

interface Props {
  percentage: number;
  petType: keyof typeof PET_COSTS;
}

const PdfTemplate = React.forwardRef<HTMLDivElement, Props>(
  ({ percentage, petType }, ref) => {

    // Mensaje dinámico
    let message = "";
    if (percentage >= 80) {
      message = "¡Excelente! Eres un candidato ideal para adoptar.";
    } else if (percentage >= 60) {
      message = "¡Muy bien! Tienes un buen perfil de adoptante.";
    } else if (percentage >= 40) {
      message = "Buen inicio. Algunas mascotas pueden ser ideales para ti.";
    } else {
      message = "Te recomendamos evaluar tu situación actual antes de adoptar.";
    }

    // Datos reales del simulador
    const pet = PET_COSTS[petType];
    const costs = pet.costs;

    const total = Object.values(costs).reduce((a, b) => a + b, 0);

    return (
      <div
        ref={ref}
        style={{
          width: "800px",
          padding: "40px",
          background: "#ffffff",
          fontFamily: "Arial, sans-serif",
          color: "#333",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ color: "#ff7a59", margin: 0 }}>
            PetMatch 🐾
          </h1>
          <p style={{ margin: 0, color: "#888" }}>
            Reporte de compatibilidad de adopción
          </p>
        </div>

        <hr />

        {/* SCORE */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h2>Puntaje de compatibilidad</h2>

          <div
            style={{
              margin: "20px auto",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "6px solid #ff7a59",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "42px",
                color: "#ff7a59",
                fontWeight: "bold",
              }}
            >
              {percentage}%
            </span>
          </div>

          <p style={{ fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
            {message}
          </p>
        </div>

        {/* MASCOTA RECOMENDADA */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            {pet.emoji} Mascota recomendada
          </h2>

          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#ff7a59",
            }}
          >
            {pet.label}
          </p>

          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
            Basado en tu estilo de vida, tiempo disponible y espacio en casa.
          </p>
        </div>

        {/* COSTOS */}
        <div style={{ marginTop: "40px" }}>
          <h2>💰 Simulador de costos mensuales</h2>

          <table
            style={{
              width: "100%",
              marginTop: "10px",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td style={cellLeft}>🍖 Alimentación</td>
                <td style={cellRight}>
                  ${costs.alimentacion.toLocaleString("es-MX")} MXN
                </td>
              </tr>
              <tr>
                <td style={cellLeft}>💊 Salud</td>
                <td style={cellRight}>
                  ${costs.salud.toLocaleString("es-MX")} MXN
                </td>
              </tr>
              <tr>
                <td style={cellLeft}>🧼 Higiene</td>
                <td style={cellRight}>
                  ${costs.higiene.toLocaleString("es-MX")} MXN
                </td>
              </tr>
              <tr>
                <td style={cellLeft}>🎾 Accesorios</td>
                <td style={cellRight}>
                  ${costs.accesorios.toLocaleString("es-MX")} MXN
                </td>
              </tr>
            </tbody>
          </table>

          {/* TOTAL */}
          <div
            style={{
              marginTop: "15px",
              padding: "12px",
              background: "#fff3ef",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              color: "#ff7a59",
              fontSize: "16px",
            }}
          >
            <span>Total mensual</span>
            <span>${total.toLocaleString("es-MX")} MXN</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "50px", fontSize: "12px", color: "#777" }}>
          <p>Fecha: {new Date().toLocaleDateString()}</p>
          <p>*Este reporte es una estimación basada en tus respuestas.</p>
        </div>
      </div>
    );
  }
);

const cellLeft = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const cellRight = {
  padding: "10px",
  textAlign: "right" as const,
  borderBottom: "1px solid #eee",
};

export default PdfTemplate;
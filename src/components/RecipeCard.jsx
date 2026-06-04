import { Clock, ChefHat, Users, ChevronRight } from 'lucide-react';

export default function RecipeCard({ recipe, onClick, index }) {
  return (
    <div 
      className="card card-hover animate-fade-in-up" 
      onClick={onClick}
      style={{ cursor: "pointer", animationDelay: `${0.1 * index}s`, display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px", lineHeight: 1 }} className="animate-scale-in">
        {recipe.emoji || "🍽️"}
      </div>
      
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "var(--color-primary)", marginBottom: "8px", lineHeight: 1.3 }}>
        {recipe.nombre}
      </h3>
      
      <p style={{ color: "var(--color-text-light)", fontSize: "14px", marginBottom: "16px", lineHeight: 1.5, flex: 1 }}>
        {recipe.descripcion}
      </p>
      
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--color-primary-bg)", color: "var(--color-primary)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>
          <Clock size={12} /> {recipe.tiempo}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--color-accent-bg)", color: "var(--color-accent)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>
          <ChefHat size={12} /> {recipe.dificultad}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--color-bg)", color: "var(--color-text-muted)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>
          <Users size={12} /> {recipe.porciones}p
        </span>
      </div>
      
      {recipe.etiquetas?.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {recipe.etiquetas.map(e => (
            <span key={e} style={{ background: "var(--color-danger-bg)", color: "var(--color-danger)", padding: "3px 9px", borderRadius: "10px", fontSize: "11px", fontWeight: 700 }}>
              {e}
            </span>
          ))}
        </div>
      )}
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--color-divider)", marginTop: "auto" }}>
        <span style={{ color: "var(--color-primary-light)", fontWeight: 800, fontSize: "15px" }}>
          💰 ~${recipe.ahorro_estimado}
        </span>
        <span style={{ color: "var(--color-accent)", fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center" }}>
          Ver receta <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
}

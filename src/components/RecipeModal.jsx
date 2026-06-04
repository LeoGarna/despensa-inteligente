import { useState } from 'react';
import { X, CheckCircle2, Circle, Clock, ChefHat, Users, PiggyBank, Lightbulb, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RecipeModal({ recipe, onClose, onSaveSavings }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  if (!recipe) return null;

  const toggleStep = (index) => {
    const newSteps = new Set(completedSteps);
    if (newSteps.has(index)) {
      newSteps.delete(index);
    } else {
      newSteps.add(index);
    }
    setCompletedSteps(newSteps);
    
    if (newSteps.size === recipe.pasos.length) {
      toast.success('¡Receta completada! 🎉');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Receta: ${recipe.nombre}`,
          text: `Mira esta receta cero desperdicio: ${recipe.nombre} que preparé con Despensa Inteligente 🌿`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(`Mira esta receta cero desperdicio: ${recipe.nombre} - Preparada con Despensa Inteligente 🌿`);
        toast.success("¡Enlace copiado al portapapeles!");
      }
    } catch (error) {
      console.log('Error sharing', error);
    }
  };

  return (
    <div 
      className="animate-fade-in"
      style={{ position: "fixed", inset: 0, background: "rgba(26,18,8,.65)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div 
        className="animate-scale-in"
        style={{ background: "var(--color-bg)", borderRadius: "26px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "var(--shadow-modal)", padding: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: "sticky", top: 0, background: "rgba(242, 237, 227, 0.9)", backdropFilter: "blur(10px)", zIndex: 10, padding: "16px 20px", display: "flex", justifyContent: "flex-end", borderBottom: "1px solid var(--color-divider)" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={handleShare} style={{ background: "var(--color-bg-card)", border: "none", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-text-muted)", boxShadow: "var(--shadow-sm)" }}>
              <Share2 size={18} />
            </button>
            <button onClick={onClose} style={{ background: "var(--color-bg-card)", border: "none", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-text-muted)", boxShadow: "var(--shadow-sm)" }}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ padding: "0 32px 32px" }}>
          <div style={{ fontSize: "64px", marginBottom: "8px", lineHeight: 1, textAlign: "center", marginTop: "10px" }}>{recipe.emoji}</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", color: "var(--color-primary)", marginBottom: "12px", lineHeight: 1.2, textAlign: "center" }}>
            {recipe.nombre}
          </h2>
          <p style={{ color: "var(--color-text-light)", fontSize: "15px", marginBottom: "24px", lineHeight: 1.6, textAlign: "center" }}>
            {recipe.descripcion}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "28px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--color-primary-bg)", color: "var(--color-primary)", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: 700 }}>
              <Clock size={16} /> {recipe.tiempo}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--color-accent-bg)", color: "var(--color-accent)", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: 700 }}>
              <ChefHat size={16} /> {recipe.dificultad}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--color-bg-card)", color: "var(--color-text)", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: 700, boxShadow: "var(--shadow-sm)" }}>
              <Users size={16} /> {recipe.porciones} porciones
            </span>
          </div>

          <div className="card" style={{ padding: "20px", marginBottom: "24px" }}>
            {recipe.ingredientes_usados?.length > 0 && (
              <div style={{ marginBottom: recipe.ingredientes_extras?.length ? "20px" : "0" }}>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "17px", color: "var(--color-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                  🌿 De tu despensa
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {recipe.ingredientes_usados.map(ing => (
                    <span key={ing} style={{ background: "var(--color-primary-bg)", color: "var(--color-primary)", padding: "6px 14px", borderRadius: "12px", fontSize: "14px", fontWeight: 600 }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.ingredientes_extras?.length > 0 && recipe.ingredientes_extras[0] && (
              <div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "17px", color: "var(--color-accent)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px", marginTop: "16px" }}>
                  🛒 También necesitas
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {recipe.ingredientes_extras.map(ing => (
                    <span key={ing} style={{ background: "var(--color-accent-bg)", color: "var(--color-accent)", padding: "6px 14px", borderRadius: "12px", fontSize: "14px", fontWeight: 600 }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "28px" }}>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "var(--color-primary)", marginBottom: "16px" }}>
              📋 Preparación
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recipe.pasos?.map((step, i) => (
                <div 
                  key={i} 
                  onClick={() => toggleStep(i)}
                  style={{ 
                    display: "flex", gap: "14px", padding: "16px", borderRadius: "16px",
                    background: completedSteps.has(i) ? "var(--color-primary-bg)" : "var(--color-bg-card)",
                    cursor: "pointer", transition: "all 0.2s",
                    border: "1px solid", borderColor: completedSteps.has(i) ? "var(--color-primary-light)" : "transparent"
                  }}
                >
                  <div style={{ color: completedSteps.has(i) ? "var(--color-primary)" : "var(--color-text-muted)", flexShrink: 0, marginTop: "2px" }}>
                    {completedSteps.has(i) ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                  <p style={{ 
                    color: completedSteps.has(i) ? "var(--color-primary-dark)" : "var(--color-text)", 
                    fontSize: "15px", lineHeight: "1.6", margin: 0,
                    textDecoration: completedSteps.has(i) ? "line-through" : "none",
                    opacity: completedSteps.has(i) ? 0.7 : 1
                  }}>
                    <strong style={{ display: "block", fontSize: "13px", color: completedSteps.has(i) ? "var(--color-primary)" : "var(--color-text-muted)", textDecoration: "none", marginBottom: "4px" }}>PASO {i + 1}</strong>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {recipe.tip && (
            <div style={{ background: "var(--color-primary-bg)", borderRadius: "16px", padding: "20px", marginBottom: "24px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ background: "var(--color-bg-card)", padding: "8px", borderRadius: "50%", color: "var(--color-accent)", flexShrink: 0 }}>
                <Lightbulb size={20} />
              </div>
              <div>
                <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "14px", marginBottom: "4px" }}>Tip del chef</strong>
                <p style={{ color: "var(--color-primary-dark)", fontSize: "14px", margin: 0, lineHeight: 1.5 }}>
                  {recipe.tip}
                </p>
              </div>
            </div>
          )}

          <div className="card" style={{ background: "linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-accent-bg) 100%)", textAlign: "center", padding: "24px" }}>
            <PiggyBank size={32} color="var(--color-accent)" style={{ margin: "0 auto 12px" }} />
            <p style={{ color: "var(--color-text)", fontSize: "15px", marginBottom: "8px" }}>Al cocinar esta receta hoy ahorraste aprox.</p>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--color-accent)", marginBottom: "16px" }}>
              ${recipe.ahorro_estimado} MXN
            </div>
            <button 
              className="btn" 
              onClick={() => onSaveSavings(recipe.ahorro_estimado, recipe.nombre)}
              style={{ width: "100%", background: "var(--color-accent)", color: "#fff" }}
            >
              Registrar Ahorro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Target, Leaf, Utensils, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SavingsPanel() {
  const [savedItems, setSavedItems] = useLocalStorage('saved_ingredients', []);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSaved = savedItems.reduce((s, i) => s + i.value, 0);
  const goal = 300;
  const pct = Math.min((totalSaved / goal) * 100, 100);

  useEffect(() => {
    if (totalSaved >= goal && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [totalSaved, showConfetti]);

  const addSaved = () => {
    if (!newName.trim() || !newValue) {
      toast.error("Llena ambos campos");
      return;
    }
    const val = parseFloat(newValue) || 0;
    setSavedItems(p => [{
      id: Date.now(),
      name: newName.trim(),
      value: val,
      date: new Date().toLocaleDateString("es-MX", { month: "short", day: "numeric" })
    }, ...p]);
    setNewName("");
    setNewValue("");
    toast.success(`¡Sumaste $${val} a tus ahorros!`);
  };

  return (
    <div className="animate-fade-in-up" style={{ marginTop: "20px" }}>
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, overflow: "hidden" }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${Math.random() * 100}vw`,
              top: `-20px`,
              width: "10px", height: "10px",
              background: ["#1E5C2E", "#C47A1A", "#5BA85A", "#F2EDE3"][Math.floor(Math.random() * 4)],
              animation: `confettiFall ${2 + Math.random() * 3}s linear forwards`,
              animationDelay: `${Math.random() * 2}s`
            }} />
          ))}
        </div>
      )}

      {/* Big total */}
      <div className="card" style={{ marginBottom: "20px", textAlign: "center", padding: "40px 24px", background: "linear-gradient(180deg, var(--color-bg-card) 0%, var(--color-bg) 100%)" }}>
        <p style={{ color: "var(--color-text-muted)", fontSize: "14px", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Total ahorrado este mes</p>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(64px, 16vw, 100px)", fontWeight: 700, color: "var(--color-primary)", lineHeight: 1, textShadow: "0 4px 20px rgba(30,92,46,0.1)" }}>
          ${totalSaved.toFixed(0)}
        </div>
        <p style={{ color: "var(--color-accent)", fontWeight: 800, fontSize: "16px", marginBottom: "32px", letterSpacing: "0.5px" }}>PESOS MXN</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "0", background: "rgba(255,255,255,0.6)", borderRadius: "20px", padding: "20px 10px", flexWrap: "wrap", boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)" }}>
          {[
            { v: savedItems.length, l: "Ingredientes salvados", icon: <Leaf color="var(--color-primary-light)" size={24} /> },
            { v: `${(totalSaved * 0.003).toFixed(1)} kg`, l: "CO₂ no emitido", icon: <Target color="var(--color-danger)" size={24} /> },
            { v: `${Math.floor(totalSaved / 18)}`, l: "Recetas cocinadas", icon: <Utensils color="var(--color-accent)" size={24} /> },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", flex: "1", minWidth: "100px", padding: "0 12px", borderRight: i < 2 ? "1px solid var(--color-divider)" : "none" }}>
              <div style={{ marginBottom: "8px", display: "flex", justifyContent: "center" }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "24px", color: "var(--color-text)", fontWeight: 700 }}>{s.v}</div>
              <div style={{ color: "var(--color-text-muted)", fontSize: "12px", fontWeight: 600, marginTop: "4px" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--color-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Target size={20} /> Meta del mes
          </h3>
          <span style={{ fontWeight: 800, color: "var(--color-accent)", fontSize: "20px" }}>
            ${totalSaved.toFixed(0)}<span style={{ color: "var(--color-text-muted)", fontWeight: 600, fontSize: "15px" }}> / ${goal}</span>
          </span>
        </div>
        <div style={{ background: "var(--color-bg)", borderRadius: "10px", height: "20px", overflow: "hidden", marginBottom: "12px", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ 
            height: "100%", borderRadius: "10px", 
            background: "linear-gradient(90deg, var(--color-primary), var(--color-primary-light))", 
            width: `${pct}%`, transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 2s infinite" }}></div>
          </div>
        </div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "14px", fontWeight: 600, margin: 0 }}>
          {totalSaved >= goal ? "🎉 ¡Meta alcanzada! Eres un héroe del planeta 🌍" : `Faltan $${(goal - totalSaved).toFixed(0)} MXN para tu meta. ¡Tú puedes!`}
        </p>
      </div>

      {/* Add form */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--color-primary)", marginBottom: "16px" }}>
          Registrar ahorro manualmente
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addSaved()}
            placeholder="¿Qué salvaste? (ej. Medio tomate)"
            style={{ flex: "2", minWidth: "180px", border: "2px solid var(--color-border)", borderRadius: "12px", padding: "12px 16px", fontSize: "15px", background: "var(--color-bg-input)", transition: "border-color 0.2s" }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-light)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
          />
          <div style={{ position: "relative", flex: "1", minWidth: "120px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", fontWeight: 700 }}>$</span>
            <input
              type="number"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addSaved()}
              placeholder="0.00"
              style={{ width: "100%", border: "2px solid var(--color-border)", borderRadius: "12px", padding: "12px 16px 12px 28px", fontSize: "15px", background: "var(--color-bg-input)", transition: "border-color 0.2s" }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-light)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>
          <button className="btn" onClick={addSaved} style={{ padding: "12px 24px", minWidth: "120px" }}>
            <Plus size={18} /> Agregar
          </button>
        </div>
      </div>

      {/* List */}
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--color-primary)", marginBottom: "16px" }}>
          Historial de impacto
        </h3>
        {savedItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "var(--color-text-muted)" }}>
            <Leaf size={48} color="var(--color-border)" style={{ margin: "0 auto 16px" }} />
            <p>Aún no has registrado ningún ahorro.</p>
            <p style={{ fontSize: "13px", marginTop: "4px" }}>Crea recetas y guarda el ahorro generado.</p>
          </div>
        ) : (
          <div>
            {savedItems.map((item, i) => (
              <div key={item.id} className="animate-scale-in" style={{ 
                display: "flex", justifyContent: "space-between", alignItems: "center", 
                padding: "16px", background: "var(--color-bg-input)", borderRadius: "14px",
                marginBottom: i < savedItems.length - 1 ? "12px" : "0",
                animationDelay: `${i * 0.05}s`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-primary-bg)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Leaf size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--color-text)", fontSize: "15px", marginBottom: "2px" }}>{item.name}</div>
                    <div style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>{item.date}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontWeight: 800, color: "var(--color-primary)", fontSize: "16px" }}>+${item.value}</span>
                  <button
                    onClick={() => {
                      setSavedItems(p => p.filter(x => x.id !== item.id));
                      toast("Registro eliminado", { icon: "🗑️" });
                    }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-light)", display: "flex", padding: "4px", borderRadius: "50%", transition: "background 0.2s" }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-danger-bg)'; e.currentTarget.style.color = 'var(--color-danger)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-text-light)'; }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

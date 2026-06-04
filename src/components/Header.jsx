import { Leaf, Settings, TrendingUp, Users } from 'lucide-react';

export default function Header({ tab, setTab, onOpenSettings }) {
  const tabs = [
    { id: "despensa", label: "Despensa", icon: <Leaf size={16} /> },
    { id: "ahorros", label: "Ahorros", icon: <TrendingUp size={16} /> },
    { id: "comunidad", label: "Comunidad", icon: <Users size={16} /> }
  ];

  return (
    <header className="glass" style={{ paddingTop: "24px", paddingBottom: "16px", textAlign: "center", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ position: "absolute", top: "16px", right: "16px" }}>
        <button 
          onClick={onOpenSettings}
          className="btn-secondary" 
          style={{ padding: "8px", borderRadius: "50%", border: "none", color: "var(--color-text-muted)" }}
          aria-label="Configuración"
        >
          <Settings size={22} />
        </button>
      </div>

      <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "8px" }} className="animate-fade-in-up">
        <div style={{ fontSize: "36px", lineHeight: 1 }} className="animate-scale-in">🌱</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, color: "var(--color-primary)", letterSpacing: "-0.5px", margin: 0 }}>
          Despensa Inteligente
        </h1>
      </div>
      <p style={{ color: "var(--color-text-muted)", fontSize: "14px", fontWeight: 500, margin: 0 }} className="animate-fade-in">
        Cocina creativa · Cero desperdicio · Sabores reales
      </p>

      <nav style={{ 
        display: "inline-flex", 
        gap: "4px", 
        marginTop: "20px", 
        background: "var(--color-bg-card)", 
        borderRadius: "16px", 
        padding: "6px", 
        boxShadow: "var(--shadow-sm)" 
      }} className="animate-fade-in-up">
        {tabs.map(t => (
          <button 
            key={t.id} 
            onClick={() => setTab(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: tab === t.id ? "var(--color-primary)" : "transparent",
              color: tab === t.id ? "#fff" : "var(--color-text-muted)",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

import { Leaf, Carrot, WheatOff, Zap } from 'lucide-react';

export default function FilterChips({ filters, setFilters }) {
  const filterOptions = [
    { key: "vegan", label: "Vegano", icon: <Leaf size={14} /> },
    { key: "vegetarian", label: "Vegetariano", icon: <Carrot size={14} /> },
    { key: "glutenFree", label: "Sin gluten", icon: <WheatOff size={14} /> },
    { key: "quick", label: "≤15 mins", icon: <Zap size={14} /> },
  ];

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="card animate-fade-in-up" style={{ marginBottom: "20px", animationDelay: "0.1s" }}>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--color-primary)", marginBottom: "12px" }}>
        Filtros de estilo de vida
      </h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {filterOptions.map(f => (
          <button 
            key={f.key} 
            className={`chip ${filters[f.key] ? "active" : ""}`} 
            onClick={() => toggleFilter(f.key)}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

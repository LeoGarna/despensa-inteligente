import { useState, useRef, useEffect } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { ALL_INGREDIENTS, QUICK_TAGS } from '../data/ingredients';

export default function IngredientInput({ tags, setTags }) {
  const [inputVal, setInputVal] = useState("");
  const [showSug, setShowSug] = useState(false);
  const inputRef = useRef(null);

  const filteredSugs = ALL_INGREDIENTS.filter(i =>
    inputVal.length > 0 &&
    i.name.toLowerCase().includes(inputVal.toLowerCase()) &&
    !tags.includes(i.name)
  ).slice(0, 6);

  const addTag = (val) => {
    const t = val.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags(p => [...p, t]);
    }
    setInputVal(""); 
    setShowSug(false);
    inputRef.current?.focus();
  };

  const removeTag = (t) => {
    setTags(p => p.filter(x => x !== t));
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) { 
      e.preventDefault(); 
      addTag(inputVal); 
    }
    if (e.key === "Backspace" && !inputVal && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="card animate-fade-in-up" style={{ marginBottom: "16px" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "var(--color-primary)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
        ¿Qué tienes en tu despensa? <Sparkles size={18} color="var(--color-accent)" />
      </h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "14px", marginBottom: "16px" }}>
        Escribe tus ingredientes (ej: pollo, arroz, cebolla) y presiona <strong>Enter</strong>
      </p>

      <div
        style={{ 
          border: "2px solid var(--color-border)", 
          borderRadius: "var(--radius-md)", 
          padding: "10px 14px", 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "8px", 
          background: "var(--color-bg-input)", 
          minHeight: "56px", 
          cursor: "text",
          transition: "border-color 0.2s"
        }}
        onClick={() => inputRef.current?.focus()}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary-light)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
      >
        <Search size={18} color="var(--color-text-light)" style={{ margin: "6px 4px 0 0" }} />
        
        {tags.map(tag => (
          <span key={tag} className="pill-ingredient">
            {tag}
            <button
              onClick={e => { e.stopPropagation(); removeTag(tag); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-primary)", display: "flex", padding: 0 }}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        
        <div style={{ position: "relative", flex: "1", minWidth: "150px" }}>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={e => { setInputVal(e.target.value); setShowSug(true); }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSug(true)}
            onBlur={() => setTimeout(() => setShowSug(false), 200)}
            autoComplete="off"
            placeholder={tags.length === 0 ? "ej. jitomate, pollo..." : "Agrega más..."}
            style={{ border: "none", background: "transparent", width: "100%", fontSize: "15px", color: "var(--color-text)", padding: "4px 0" }}
          />
          
          {showSug && filteredSugs.length > 0 && (
            <div className="animate-scale-in" style={{ 
              position: "absolute", top: "calc(100% + 10px)", left: 0, right: 0, 
              background: "#fff", borderRadius: "12px", boxShadow: "var(--shadow-lg)", 
              zIndex: 20, padding: "8px", minWidth: "220px", border: "1px solid var(--color-border)" 
            }}>
              {filteredSugs.map(s => (
                <div 
                  key={s.name} 
                  onMouseDown={(e) => { e.preventDefault(); addTag(s.name); }}
                  style={{ 
                    padding: "10px 14px", cursor: "pointer", fontSize: "14px", 
                    borderRadius: "8px", transition: "background 0.15s",
                    display: "flex", justifyContent: "space-between"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-bg)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontWeight: 600 }}>{s.name}</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                    {ALL_INGREDIENTS.find(i=>i.category === s.category)?.emoji} {s.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {tags.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
          <button 
            onClick={() => setTags([])} 
            style={{ background: "none", border: "none", color: "var(--color-danger)", fontSize: "13px", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}
          >
            <X size={14} /> Limpiar todo
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "16px" }}>
          <p style={{ color: "var(--color-text-muted)", fontSize: "13px", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
            ⚡ Sugerencias rápidas:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {QUICK_TAGS.map(t => (
              <button 
                key={t} 
                onClick={() => addTag(t)} 
                style={{ 
                  background: "var(--color-bg)", border: "none", borderRadius: "20px", 
                  padding: "6px 14px", fontSize: "13px", cursor: "pointer", 
                  color: "var(--color-text)", fontWeight: 600, transition: "all 0.2s" 
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-border)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'var(--color-bg)'; }}
              >
                + {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { X, Key, Info } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

export default function SettingsModal({ onClose }) {
  const [apiKey, setApiKey] = useLocalStorage('gemini_api_key', '');
  
  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Configuración guardada');
    onClose();
  };

  return (
    <div 
      className="animate-fade-in"
      style={{ position: "fixed", inset: 0, background: "rgba(26,18,8,.55)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div 
        className="card animate-scale-in"
        style={{ width: "100%", maxWidth: "480px", position: "relative" }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
        >
          <X size={24} />
        </button>

        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", color: "var(--color-primary)", marginBottom: "20px" }}>
          Configuración
        </h2>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "var(--color-text)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Key size={16} /> API Key de Gemini
            </label>
            <input 
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "14px" }}
            />
            
            <div style={{ background: "var(--color-bg)", padding: "12px", borderRadius: "8px", marginTop: "12px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <Info size={18} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                Tu clave API se guarda <strong>solo en tu navegador</strong> de forma segura usando localStorage. Nunca se envía a nuestros servidores. <br/>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: "var(--color-primary)", fontWeight: 700 }}>Obtener clave gratuita de Gemini</a>
              </p>
            </div>
            
            {!apiKey && (
              <p style={{ fontSize: "13px", color: "var(--color-accent)", marginTop: "12px", fontWeight: 600 }}>
                * Si no provees una clave, la app funcionará en modo offline usando un catálogo limitado de recetas locales.
              </p>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: "10px 20px" }}>
              Cancelar
            </button>
            <button type="submit" className="btn" style={{ padding: "10px 24px" }}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

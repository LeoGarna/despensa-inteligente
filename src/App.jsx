import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import SettingsModal from "./components/SettingsModal";
import IngredientInput from "./components/IngredientInput";
import FilterChips from "./components/FilterChips";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import SavingsPanel from "./components/SavingsPanel";
import CommunityFeed from "./components/CommunityFeed";
import { useRecipeGenerator } from "./hooks/useRecipeGenerator";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ChefHat } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("despensa");
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({ vegan: false, vegetarian: false, glutenFree: false, quick: false });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [savedItems, setSavedItems] = useLocalStorage('saved_ingredients', []);

  const { generateRecipes, loading, error } = useRecipeGenerator();

  const handleGenerate = async () => {
    const generated = await generateRecipes(tags, filters);
    if (generated) {
      setRecipes(generated);
    }
  };

  const handleSaveSavings = (amount, name) => {
    setSavedItems(p => [{
      id: Date.now(),
      name: `Ahorro por: ${name}`,
      value: amount,
      date: new Date().toLocaleDateString("es-MX", { month: "short", day: "numeric" })
    }, ...p]);
    setSelectedRecipe(null);
    setTab("ahorros");
  };

  // Show settings on first load if no API key is set
  useEffect(() => {
    const hasSeenSettings = localStorage.getItem('has_seen_settings');
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!hasSeenSettings && (!apiKey || apiKey === '""')) {
      setTimeout(() => setShowSettings(true), 1500);
      localStorage.setItem('has_seen_settings', 'true');
    }
  }, []);

  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ 
        style: { background: 'var(--color-bg-card)', color: 'var(--color-text)', borderRadius: '12px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-divider)' },
        success: { iconTheme: { primary: 'var(--color-primary-light)', secondary: '#fff' } }
      }} />

      <div className="container" style={{ paddingBottom: "80px" }}>
        <Header tab={tab} setTab={setTab} onOpenSettings={() => setShowSettings(true)} />

        {tab === "despensa" && (
          <div className="animate-fade-in" style={{ marginTop: "20px" }}>
            <IngredientInput tags={tags} setTags={setTags} />
            <FilterChips filters={filters} setFilters={setFilters} />

            <div style={{ textAlign: "center", marginBottom: "32px", marginTop: "24px" }}>
              <button 
                className="btn animate-scale-in" 
                disabled={loading} 
                onClick={handleGenerate} 
                style={{ padding: "18px 48px", fontSize: "18px", boxShadow: "0 8px 24px rgba(30,92,46,0.25)" }}
              >
                {loading ? (
                  <>
                    <ChefHat className="animate-pulse" /> Generando recetas...
                  </>
                ) : (
                  <>✨ Generar Recetas Cero Desperdicio</>
                )}
              </button>
              
              {error && (
                <div className="animate-fade-in-up" style={{ color: "var(--color-danger)", marginTop: "16px", fontSize: "14px", fontWeight: 700, background: "var(--color-danger-bg)", padding: "10px", borderRadius: "8px", display: "inline-block" }}>
                  {error}
                </div>
              )}
            </div>

            {loading && (
              <div className="grid-cards" style={{ marginTop: "32px" }}>
                {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: "300px" }} />)}
              </div>
            )}

            {!loading && recipes.length > 0 && (
              <div className="animate-fade-in-up" style={{ marginTop: "32px" }}>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "26px", color: "var(--color-primary)" }}>
                    🍽️ Tus recetas personalizadas
                  </h2>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "15px", marginTop: "4px" }}>
                    Haz clic en cualquier receta para ver los pasos completos
                  </p>
                </div>
                
                <div className="grid-cards">
                  {recipes.map((r, i) => (
                    <RecipeCard key={i} index={i} recipe={r} onClick={() => setSelectedRecipe(r)} />
                  ))}
                </div>
              </div>
            )}

            {!loading && recipes.length === 0 && tags.length === 0 && (
              <div className="animate-fade-in-up" style={{ textAlign: "center", padding: "60px 16px 40px", animationDelay: "0.2s" }}>
                <div style={{ fontSize: "80px", marginBottom: "20px", lineHeight: 1, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }}>🌽</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "24px", color: "var(--color-primary)", marginBottom: "12px" }}>
                  Comienza con tus ingredientes
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "16px", maxWidth: "460px", margin: "0 auto", lineHeight: 1.6 }}>
                  Escribe lo que tienes en tu refrigerador o alacena y la IA generará recetas deliciosas para aprovecharlos al máximo.
                </p>
                
                <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "48px", flexWrap: "wrap" }}>
                  {[
                    { e: "🥦", t: "Agrega ingredientes" },
                    { e: "🎛️", t: "Elige tus filtros" },
                    { e: "✨", t: "¡Obtén recetas mágicas!" }
                  ].map((s, i) => (
                    <div key={i} className="animate-fade-in-up" style={{ textAlign: "center", animationDelay: `${0.3 + (i * 0.1)}s` }}>
                      <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 12px", boxShadow: "var(--shadow-md)" }}>
                        {s.e}
                      </div>
                      <p style={{ color: "var(--color-text)", fontSize: "14px", fontWeight: 700 }}>{s.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "ahorros" && <SavingsPanel />}
        {tab === "comunidad" && <CommunityFeed />}

      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} onSaveSavings={handleSaveSavings} />
    </>
  );
}

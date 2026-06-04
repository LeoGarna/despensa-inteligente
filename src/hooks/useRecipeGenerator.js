import { useState } from 'react';
import { findMatchingRecipes } from '../utils/recipeMatching';
import { useLocalStorage } from './useLocalStorage';

export function useRecipeGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey] = useLocalStorage('gemini_api_key', '');

  const generateRecipes = async (ingredients, filters) => {
    if (!ingredients || ingredients.length === 0) {
      setError("Agrega al menos un ingrediente para comenzar ✨");
      return null;
    }

    setLoading(true);
    setError(null);

    // If no API key, use fallback recipes instantly (with a tiny fake delay for UX)
    if (!apiKey) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const matched = findMatchingRecipes(ingredients, filters);
          setLoading(false);
          
          if (matched.length === 0) {
            setError("No encontramos recetas exactas con esos ingredientes. Intenta agregar más cosas básicas como huevo, tortillas o cebolla.");
          }
          
          resolve(matched);
        }, 1200);
      });
    }

    // Prepare prompt
    const fp = [
      filters.vegan && "Vegano (sin carne, sin lácteos, sin huevo)",
      filters.vegetarian && "Vegetariano (sin carne)",
      filters.glutenFree && "Sin gluten",
      filters.quick && "Máximo 15 minutos de preparación total",
    ].filter(Boolean);

    const prompt = `Eres un chef experto en cocina casera latinoamericana, apasionado por la cocina cero desperdicio.
Ingredientes disponibles: ${ingredients.join(", ")}.
${fp.length ? `Restricciones obligatorias: ${fp.join("; ")}.` : "Sin restricciones dietéticas especiales."}

Genera exactamente 3 recetas creativas, viables y deliciosas usando principalmente esos ingredientes. Responde SOLO con JSON válido, sin Markdown, sin backticks ni texto extra:

{
  "recetas": [
    {
      "id": "generar_uuid_o_numero_unico",
      "nombre": "nombre creativo evocador",
      "emoji": "emoji",
      "descripcion": "descripción apetitosa corta",
      "tiempo": "X min",
      "dificultad": "Fácil|Media",
      "porciones": 2,
      "ingredientes_usados": ["ingredientes del usuario que se usan"],
      "ingredientes_extras": ["máx 2 ingredientes básicos que faltan"],
      "pasos": ["Paso claro 1", "Paso 2"],
      "etiquetas": ["etiq1", "etiq2"],
      "ahorro_estimado": 45,
      "tip": "consejo breve del chef"
    }
  ]
}

Asegúrate de que la estructura JSON sea perfecta.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        throw new Error('Error en la API de Gemini. Verifica tu clave.');
      }

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      
      try {
        const parsed = JSON.parse(textResponse.trim());
        setLoading(false);
        return parsed.recetas || [];
      } catch (parseError) {
        console.error("Failed to parse JSON from Gemini:", textResponse);
        setError("El asistente se confundió al escribir la receta. Intenta de nuevo 🙏");
        setLoading(false);
        return null;
      }

    } catch (e) {
      console.error(e);
      // Fallback if API fails
      const matched = findMatchingRecipes(ingredients, filters);
      if (matched.length > 0) {
        toast.error("Error con la API. Mostrando recetas locales."); // Will need toast to be imported or handled
        setLoading(false);
        return matched;
      }
      
      setError(e.message || "Algo salió mal al generar las recetas.");
      setLoading(false);
      return null;
    }
  };

  return { generateRecipes, loading, error, setError };
}

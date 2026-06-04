import { FALLBACK_RECIPES } from '../data/fallbackRecipes';

export function findMatchingRecipes(userIngredients, filters) {
  if (!userIngredients || userIngredients.length === 0) return [];
  
  const normalizedUserIngredients = userIngredients.map(i => i.toLowerCase().trim());
  
  // Score and filter each fallback recipe
  const scoredRecipes = FALLBACK_RECIPES.map(recipe => {
    let matchCount = 0;
    const usedIngredients = [];
    const missingIngredients = [];
    
    // Check key ingredients against user ingredients
    recipe.ingredientes_clave.forEach(reqIng => {
      const isMatched = normalizedUserIngredients.some(userIng => 
        reqIng.includes(userIng) || userIng.includes(reqIng)
      );
      
      if (isMatched) {
        matchCount++;
        usedIngredients.push(reqIng);
      } else {
        missingIngredients.push(reqIng);
      }
    });
    
    // Calculate score (percentage of matched key ingredients)
    const score = recipe.ingredientes_clave.length > 0 
      ? matchCount / recipe.ingredientes_clave.length 
      : 0;
      
    return {
      ...recipe,
      score,
      matchCount,
      ingredientes_usados: usedIngredients,
      ingredientes_extras: [...missingIngredients, ...recipe.ingredientes_extras]
    };
  });
  
  // Filter by score (at least 30% match) and apply user filters
  let filtered = scoredRecipes.filter(r => r.score >= 0.3);
  
  if (filters.vegan) {
    filtered = filtered.filter(r => r.etiquetas.includes('Vegano'));
  }
  if (filters.vegetarian) {
    filtered = filtered.filter(r => r.etiquetas.includes('Vegetariano') || r.etiquetas.includes('Vegano'));
  }
  if (filters.quick) {
    filtered = filtered.filter(r => {
      const timeMatch = r.tiempo.match(/\d+/);
      return timeMatch && parseInt(timeMatch[0]) <= 15;
    });
  }
  
  // Sort by highest score first
  return filtered.sort((a, b) => b.score - a.score).slice(0, 3);
}

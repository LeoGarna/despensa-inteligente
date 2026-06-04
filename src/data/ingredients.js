export const INGREDIENT_CATEGORIES = {
  VERDURAS: { id: 'verduras', label: 'Verduras', emoji: '🥬' },
  FRUTAS: { id: 'frutas', label: 'Frutas', emoji: '🍎' },
  PROTEINAS: { id: 'proteinas', label: 'Proteínas', emoji: '🥩' },
  LACTEOS: { id: 'lacteos', label: 'Lácteos & Huevos', emoji: '🧀' },
  GRANOS: { id: 'granos', label: 'Granos & Pasta', emoji: '🌾' },
  OTROS: { id: 'otros', label: 'Otros', emoji: '🥫' }
};

export const ALL_INGREDIENTS = [
  // Verduras
  { name: 'jitomate', category: 'verduras', freq: true },
  { name: 'cebolla', category: 'verduras', freq: true },
  { name: 'ajo', category: 'verduras', freq: true },
  { name: 'chile serrano', category: 'verduras', freq: true },
  { name: 'chile jalapeño', category: 'verduras', freq: false },
  { name: 'chile poblano', category: 'verduras', freq: false },
  { name: 'cilantro', category: 'verduras', freq: true },
  { name: 'papa', category: 'verduras', freq: true },
  { name: 'zanahoria', category: 'verduras', freq: true },
  { name: 'calabaza', category: 'verduras', freq: true },
  { name: 'espinaca', category: 'verduras', freq: true },
  { name: 'champiñones', category: 'verduras', freq: false },
  { name: 'elote', category: 'verduras', freq: false },
  { name: 'nopal', category: 'verduras', freq: false },
  { name: 'chayote', category: 'verduras', freq: false },
  { name: 'brócoli', category: 'verduras', freq: false },
  { name: 'coliflor', category: 'verduras', freq: false },
  { name: 'pepino', category: 'verduras', freq: false },
  { name: 'lechuga', category: 'verduras', freq: false },
  { name: 'tomate verde', category: 'verduras', freq: false },
  { name: 'pimiento morrón', category: 'verduras', freq: false },
  { name: 'zucchini', category: 'verduras', freq: false },
  { name: 'betabel', category: 'verduras', freq: false },
  { name: 'apio', category: 'verduras', freq: false },
  { name: 'ejotes', category: 'verduras', freq: false },
  { name: 'chícharos', category: 'verduras', freq: false },

  // Frutas
  { name: 'limón', category: 'frutas', freq: true },
  { name: 'aguacate', category: 'frutas', freq: true },
  { name: 'mango', category: 'frutas', freq: false },
  { name: 'plátano', category: 'frutas', freq: false },
  { name: 'manzana', category: 'frutas', freq: false },
  { name: 'naranja', category: 'frutas', freq: false },
  { name: 'fresa', category: 'frutas', freq: false },
  { name: 'piña', category: 'frutas', freq: false },

  // Proteínas
  { name: 'pollo', category: 'proteinas', freq: true },
  { name: 'carne molida', category: 'proteinas', freq: true },
  { name: 'atún', category: 'proteinas', freq: true },
  { name: 'jamón', category: 'proteinas', freq: false },
  { name: 'chorizo', category: 'proteinas', freq: false },
  { name: 'bistec', category: 'proteinas', freq: false },
  { name: 'salchicha', category: 'proteinas', freq: false },
  { name: 'pescado', category: 'proteinas', freq: false },
  { name: 'tofu', category: 'proteinas', freq: false },
  { name: 'lentejas', category: 'proteinas', freq: false },
  { name: 'frijoles', category: 'proteinas', freq: true },
  { name: 'garbanzos', category: 'proteinas', freq: false },

  // Lácteos & Huevos
  { name: 'huevo', category: 'lacteos', freq: true },
  { name: 'queso panela', category: 'lacteos', freq: true },
  { name: 'queso oaxaca', category: 'lacteos', freq: false },
  { name: 'queso crema', category: 'lacteos', freq: false },
  { name: 'queso manchego', category: 'lacteos', freq: false },
  { name: 'crema', category: 'lacteos', freq: true },
  { name: 'leche', category: 'lacteos', freq: true },
  { name: 'mantequilla', category: 'lacteos', freq: false },
  { name: 'yogurt', category: 'lacteos', freq: false },

  // Granos & Pasta
  { name: 'arroz', category: 'granos', freq: true },
  { name: 'pasta', category: 'granos', freq: true },
  { name: 'tortilla', category: 'granos', freq: true },
  { name: 'pan', category: 'granos', freq: true },
  { name: 'avena', category: 'granos', freq: false },
  { name: 'quinoa', category: 'granos', freq: false },
  { name: 'harina', category: 'granos', freq: false },

  // Otros
  { name: 'epazote', category: 'otros', freq: false },
  { name: 'puré de tomate', category: 'otros', freq: false },
  { name: 'consomé', category: 'otros', freq: false },
  { name: 'aceite', category: 'otros', freq: false },
  { name: 'sal', category: 'otros', freq: false },
  { name: 'pimienta', category: 'otros', freq: false }
];

export const QUICK_TAGS = ALL_INGREDIENTS.filter(i => i.freq).map(i => i.name).slice(0, 12);

export const FALLBACK_RECIPES = [
  {
    id: "r1",
    nombre: "Tacos de Calabacita a la Mexicana",
    emoji: "🌮",
    descripcion: "Un clásico rápido, saludable y delicioso usando verduras básicas.",
    tiempo: "15 min",
    dificultad: "Fácil",
    porciones: 2,
    ingredientes_clave: ["calabaza", "jitomate", "cebolla", "tortilla", "queso panela", "chile serrano"],
    ingredientes_usados: [], // To be populated at runtime
    ingredientes_extras: [],
    pasos: [
      "Pica la cebolla, el jitomate y el chile serrano finamente.",
      "Corta las calabacitas en cubos pequeños.",
      "Sofríe la cebolla y el chile en un poco de aceite hasta que la cebolla esté transparente.",
      "Agrega el jitomate y las calabacitas. Tapa y cocina a fuego medio por 8 minutos.",
      "Sirve en tortillas calientes y espolvorea queso panela por encima."
    ],
    etiquetas: ["Vegetariano", "Rápido", "Saludable"],
    ahorro_estimado: 45,
    tip: "Si las calabacitas están muy acuosas, destapa los últimos minutos para que el jugo reduzca."
  },
  {
    id: "r2",
    nombre: "Arroz Frito Cero Desperdicio",
    emoji: "🍚",
    descripcion: "La mejor manera de aprovechar verduras sobrantes y arroz del día anterior.",
    tiempo: "20 min",
    dificultad: "Fácil",
    porciones: 3,
    ingredientes_clave: ["arroz", "zanahoria", "chícharos", "cebolla", "huevo", "pollo"],
    ingredientes_usados: [],
    ingredientes_extras: ["Salsa de soya", "Aceite"],
    pasos: [
      "Pica la zanahoria y la cebolla en cuadritos muy pequeños.",
      "Si usas pollo crudo, córtalo en cubos y dóralo en un sartén o wok.",
      "Agrega las verduras picadas al sartén y saltea por 3 minutos.",
      "Haz a un lado los ingredientes, rompe el huevo en el espacio vacío y revuelve hasta que se cocine.",
      "Agrega el arroz (mejor si es de ayer) y un chorrito de salsa de soya. Saltea todo junto a fuego alto por 3 minutos."
    ],
    etiquetas: ["Aprovechamiento", "Versátil"],
    ahorro_estimado: 60,
    tip: "El arroz de 1 o 2 días en el refrigerador funciona mejor porque está más seco y no se bate."
  },
  {
    id: "r3",
    nombre: "Ensalada Cremosa de Atún y Pasta",
    emoji: "🥗",
    descripcion: "Fresca, rápida y perfecta para días calurosos o para llevar al trabajo.",
    tiempo: "15 min",
    dificultad: "Fácil",
    porciones: 2,
    ingredientes_clave: ["pasta", "atún", "crema", "elote", "chícharos", "limón", "apio"],
    ingredientes_usados: [],
    ingredientes_extras: ["Mayonesa (opcional)"],
    pasos: [
      "Cocina la pasta según las instrucciones del empaque y escúrrela bien.",
      "En un tazón grande, mezcla la crema con un poco de mayonesa, sal, pimienta y jugo de limón.",
      "Drena el atún y agrégalo a la crema junto con los granos de elote, chícharos y apio picado.",
      "Incorpora la pasta fría y mezcla todo suavemente.",
      "Refrigera por 10 minutos antes de servir."
    ],
    etiquetas: ["Rápido", "Frío"],
    ahorro_estimado: 50,
    tip: "Puedes usar yogurt natural en lugar de crema para una versión más ligera."
  },
  {
    id: "r4",
    nombre: "Chilaquiles de Despensa",
    emoji: "🍳",
    descripcion: "Transforma esas tortillas que se están endureciendo en un desayuno de campeones.",
    tiempo: "20 min",
    dificultad: "Media",
    porciones: 2,
    ingredientes_clave: ["tortilla", "jitomate", "cebolla", "chile serrano", "huevo", "queso fresco", "crema", "cilantro"],
    ingredientes_usados: [],
    ingredientes_extras: ["Ajo", "Aceite"],
    pasos: [
      "Corta las tortillas en triángulos y dóralas en aceite o en la freidora de aire hasta que estén crujientes.",
      "Hierve los jitomates, la mitad de la cebolla, el ajo y los chiles. Licúa todo con sal para hacer la salsa.",
      "Sofríe la salsa en una olla con un chorrito de aceite por 5 minutos.",
      "Prepara unos huevos estrellados al gusto.",
      "Baña los totopos con la salsa y sirve con el huevo, crema, queso, aros de cebolla y cilantro."
    ],
    etiquetas: ["Desayuno", "Tradicional", "Vegetariano"],
    ahorro_estimado: 40,
    tip: "Secar las tortillas al sol antes de freírlas hace que absorban menos aceite."
  },
  {
    id: "r5",
    nombre: "Tazón Nutritivo de Lentejas y Espinaca",
    emoji: "🍲",
    descripcion: "Lleno de hierro y proteína, usando lo que queda en la alacena.",
    tiempo: "30 min",
    dificultad: "Fácil",
    porciones: 4,
    ingredientes_clave: ["lentejas", "espinaca", "zanahoria", "cebolla", "jitomate", "ajo"],
    ingredientes_usados: [],
    ingredientes_extras: ["Consomé de verduras"],
    pasos: [
      "Enjuaga las lentejas y ponlas a hervir con agua, media cebolla y ajo hasta que estén suaves (unos 20 mins).",
      "Pica finamente la zanahoria y el jitomate.",
      "En otra olla, sofríe las verduras picadas. Agrega las lentejas cocidas (con su caldo).",
      "Sazona con sal o consomé y deja hervir 5 minutos más.",
      "Justo antes de apagar, agrega las espinacas frescas para que se marchiten ligeramente pero no pierdan nutrientes."
    ],
    etiquetas: ["Vegano", "Reconfortante", "Económico"],
    ahorro_estimado: 35,
    tip: "Acompaña con unas gotitas de limón para que tu cuerpo absorba mejor el hierro de las lentejas."
  },
  {
    id: "r6",
    nombre: "Quesadillas de Flor de Calabaza y Champiñones",
    emoji: "🫓",
    descripcion: "Un clásico de los mercados mexicanos en tu cocina.",
    tiempo: "15 min",
    dificultad: "Fácil",
    porciones: 2,
    ingredientes_clave: ["tortilla", "queso oaxaca", "champiñones", "cebolla", "epazote"],
    ingredientes_usados: [],
    ingredientes_extras: ["Flor de calabaza (si hay)"],
    pasos: [
      "Pica finamente la cebolla y los champiñones.",
      "Sofríe la cebolla en un sartén. Agrega los champiñones, sal, pimienta y unas hojitas de epazote.",
      "Calienta las tortillas y ponles queso oaxaca deshebrado.",
      "Rellena con el guisado de champiñones y dobla la tortilla.",
      "Cocina hasta que el queso esté derretido y la tortilla doradita."
    ],
    etiquetas: ["Cena", "Rápido", "Vegetariano"],
    ahorro_estimado: 55,
    tip: "Limpiar los champiñones con un paño húmedo en lugar de lavarlos evitará que suelten demasiada agua."
  }
];

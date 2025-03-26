// src/config/config.js
export default {
    // Datos de Step 1: Personas y Días
    basePrice: 200,          // Precio base para 1 persona
    soloCost: 50,            // Recargo para 1 persona (viajar solo)
    durationCost: {
      2: 30,                 // +30€ por persona para 2 días / 1 noche
      3: 60,                 // +60€ por persona para 3 días / 2 noches
      4: 120,                // +120€ por persona para 4 días / 3 noches
    },
  
    // Datos de Step 3: Personalización
    categoryCost: {
      "primera-segunda": 0,    // No hay recargo
      "solo-segunda": -25,     // -25€ por persona
    },
    jornadaCost: {
      toda: 0,                 // Sin recargo
      "sin-viernes-lunes": 25, // +25€ por persona
    },
    hotelCost: {
      estandar: 0,
      superior: 40,          // +40€ por persona
    },
    desayunoCost: {
      true: 6,               // +6€ por persona si se incluye
      false: 0,
    },
  
    // Datos de Step 4: Descartes de Estadios
    freeDiscardCount: 3,     // Número de descartes gratis
    discardCost: 6,          // +6€ por persona por cada descarte extra
  
    // Otros textos o valores (por ejemplo, textos de botones, mensajes, etc.) pueden agregarse aquí.
  };
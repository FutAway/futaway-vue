<template>
  <div class="step3-container">
    <!-- Sección 1: Fútbol de categoría -->
    <div class="section">
      <h2 class="section-title">{{ sec1Title }}</h2>
      <p class="section-desc">{{ sec1Desc }}</p>

      <div class="options-row">
        <!-- Partidos de Primera y Segunda -->
        <div class="option-card" @click="emitCategoria('primera-segunda')">
          <img :src="sec1Option1.img" alt="Imagen Fútbol" class="option-img" />
          <div class="option-text-large">{{ sec1Option1.title }}</div>
          <div class="option-text-small">{{ sec1Option1.subtitle }}</div>
          <input
            type="radio"
            name="categoria"
            :checked="wizardData.categoria === 'primera-segunda'"
            readonly
          />
        </div>

        <!-- Solo partidos de Segunda -->
        <div class="option-card" @click="emitCategoria('solo-segunda')">
          <img :src="sec1Option2.img" alt="Imagen Fútbol" class="option-img" />
          <div class="option-text-large">{{ sec1Option2.title }}</div>
          <div class="option-text-small">{{ sec1Option2.subtitle }}</div>
          <input
            type="radio"
            name="categoria"
            :checked="wizardData.categoria === 'solo-segunda'"
            readonly
          />
        </div>
      </div>
    </div>

    <div class="double-space"></div>

    <!-- Sección 2: ¿Partidos de viernes y lunes? -->
    <div class="section">
      <h2 class="section-title">{{ sec2Title }}</h2>
      <p class="section-desc">{{ sec2Desc }}</p>

      <div class="options-row">
        <!-- Toda la jornada -->
        <div class="option-card" @click="emitJornada('toda')">
          <img :src="sec2Option1.img" alt="Imagen Jornada" class="option-img" />
          <div class="option-text-large">{{ sec2Option1.title }}</div>
          <div class="option-text-small">{{ sec2Option1.subtitle }}</div>
          <input
            type="radio"
            name="jornada"
            :checked="wizardData.jornada === 'toda'"
            readonly
          />
        </div>

        <!-- Jornada sin viernes ni lunes -->
        <div class="option-card" @click="emitJornada('sin-viernes-lunes')">
          <img :src="sec2Option2.img" alt="Imagen Jornada" class="option-img" />
          <div class="option-text-large">{{ sec2Option2.title }}</div>
          <div class="option-text-small">{{ sec2Option2.subtitle }}</div>
          <input
            type="radio"
            name="jornada"
            :checked="wizardData.jornada === 'sin-viernes-lunes'"
            readonly
          />
        </div>
      </div>
    </div>

    <div class="double-space"></div>

    <!-- Sección 3: ¿Cómo quieres que sea tu alojamiento? -->
    <div class="section">
      <h2 class="section-title">{{ sec3Title }}</h2>
      <p class="section-desc">{{ sec3Desc }}</p>

      <div class="options-row">
        <!-- Hotel Estándar -->
        <div class="option-card" @click="emitHotel('estandar')">
          <img :src="sec3Option1.img" alt="Imagen Hotel" class="option-img" />
          <div class="option-text-large">{{ sec3Option1.title }}</div>
          <div class="option-text-small">{{ sec3Option1.subtitle }}</div>
          <input
            type="radio"
            name="hotel"
            :checked="wizardData.hotel === 'estandar'"
            readonly
          />
        </div>

        <!-- Hotel Superior -->
        <div class="option-card" @click="emitHotel('superior')">
          <img :src="sec3Option2.img" alt="Imagen Hotel" class="option-img" />
          <div class="option-text-large">{{ sec3Option2.title }}</div>
          <div class="option-text-small">{{ sec3Option2.subtitle }}</div>
          <input
            type="radio"
            name="hotel"
            :checked="wizardData.hotel === 'superior'"
            readonly
          />
        </div>
      </div>
    </div>

    <hr class="long-separator" />

    <!-- Sección 4: ¿Quieres incluir desayuno? -->
    <div class="section">
      <div class="options-row">
        <!-- Sin desayuno -->
        <div class="option-card" @click="emitDesayuno(false)">
          <img :src="sec4Option1.img" alt="Imagen Desayuno" class="option-img" />
          <div class="option-text-large">{{ sec4Option1.title }}</div>
          <div class="option-text-small">{{ sec4Option1.subtitle }}</div>
          <input
            type="radio"
            name="desayuno"
            :checked="wizardData.desayuno === false"
            readonly
          />
        </div>

        <!-- Desayuno incluido -->
        <div class="option-card" @click="emitDesayuno(true)">
          <img :src="sec4Option2.img" alt="Imagen Desayuno" class="option-img" />
          <div class="option-text-large">{{ sec4Option2.title }}</div>
          <div class="option-text-small">{{ sec4Option2.subtitle }}</div>
          <input
            type="radio"
            name="desayuno"
            :checked="wizardData.desayuno === true"
            readonly
          />
        </div>
      </div>
    </div>

    <div class="cta-wrapper">
      <!-- Botón negro, deshabilitado hasta que todo esté seleccionado -->
      <button 
        class="cta-black"
        :disabled="!isAllSelected"
        @click="goNextStep"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FutawayStep3",
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      /* Ejemplo de datos e imágenes, podrías cargarlos de un CMS */
      sec1Title: "Fútbol de categoría",
      sec1Desc: "Eliges optar solo a partidos de Segunda División y ahorra en tu experiencia.",
      sec1Option1: {
        img: "https://via.placeholder.com/300x169?text=Futbol+Primera+Segunda", 
        title: "Partidos de Primera y Segunda",
        subtitle: "(Precio base)"
      },
      sec1Option2: {
        img: "https://via.placeholder.com/300x169?text=Futbol+Solo+Segunda", 
        title: "Solo partidos de Segunda",
        subtitle: "(-25€ por persona)"
      },

      sec2Title: "¿Partidos de viernes y lunes?",
      sec2Desc: "Elige qué día quieres que se dispute el partido al que asistirás.",
      sec2Option1: {
        img: "https://via.placeholder.com/300x169?text=Futbol+Toda+Jornada", 
        title: "Toda la Jornada",
        subtitle: "(Sin recargo)"
      },
      sec2Option2: {
        img: "https://via.placeholder.com/300x169?text=Futbol+Sin+Viernes+Lunes", 
        title: "Jornada sin viernes ni lunes",
        subtitle: "(+25€ por persona)"
      },

      sec3Title: "¿Cómo quieres que sea tu alojamiento?",
      sec3Desc: "",
      sec3Option1: {
        img: "https://via.placeholder.com/300x169?text=Hotel+Estandar", 
        title: "Hotel Estándar",
        subtitle: "Asegura un alojamiento de al menos 3 estrellas."
      },
      sec3Option2: {
        img: "https://via.placeholder.com/300x169?text=Hotel+Superior", 
        title: "Hotel Superior",
        subtitle: "(+40€ por persona)\nAsegura un alojamiento de al menos 4 estrellas."
      },

      sec4Option1: {
        img: "https://via.placeholder.com/300x169?text=Sin+Desayuno", 
        title: "Sin desayuno",
        subtitle: ""
      },
      sec4Option2: {
        img: "https://via.placeholder.com/300x169?text=Desayuno+Incluido", 
        title: "Desayuno incluido",
        subtitle: "(+6€ por persona)"
      }
    };
  },
  computed: {
    // Habilitamos el botón solo si todas las selecciones están hechas
    isAllSelected() {
      return (
        this.wizardData.categoria &&
        this.wizardData.jornada &&
        this.wizardData.hotel &&
        (this.wizardData.desayuno === true || this.wizardData.desayuno === false)
      );
    }
  },
  methods: {
    /* En vez de mutar wizardData, emitimos un evento.
       El Wizard escuchará estos eventos y actualizará wizardData. */

    emitCategoria(value) {
      this.$emit("updateCategoria", value);
    },
    emitJornada(value) {
      this.$emit("updateJornada", value);
    },
    emitHotel(value) {
      this.$emit("updateHotel", value);
    },
    emitDesayuno(value) {
      this.$emit("updateDesayuno", value);
    },

    goNextStep() {
      this.$emit("goNextStep");
    }
  }
};
</script>

<style scoped>
.step3-container {
  width: 100%;
  font-family: "DM Sans", sans-serif;
  color: #262626;
  padding: 20px;
}

/* Texto grande y pequeño */
.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}
.section-desc {
  font-size: 0.9rem;
  margin-bottom: 15px;
  color: #555;
}

/* Sección */
.section {
  margin-bottom: 5px;
}

/* Doble espacio */
.double-space {
  margin: 30px 0;
}

/* Fila de opciones */
.options-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
}

/* Tarjeta de cada opción */
.option-card {
  width: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Imagen 16:9 */
.option-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

/* Texto grande y pequeño */
.option-text-large {
  font-weight: bold;
  font-size: 0.95rem;
  margin-bottom: 4px;
}
.option-text-small {
  font-size: 0.85rem;
  white-space: pre-line;
}

/* Radio input */
.option-card input[type="radio"] {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Barra separadora */
.long-separator {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

/* CTA negro centrado */
.cta-wrapper {
  text-align: center;
  margin-top: 20px;
}
.cta-black {
  background-color: #000;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.cta-black:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
<template>
  <div class="step3-container">
    <!-- Sección 1: Fútbol de categoría -->
    <div class="section">
      <h2 class="section-title">{{ sec1Title }}</h2>
      <p class="section-desc">{{ sec1Desc }}</p>

      <div class="options-row">
        <!-- Opción 1 -->
        <div class="option-card" @click="emitCategoria('primera-segunda')">
          <div class="image-container">
            <img :src="sec1Option1.img" alt="Imagen Fútbol" class="option-img" />
            <div v-if="sec1Option1.recargo" class="recargo-badge">
              +{{ sec1Option1.recargo }}€
            </div>
          </div>
          <div class="option-text-large">{{ sec1Option1.title }}</div>
          <div class="option-text-small">{{ sec1Option1.subtitle }}</div>
          <input
            type="radio"
            name="categoria"
            :checked="wizardData.categoria === 'primera-segunda'"
            readonly
          />
        </div>

        <!-- Opción 2 -->
        <div class="option-card" @click="emitCategoria('solo-segunda')">
          <div class="image-container">
            <img :src="sec1Option2.img" alt="Imagen Fútbol" class="option-img" />
            <div v-if="sec1Option2.recargo" class="recargo-badge">
              +{{ sec1Option2.recargo }}€
            </div>
          </div>
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
        <!-- Opción 1 -->
        <div class="option-card" @click="emitJornada('toda')">
          <div class="image-container">
            <img :src="sec2Option1.img" alt="Imagen Jornada" class="option-img" />
            <div v-if="sec2Option1.recargo" class="recargo-badge">
              +{{ sec2Option1.recargo }}€
            </div>
          </div>
          <div class="option-text-large">{{ sec2Option1.title }}</div>
          <div class="option-text-small">{{ sec2Option1.subtitle }}</div>
          <input
            type="radio"
            name="jornada"
            :checked="wizardData.jornada === 'toda'"
            readonly
          />
        </div>

        <!-- Opción 2 -->
        <div class="option-card" @click="emitJornada('sin-viernes-lunes')">
          <div class="image-container">
            <img :src="sec2Option2.img" alt="Imagen Jornada" class="option-img" />
            <div v-if="sec2Option2.recargo" class="recargo-badge">
              +{{ sec2Option2.recargo }}€
            </div>
          </div>
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
      <!-- Aumentamos el espacio entre título y las opciones -->
      <h2 class="section-title" style="margin-bottom: 20px;">
        {{ sec3Title }}
      </h2>

      <div class="options-row">
        <!-- Hotel Estándar -->
        <div class="option-card" @click="emitHotel('estandar')">
          <div class="image-container">
            <img :src="sec3Option1.img" alt="Imagen Hotel" class="option-img" />
            <div v-if="sec3Option1.recargo" class="recargo-badge">
              +{{ sec3Option1.recargo }}€
            </div>
          </div>
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
          <div class="image-container">
            <img :src="sec3Option2.img" alt="Imagen Hotel" class="option-img" />
            <div v-if="sec3Option2.recargo" class="recargo-badge">
              +{{ sec3Option2.recargo }}€
            </div>
          </div>
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

    <!-- Barra separadora corta y centrada -->
    <hr class="short-separator" />

    <div class="double-space"></div>

    <!-- Sección 4: ¿Quieres incluir desayuno? -->
    <div class="section">
      <div class="options-row">
        <!-- Sin desayuno -->
        <div class="option-card" @click="emitDesayuno(false)">
          <div class="image-container">
            <img :src="sec4Option1.img" alt="Imagen Desayuno" class="option-img" />
            <div v-if="sec4Option1.recargo" class="recargo-badge">
              +{{ sec4Option1.recargo }}€
            </div>
          </div>
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
          <div class="image-container">
            <img :src="sec4Option2.img" alt="Imagen Desayuno" class="option-img" />
            <div v-if="sec4Option2.recargo" class="recargo-badge">
              +{{ sec4Option2.recargo }}€
            </div>
          </div>
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

    <!-- Dos CTAs: Atrás (amarillo) y Continuar (negro), centrados -->
    <div class="cta-wrapper">
      <button
        class="cta-back"
        @click="goPrevStep"
      >
        Atrás
      </button>
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
      sec1Title: "Fútbol de categoría",
      sec1Desc: "Eliges optar solo a partidos de Segunda División y ahorra en tu experiencia.",
      sec1Option1: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Futbol",
        title: "Partidos de Primera y Segunda",
        subtitle: "",
        recargo: 0
      },
      sec1Option2: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Futbol",
        title: "Solo partidos de Segunda",
        subtitle: "",
        recargo: 25
      },

      sec2Title: "¿Partidos de viernes y lunes?",
      sec2Desc: "Elige qué día quieres que se dispute el partido al que asistirás.",
      sec2Option1: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Jornada",
        title: "Toda la jornada",
        subtitle: "",
        recargo: 0
      },
      sec2Option2: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Jornada",
        title: "Jornada sin viernes ni lunes",
        subtitle: "",
        recargo: 25
      },

      sec3Title: "¿Cómo quieres que sea tu alojamiento?",
      sec3Option1: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Hotel",
        title: "Hotel Estándar",
        subtitle: "Aseguran al menos 3 estrellas.",
        recargo: 0
      },
      sec3Option2: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Hotel",
        title: "Hotel Superior",
        subtitle: "Aseguran al menos 4 estrellas.",
        recargo: 40
      },

      sec4Option1: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Desayuno",
        title: "Sin desayuno",
        subtitle: "",
        recargo: 0
      },
      sec4Option2: {
        img: "https://via.placeholder.com/300x169?text=Imagen+Desayuno",
        title: "Desayuno incluido",
        subtitle: "",
        recargo: 6
      }
    };
  },
  computed: {
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
    goPrevStep() {
      this.$emit("goPrevStep");
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

/* Texto grande/pequeño */
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

/* Espacio doble */
.double-space {
  margin: 30px 0;
}

/* Fila de opciones, centradas */
.options-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

/* Tarjeta de opción */
.option-card {
  width: 300px; /* Ajusta el tamaño global */
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

/* Contenedor de imagen + recargo */
.image-container {
  position: relative;
  width: 100%;
}

/* Imagen 16:9 */
.option-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
}

/* Recargo circular */
.recargo-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: #000;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Textos */
.option-text-large {
  font-weight: bold;
  font-size: 0.95rem;
  margin: 8px 0 2px 0; 
  text-align: center;
}
.option-text-small {
  font-size: 0.8rem;
  text-align: center;
}

/* Radio en esquina sup derecha */
.option-card input[type="radio"] {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Barra separadora corta, centrada, discreta */
.short-separator {
  width: 50px;
  margin: 20px auto; 
  border: none;
  border-top: 1px solid #ccc;
}

/* CTA wrapper */
.cta-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* Botón "Atrás" amarillo */
.cta-back {
  background-color: #fff176;
  color: #555;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

/* Botón "Continuar" negro */
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
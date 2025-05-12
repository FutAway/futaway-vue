<template>
  <div class="step3-container">
    <!-- Sección 1: Fútbol de categoría -->
    <div class="section">
      <h2 class="section-title">{{ sec1Title }}</h2>
      <p class="section-desc">{{ sec1Desc }}</p>

      <div class="options-row">
        <!-- Opción 1 -->
        <div
          class="option-card"
          :class="{ selected: wizardData.categoria === 'primera-segunda' }"
          @click="emitCategoria('primera-segunda')"
        >
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
        <div
          class="option-card"
          :class="{ selected: wizardData.categoria === 'solo-segunda' }"
          @click="emitCategoria('solo-segunda')"
        >
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
        <div
          class="option-card"
          :class="{ selected: wizardData.jornada === 'toda' }"
          @click="emitJornada('toda')"
        >
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
        <div
          class="option-card"
          :class="{ selected: wizardData.jornada === 'sin-viernes-lunes' }"
          @click="emitJornada('sin-viernes-lunes')"
        >
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
        <div
          class="option-card"
          :class="{ selected: wizardData.hotel === 'estandar' }"
          @click="emitHotel('estandar')"
        >
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
        <div
          class="option-card"
          :class="{ selected: wizardData.hotel === 'superior' }"
          @click="emitHotel('superior')"
        >
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
        <div
          class="option-card"
          :class="{ selected: wizardData.desayuno === false }"
          @click="emitDesayuno(false)"
        >
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
        <div
          class="option-card"
          :class="{ selected: wizardData.desayuno === true }"
          @click="emitDesayuno(true)"
        >
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
import tagPrimSeg from '@/assets/tags_custom/tag_primeraysegunda.png';
import tagSoloPrimera from '@/assets/tags_custom/tag_soloprimera.png';
import tagTodaJornada from '@/assets/tags_custom/tag_jornadacompleta.png';
import tagSinLunes from '@/assets/tags_custom/tag_sinlunes.png';
import tagHotelEstandar from '@/assets/tags_custom/tag_hotelestandar.png';
import tagHotelSuperior from '@/assets/tags_custom/tag_hotelsuperior.png';
import tagSinDesayuno from '@/assets/tags_custom/tag_sindesayuno.png';
import tagDesayunoIncluido from '@/assets/tags_custom/tag_desayuno.png';
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
      sec1Desc: "Eliges optar solo a partidos de Primera División.",
      sec1Option1: {
        img: tagPrimSeg,
        title: "Partidos de Primera y Segunda",
        subtitle: "",
        recargo: 0
      },
      sec1Option2: {
        img: tagSoloPrimera,
        title: "Solo partidos de Primera",
        subtitle: "",
        recargo: 30
      },

      sec2Title: "¿Partidos los lunes?",
      sec2Desc: "Elige si quieres optar al partido de los lunes.",
      sec2Option1: {
        img: tagTodaJornada,
        title: "Toda la jornada",
        subtitle: "",
        recargo: 0
      },
      sec2Option2: {
        img: tagSinLunes,
        title: "Jornada sin lunes",
        subtitle: "",
        recargo: 10
      },

      sec3Title: "¿Cómo quieres que sea tu alojamiento?",
      sec3Option1: {
        img: tagHotelEstandar,
        title: "Hotel Estándar",
        subtitle: "Aseguran al menos 3 estrellas.",
        recargo: 0
      },
      sec3Option2: {
        img: tagHotelSuperior,
        title: "Hotel Superior",
        subtitle: "Aseguran al menos 4 estrellas.",
        recargo: 40
      },

      sec4Option1: {
        img: tagSinDesayuno,
        title: "Sin desayuno",
        subtitle: "",
        recargo: 0
      },
      sec4Option2: {
        img: tagDesayunoIncluido,
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
  background-color: #ffffff;
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

/* Recargo badge rectangular y fijo */
.recargo-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: #262626;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  width: 56px;
  height: 28px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.option-card:hover .recargo-badge {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
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

.option-card.selected {
  border: 2px solid #ffef98;
  background-color: #ffef98;
}

.option-card input[type="radio"] {
  display: none;
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
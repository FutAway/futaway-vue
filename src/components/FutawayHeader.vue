<!-- /src/components/FutawayHeader.vue -->
<template>
  <header class="header">
    <div class="header-content">
      <!-- Logo clicable: al hacer clic => emitir goHome -->
      <div class="logo-container" @click="goHome">
        <img :src="logo" alt="FutAway Logo" class="logo-image" />
      </div>

      <!-- Categorías: sólo si currentStep === 1 -->
      <div v-if="currentStep === 1" class="header-anchors">
        <button class="anchor-button">{{ anchor1 }}</button>
        <button class="anchor-button">{{ anchor2 }}</button>
        <button class="anchor-button">{{ anchor3 }}</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "FutawayHeader", // multi-palabra para evitar errores ESLint
  props: {
    // Recibe el número de Step actual
    currentStep: {
      type: Number,
      default: 1
    },
    // Logo (ruta / nombre). Ej: "FutawayLogo.png"
    logo: {
      type: String,
      default: "FutawayLogo.png"
    },
    // Textos de las categorías, editables en el futuro
    anchor1: {
      type: String,
      default: "¿Cómo funciona FutAway?"
    },
    anchor2: {
      type: String,
      default: "Inicio"
    },
    anchor3: {
      type: String,
      default: "Contáctanos"
    }
  },
  methods: {
    goHome() {
      // Emite un evento para que App.vue ponga el wizard en Step1
      this.$emit("goHome");
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #000; /* negro carbón */
  padding: 10px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.logo-container {
  cursor: pointer;
  margin: 0 auto;
}

.logo-image {
  max-height: 60px;
}

.header-anchors {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.anchor-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
}

.anchor-button:hover {
  text-decoration: underline;
}
</style>
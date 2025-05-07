<template>
  <div>
    <!-- CONTENEDOR VIDEO: Pestañas, desplegables y CTA -->
    <div class="step1-background">
      <!-- Vídeo de fondo -->
      <video
        class="step1-video"
        src="@/assets/banner_fa.mp4"
        autoplay
        muted
        loop
        playsinline
      ></video>

      <!-- Contenedor de pestañas (moved below) -->

      <div class="tabs-wrapper">
        <div
          :class="['tab', { active: selectedTab === 'reservar' }]"
          @click="selectedTab = 'reservar'"
        >
          <i class="pi pi-star tab-icon"></i>
          Reservar
        </div>
        <div
          :class="['tab', { active: selectedTab === 'regalar' }]"
          @click="selectedTab = 'regalar'"
        >
          <i class="pi pi-gift tab-icon"></i>
          Regalar
        </div>
      </div>

      <div class="step1-container">
        <div class="fields-row">
          <!-- Campo Personas -->
          <div class="field">
            <label>¿Cuántos sois?</label>
            <!-- eslint-disable-next-line vue/no-mutating-props -->
            <select v-model="wizardData.personas">
              <option value="" disabled selected hidden>Elige número de personas</option>
              <option value="1">1 persona (+50€)</option>
              <option value="2">2 personas</option>
              <option value="3">3 personas</option>
              <option value="4">4 personas</option>
              <option value="5">5 personas</option>
              <option value="6">6 personas</option>
            </select>
          </div>

          <div class="separator"></div>

          <!-- Campo Días -->
          <div class="field">
            <label>¿Cuántos días?</label>
            <!-- eslint-disable-next-line vue/no-mutating-props -->
            <select v-model="wizardData.dias">
              <option value="" disabled selected hidden>Elige número de días</option>
              <option value="2">2 días / 1 noche</option>
              <option value="3">3 días / 2 noches</option>
              <option value="4">4 días / 3 noches</option>
            </select>
          </div>

          <!-- Botón Comenzar -->
          <button
            class="cta-button"
            :disabled="!wizardData.personas || !wizardData.dias"
            @click="startJourney"
          >
            Comenzar
          </button>
        </div>
      </div>
    </div>

    <!-- CONTENIDO ADICIONAL CON FONDO BLANCO -->
    <div class="additional-info">
      <!-- Título principal grande, centrado -->
      <div class="how-it-works">
        <h1>{{ wizardData.howItWorksTitle || "¿Cómo funciona una aventura FutAway?" }}</h1>
      </div>

      <!-- BLOQUE 1: Imagen izquierda, texto derecha -->
      <div class="info-section">
        <div class="info-image">
          <img :src="wizardData.featureImage || 'https://via.placeholder.com/640x160'" alt="Información FutAway" />
        </div>
        <div class="info-text">
          <h2>{{ wizardData.featureTitle || "ELIGE TU FECHA" }}</h2>
          <p>{{ wizardData.featureDescription || "Tú decides la jornada, nosotros nos encargamos del resto. ¡La emoción empieza aquí!" }}</p>
        </div>
      </div>

      <!-- BLOQUE 2: Texto izquierda, imagen derecha -->
      <div class="info-section reverse">
        <div class="info-text">
          <h2>{{ wizardData.feature2Title || "PERSONALIZA TU EXPERIENCIA" }}</h2>
          <p>{{ wizardData.feature2Description || "Descarta hasta 3 destinos gratis y deja que la magia del fútbol haga el resto." }}</p>
        </div>
        <div class="info-image">
          <img :src="wizardData.feature2Image || 'https://via.placeholder.com/640x160'" alt="Personaliza tu experiencia" />
        </div>
      </div>

      <!-- BLOQUE 3: Imagen izquierda, texto derecha -->
      <div class="info-section">
        <div class="info-image">
          <img :src="wizardData.feature3Image || 'https://via.placeholder.com/640x160'" alt="Recibe tu paquete sorpresa" />
        </div>
        <div class="info-text">
          <h2>{{ wizardData.feature3Title || "RECIBE TU PAQUETE SORPRESA" }}</h2>
          <p>{{ wizardData.feature3Description || "48 horas antes, descubre tu destino con una bufanda y una guía futbolera exclusiva." }}</p>
        </div>
      </div>

      <!-- BLOQUE 4: Texto izquierda, imagen derecha -->
      <div class="info-section reverse">
        <div class="info-text">
          <h2>{{ wizardData.feature4Title || "VIAJA, VIBRA, DISFRUTA" }}</h2>
          <p>{{ wizardData.feature4Description || "Haz las maletas, siente la pasión en el estadio y vive un finde inolvidable. ¡El fútbol te espera!" }}</p>
        </div>
        <div class="info-image">
          <img :src="wizardData.feature4Image || 'https://via.placeholder.com/640x160'" alt="Viaja, vibra, disfruta" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
export default {
  name: "FutawayStep1",
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedTab: "reservar"
    };
  },
  methods: {
    startJourney() {
      if (this.selectedTab === "reservar") {
        this.$emit("goNextStep");
      } else {
        this.$emit("goGiftJourney");
      }
    }
  }
};
</script>

<style scoped>
.step1-background {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  position: relative;
  aspect-ratio: 1920 / 800;
  overflow: hidden;
}

.step1-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

/* Hacer tabs más pequeñas */
.tabs-wrapper .tab {
  padding: 8px 0;
  font-size: 1rem;
  font-family: 'Zuume Edge', sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  background-clip: padding-box;
}

/* Centrar contenedor dentro del vídeo */
.step1-container {
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

/* Aumentar tamaño de texto */
.step1-container label {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.step1-container select {
  font-size: 1rem;
  padding: 10px 12px;
}

/* CTA con más relieve */
.cta-button {
  background-color: #ffef98;
  color: #262626;
  border: none;
  border-radius: 4px;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: 'Zuume Edge', sans-serif;
  cursor: pointer;
  margin-left: auto;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}
.cta-button:hover {
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.3);
}

/* Ajustes de campos y separador */
.fields-row {
  display: flex;
  align-items: center;
  gap: 24px;
}
.separator {
  width: 2px;
  height: 60px;
  background-color: #ccc;
}

.tabs-wrapper {
  position: absolute;
  top: calc(50% - 100px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-start;
  width: 60%;
  z-index: 1;
}
.tab {
  background-color: #767676;
  color: #fff;
  flex: 1;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #ddd;
}
.tab:last-child {
  border-right: none;
}
.tab.active {
  background-color: #fff;
  color: #767676;
}
.tab-icon {
  margin-right: 6px;
}
.field {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: 'Zuume Edge', sans-serif;
}
.separator {
  background-color: #e0e0e0;
}
.additional-info {
  width: 75%;
  margin: 40px auto 0 auto;
}
.how-it-works {
  text-align: center;
  margin-bottom: 40px;
}
.how-it-works h1 {
  font-family: 'Zuume Edge', sans-serif;
  font-size: 2.5rem;
  color: #262626;
}
.info-section {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 60%;
  margin: 0 auto 40px auto;
}
.info-section.reverse {
  flex-direction: row-reverse;
}
.info-image {
  flex: 1;
}
.info-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 4;
  object-fit: cover;
  border-radius: 8px;
}
.info-text {
  flex: 1;
  text-align: left;
}
.info-text h2 {
  font-family: 'Zuume Edge', sans-serif;
  font-size: 2rem;
  color: #262626;
  margin-bottom: 10px;
}
.info-text p {
  font-size: 1rem;
  color: #262626;
}
@media (max-width: 768px) {
  .tabs-wrapper,
  .step1-container,
  .additional-info,
  .info-section {
    width: 90%;
  }
  .tabs-wrapper {
    flex-direction: column;
  }
  .tab {
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
  .tab:last-child {
    border-bottom: none;
  }
  .fields-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .separator {
    display: none;
  }
  .cta-button {
    margin-top: 10px;
    margin-left: 0;
  }
  .info-section {
    flex-direction: column;
  }
}
</style>
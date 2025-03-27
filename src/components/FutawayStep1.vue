<!-- src/components/FutawayStep1.vue -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="step1-background">
    <div class="step1-container">
      <!-- Pestañas: z-index menor -->
      <div class="tabs-container">
        <div
          :class="['tab', { active: selectedTab === 'reservar' }]"
          @click="selectedTab = 'reservar'"
        >
          Reservar
        </div>
        <div
          :class="['tab', { active: selectedTab === 'regalar' }]"
          @click="selectedTab = 'regalar'"
        >
          Regalar
        </div>
      </div>

      <!-- Contenido de los desplegables y el botón -->
      <div class="fields-row">
        <!-- Personas -->
        <div class="field">
          <label>¿Cuántos sois?</label>
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

        <!-- Separador -->
        <div class="separator"></div>

        <!-- Días -->
        <div class="field">
          <label>¿Cuántos días?</label>
          <select v-model="wizardData.dias">
            <option value="" disabled selected hidden>Elige número de días</option>
            <option value="2">2 días / 1 noche</option>
            <option value="3">3 días / 2 noches</option>
            <option value="4">4 días / 3 noches</option>
          </select>
        </div>

        <!-- Botón Comenzar (bloqueado si no hay selección en ambos) -->
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
</template>

<script>
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
      selectedTab: 'reservar'
    };
  },
  methods: {
    startJourney() {
      if (this.selectedTab === 'reservar') {
        // Emitir un evento para avanzar al siguiente step
        this.$emit('goNextStep')
      } else {
        // Lógica para 'regalar'
        alert("Flujo de Regalar aún no implementado.");
      }
    }
  }
}
</script>

<style scoped>
/* Fondo negro: más espacio arriba (por ej. 120px) y menos abajo (40px) */
.step1-background {
  background-color: #000;
  padding-top: 120px;
  padding-bottom: 40px;
}

/* Bloque blanco con menos padding vertical (20px) */
.step1-container {
  position: relative;
  z-index: 2;
  width: 60%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px; /* antes 40px => ahora más estrecho en Y */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: visible;
}

/* Pestañas detrás del bloque blanco */
.tabs-container {
  position: absolute;
  z-index: 1;
  top: -39.4px; /* Ajusta si quieres sacarlas más o menos */
  left: 20px;
  display: flex;
  gap: 2px;
}

/* Cada pestaña */
.tab {
  background-color: #767676;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: bold;
}
.tab.active {
  background-color: #fff;
  color: #767676;
  border: 1px solid #ddd;
  border-bottom: none;
}

/* Fila de campos y botón */
.fields-row {
  margin-top: 20px; /* Menos espacio arriba => bloque más estrecho en Y */
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

/* Campo */
.field {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.field label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #262626;
}

/* Separador vertical */
.separator {
  width: 1px;
  height: 60px;
  background-color: #e0e0e0;
}

/* Select */
.field select {
  appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 40px 8px 8px;
  font-size: 14px;
  color: #262626;
  max-width: 200px;
  background-image: url("data:image/svg+xml,%3Csvg%20fill='%23666666'%20height='24'%20viewBox='0%200%2024%2024'%20width='24'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M7%2010l5%205%205-5z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px 16px;
}

/* Botón Comenzar */
.cta-button {
  background-color: #ffef98;
  color: #262626;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  margin-left: auto;
}

/* Botón deshabilitado */
.cta-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .step1-container {
    width: 90%;
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
  .tabs-container {
    left: 10px;
  }
}
</style>
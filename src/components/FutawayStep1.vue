<template>
  <div class="step1-background">
    <!-- Contenedor de pestañas por fuera del bloque blanco -->
    <div class="tabs-wrapper">
      <div
        :class="['tab', { active: selectedTab === 'reservar' }]"
        @click="selectedTab = 'reservar'"
      >
        <!-- Icono de oh-vue-icons -->
        <o-icon name="gi-soccer-kick" class="tab-icon" />
        Reservar
      </div>
      <div
        :class="['tab', { active: selectedTab === 'regalar' }]"
        @click="selectedTab = 'regalar'"
      >
        <o-icon name="gi-present" class="tab-icon" />
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
    }
  },
  methods: {
    startJourney() {
      if (this.selectedTab === 'reservar') {
        this.$emit('goNextStep')
      } else {
        alert("Flujo de Regalar aún no implementado.");
      }
    }
  }
}
</script>

<style scoped>
/* Fondo negro */
.step1-background {
  background-color: #000;
  padding-top: 80px;
  padding-bottom: 40px;
}

/* Pestañas por fuera del contenedor blanco */
.tabs-wrapper {
  display: flex;
  justify-content: flex-start;
  width: 60%;
  margin: 0 auto; /* centrado horizontal */
  margin-bottom: 10px; /* un poco de espacio antes del bloque blanco */
}

/* Cada pestaña => mismo ancho => flex:1; pegadas => border-right */
.tab {
  background-color: #767676;
  color: #fff;
  flex: 1;
  text-align: center;
  font-weight: bold;
  padding: 8px 0;
  cursor: pointer;
  border-radius: 0;
  border-right: 1px solid #ddd;
}
.tab:last-child {
  border-right: none;
}

/* Pestaña activa => fondo blanco, texto gris */
.tab.active {
  background-color: #fff;
  color: #767676;
}

/* Icono dentro de la pestaña */
.tab-icon {
  margin-right: 6px;
}

/* Bloque blanco */
.step1-container {
  width: 60%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 20px; /* Ajustado para menos aire arriba */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Fila con los campos y botón */
.fields-row {
  display: flex;
  align-items: flex-end;
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
  .tabs-wrapper,
  .step1-container {
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
}
</style>
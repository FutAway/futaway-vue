<template>
  <div class="wizard-container">
    <!-- Sidebar a la izquierda -->
    <FutawaySidebar :wizard-data="wizardData" :final-price="finalPrice" :step="step" />

    <!-- Contenido principal (pasos) -->
    <div class="wizard-steps">
      <FutawayStep1 v-if="step === 1" :wizard-data="wizardData" />
      <FutawayStep2 v-else-if="step === 2" :wizard-data="wizardData" />
      <FutawayStep3 v-else-if="step === 3" :wizard-data="wizardData" />
      <FutawayStep4 v-else-if="step === 4" :wizard-data="wizardData" />
      <FutawayStep5 v-else-if="step === 5" :wizard-data="wizardData" :final-price="finalPrice" />

      <!-- Botones de navegación -->
      <div class="wizard-navigation">
        <button v-if="step > 1" @click="prevStep">Atrás</button>
        <button v-if="step < finalStep" @click="nextStep">Continuar</button>
        <button v-else @click="finalizeWizard">Finalizar</button>
      </div>
    </div>
  </div>
</template>

<script>
import FutawaySidebar from './FutawaySidebar.vue'
import FutawayStep1 from './FutawayStep1.vue'
import FutawayStep2 from './FutawayStep2.vue'
import FutawayStep3 from './FutawayStep3.vue'
import FutawayStep4 from './FutawayStep4.vue'
import FutawayStep5 from './FutawayStep5.vue'
import config from '@/config/config.js'

export default {
  name: "FutawayWizard",
  components: {
    FutawaySidebar,
    FutawayStep1,
    FutawayStep2,
    FutawayStep3,
    FutawayStep4,
    FutawayStep5
  },
  data() {
    return {
      step: 1,
      finalStep: 5,
      wizardData: {
        personas: 1,
        dias: 2,
        startDate: "",
        categoria: "primera-segunda",
        jornada: "toda",
        hotel: "estandar",
        desayuno: false,
        descartes: [],
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        metodoPago: [],
        observaciones: ""
      }
    }
  },
  computed: {
    finalPrice() {
      let price = 0;
      // Precio base
      price += config.basePrice * this.wizardData.personas;
      // Recargo solo si es 1 persona
      if (this.wizardData.personas === 1) {
        price += config.soloCost;
      }
      // Recargo por duración
      price += config.durationCost[this.wizardData.dias] * this.wizardData.personas;
      // Recargo por categoría "solo-segunda"
      price += config.categoryCost[this.wizardData.categoria] * this.wizardData.personas;
      // Recargo por jornada sin viernes ni lunes
      price += config.jornadaCost[this.wizardData.jornada] * this.wizardData.personas;
      // Recargo por hotel superior
      price += config.hotelCost[this.wizardData.hotel] * this.wizardData.personas;
      // Recargo por desayuno
      price += config.desayunoCost[this.wizardData.desayuno] * this.wizardData.personas;
      // Recargo por descartes extras
      const extraDescartes = this.wizardData.descartes.length - config.freeDiscardCount;
      if (extraDescartes > 0) {
        price += extraDescartes * config.discardCost * this.wizardData.personas;
      }
      return price;
    }
  },
  methods: {
    nextStep() {
      if (this.step < this.finalStep) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    finalizeWizard() {
      alert(`Reserva completada.\nPrecio Final: ${this.finalPrice} €\nDatos: ${JSON.stringify(this.wizardData, null, 2)}`);
    }
  }
}
</script>

<style scoped>
.wizard-container {
  display: flex;
  gap: 20px;
}
.wizard-steps {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}
.wizard-navigation {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
button {
  padding: 10px 20px;
  background-color: #fff176;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>
<template>
  <div class="wizard-container">
    <!-- Sidebar se muestra solo si step !== 1 -->
    <FutawaySidebar
      v-if="step !== 1"
      :wizard-data="wizardData"
      :final-price="finalPrice"
      :step="step"
    />

    <!-- Contenido principal (pasos) -->
    <div class="wizard-steps">
      <!-- Step1 -->
      <FutawayStep1
        v-if="step === 1"
        :wizard-data="wizardData"
        @goNextStep="nextStep"
      />

      <!-- Step2 con rango y sin botones amarillos -->
      <FutawayStep2
        v-else-if="step === 2"
        :wizard-data="wizardData"
        @updateRange="handleRange"
        @goNextStep="nextStep"
      />

      <!-- Step3 -->
      <FutawayStep3
        v-else-if="step === 3"
        :wizard-data="wizardData"
      />

      <!-- Step4 -->
      <FutawayStep4
        v-else-if="step === 4"
        :wizard-data="wizardData"
      />

      <!-- Step5 -->
      <FutawayStep5
        v-else-if="step === 5"
        :wizard-data="wizardData"
        :final-price="finalPrice"
      />

      <!-- Navegación amarilla: oculta en step 1 y step 2 
           Dejas solo un CTA negro en Step2 -->
      <div class="wizard-navigation" v-if="step !== 1 && step !== 2">
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
        personas: "",
        dias: "",
        // Guardamos startDate y endDate para mostrar el rango en la Sidebar
        startDate: "",
        endDate: "",
        categoria: "primera-segunda", 
        jornada: "",
        hotel: "",
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
      const numPersonas = Number(this.wizardData.personas) || 0;
      let price = 0;

      // Base
      price += (config.basePrice || 0) * numPersonas;

      // 1 persona
      if (numPersonas === 1) {
        price += config.soloCost || 0;
      }

      // Duración
      const durCost = config.durationCost[this.wizardData.dias] || 0;
      price += durCost * numPersonas;

      // Categoría
      if (this.wizardData.categoria) {
        const catCost = config.categoryCost[this.wizardData.categoria] || 0;
        price += catCost * numPersonas;
      }

      // Jornada
      const jornadaCost = config.jornadaCost[this.wizardData.jornada] || 0;
      price += jornadaCost * numPersonas;

      // Hotel
      const hotelCost = config.hotelCost[this.wizardData.hotel] || 0;
      price += hotelCost * numPersonas;

      // Desayuno
      if (this.wizardData.desayuno === true) {
        const desCost = config.desayunoCost[true] || 0;
        price += desCost * numPersonas;
      }

      // Descartes
      const totalDescartes = this.wizardData.descartes?.length || 0;
      const free = config.freeDiscardCount || 3;
      const extraDescartes = totalDescartes - free;
      if (extraDescartes > 0) {
        const discardCost = config.discardCost || 6;
        price += extraDescartes * discardCost * numPersonas;
      }

      return price;
    }
  },
  methods: {
    // Recibimos el rango (start, end) de Step2
    handleRange(range) {
      this.wizardData.startDate = range.start;
      this.wizardData.endDate = range.end;
    },
    nextStep() {
      if (this.step < this.finalStep) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    finalizeWizard() {
      alert(
        `Reserva completada.\nPrecio Final: ${this.finalPrice} €\n` +
        `Datos: ${JSON.stringify(this.wizardData, null, 2)}`
      );
    }
  }
}
</script>

<style scoped>
.wizard-container {
  display: flex;
  gap: 10px; /* Menos espacio horizontal */
}
.wizard-steps {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  /* Menos padding para un diseño más compacto */
  padding: 15px; 
}
.wizard-navigation {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
/* Botones amarillos visibles en Steps >2, ocultos en Step2 */
button {
  padding: 8px 16px;
  background-color: #fff176;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>
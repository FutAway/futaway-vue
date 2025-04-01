<template>
  <div class="wizard-container">
    <!-- Barra lateral solo si step !== 1 -->
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

      <!-- Step2 (Calendario con rango) -->
      <FutawayStep2
        v-else-if="step === 2"
        :wizard-data="wizardData"
        @updateRange="handleRange"
        @goNextStep="nextStep"
      />

      <!-- Step3 (Personalización) -->
      <FutawayStep3
        v-else-if="step === 3"
        :wizard-data="wizardData"
        @updateCategoria="updateCategoria"
        @updateJornada="updateJornada"
        @updateHotel="updateHotel"
        @updateDesayuno="updateDesayuno"
        @goPrevStep="goBackToStep2"
        @goNextStep="nextStep"
      />

      <!-- Step4 (Descartes) -->
      <FutawayStep4
        v-else-if="step === 4"
        :descartes="wizardData.descartes"
        @update:descartes="val => (wizardData.descartes = val)"
        @goPrevStep="prevStep"
        @goNextStep="nextStep"
      />

      <!-- Step5 -->
      <FutawayStep5
        v-else-if="step === 5"
        :wizard-data="wizardData"
        :final-price="finalPrice"
      />

      <!-- Navegación amarilla (solo visible en steps >=5) -->
      <div class="wizard-navigation" v-if="step !== 1 && step !== 2 && step !== 3 && step !== 4">
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

      // Precio base
      price += (config.basePrice || 0) * numPersonas;

      // Suplemento si es 1 persona
      if (numPersonas === 1) {
        price += config.soloCost || 0;
      }

      // Duración
      price += (config.durationCost[this.wizardData.dias] || 0) * numPersonas;

      // Categoría
      if (this.wizardData.categoria) {
        price += (config.categoryCost[this.wizardData.categoria] || 0) * numPersonas;
      }
      // Jornada
      price += (config.jornadaCost[this.wizardData.jornada] || 0) * numPersonas;

      // Hotel
      price += (config.hotelCost[this.wizardData.hotel] || 0) * numPersonas;

      // Desayuno
      if (this.wizardData.desayuno === true) {
        price += (config.desayunoCost[true] || 0) * numPersonas;
      }

      // Descartes extras
      const extraDescartes = (this.wizardData.descartes?.length || 0) - (config.freeDiscardCount || 3);
      if (extraDescartes > 0) {
        price += extraDescartes * (config.discardCost || 6) * numPersonas;
      }

      return price;
    }
  },
  methods: {
    goToStep1() {
      this.step = 1;
    },
    handleRange(range) {
      this.wizardData.startDate = range.start;
      this.wizardData.endDate = range.end;
    },
    updateCategoria(value) {
      this.wizardData.categoria = value;
    },
    updateJornada(value) {
      this.wizardData.jornada = value;
    },
    updateHotel(value) {
      this.wizardData.hotel = value;
    },
    updateDesayuno(value) {
      this.wizardData.desayuno = value;
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
    goBackToStep2() {
      this.step = 2;
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
  gap: 10px;
}
.wizard-steps {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
}
.wizard-navigation {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 16px;
  background-color: #fff176;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>
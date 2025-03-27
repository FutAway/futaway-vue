<template>
  <div class="wizard-container">
    <!-- Sidebar a la izquierda: se muestra solo si no es el Step 1 -->
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
      <!-- Step2 -->
      <FutawayStep2
        v-else-if="step === 2"
        :wizard-data="wizardData"
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

      <!-- Botones de navegación (solo se muestran si step !== 1) -->
      <div class="wizard-navigation" v-if="step !== 1">
        <button v-if="step > 1" @click="prevStep">Atrás</button>
        <button v-if="step < finalStep" @click="nextStep">Continuar</button>
        <button v-else @click="finalizeWizard">Finalizar</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
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
        categoria: "primera-segunda",  // O pon "" si quieres sin valor por defecto
        jornada: "",                   // Sin valor predeterminado
        hotel: "",                     // Sin valor predeterminado
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
      // Convierto personas a número (si está vacío => 0)
      const numPersonas = Number(this.wizardData.personas) || 0;
      let price = 0;

      // Precio base
      price += (config.basePrice || 0) * numPersonas;

      // Recargo solo si es 1 persona
      if (numPersonas === 1) {
        price += config.soloCost || 0;
      }

      // Recargo por duración => config.durationCost[dias] || 0
      const durCost = config.durationCost[this.wizardData.dias] || 0;
      price += durCost * numPersonas;

      // Categoría (opcional, si la usas: "primera-segunda" / "solo-segunda")
      // Si quieres dejarla vacía, haz => config.categoryCost[this.wizardData.categoria] || 0
      if (this.wizardData.categoria) {
        const catCost = config.categoryCost[this.wizardData.categoria] || 0;
        price += catCost * numPersonas;
      }

      // Jornada => config.jornadaCost[jornada] || 0
      const jornadaCost = config.jornadaCost[this.wizardData.jornada] || 0;
      price += jornadaCost * numPersonas;

      // Hotel => config.hotelCost[hotel] || 0
      const hotelCost = config.hotelCost[this.wizardData.hotel] || 0;
      price += hotelCost * numPersonas;

      // Desayuno => if (desayuno === true) => cost
      if (this.wizardData.desayuno === true) {
        const desCost = config.desayunoCost[true] || 0;
        price += desCost * numPersonas;
      }

      // Descartes => wizardData.descartes?.length || 0
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
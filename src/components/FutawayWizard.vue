<template>
  <div class="wizard-container">
    <!-- Barra lateral: solo aparece si no es step 1 -->
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

      <!-- Step2 (Calendario con rango, sin botones amarillos) -->
      <FutawayStep2
        v-else-if="step === 2"
        :wizard-data="wizardData"
        @updateRange="handleRange"
        @goNextStep="nextStep"
      />

      <!-- Step3 (Personalización) 
           Recibe wizardData pero no lo muta. Emite eventos 
           que el Wizard escucha para actualizar wizardData. -->
      <FutawayStep3
        v-else-if="step === 3"
        :wizard-data="wizardData"
        @updateCategoria="updateCategoria"
        @updateJornada="updateJornada"
        @updateHotel="updateHotel"
        @updateDesayuno="updateDesayuno"
        @goNextStep="nextStep"
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

      <!-- Botones de navegación amarillos: 
           Ocultos en steps 1, 2 y 3 (porque en Step3 hay un CTA negro propio) -->
      <div class="wizard-navigation" v-if="step !== 1 && step !== 2 && step !== 3">
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
        // Fechas (seleccionadas en Step2)
        startDate: "",
        endDate: "",

        // Opciones de Step3
        categoria: "primera-segunda", 
        jornada: "",
        hotel: "",
        desayuno: false,

        // Otros datos
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

      // Recargo si solo 1 persona
      if (numPersonas === 1) {
        price += config.soloCost || 0;
      }

      // Recargo por duración
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
    // Recibimos el rango de Step2
    handleRange(range) {
      this.wizardData.startDate = range.start;
      this.wizardData.endDate = range.end;
    },
    // Métodos para actualizar wizardData 
    // desde Step3 sin mutar props en Step3
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

    // Navegación
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

/* Contenedor principal de los pasos */
.wizard-steps {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px; /* Espacio un poco más ajustado */
}

/* Barra de navegación amarilla, oculta en Steps 1, 2 y 3 */
.wizard-navigation {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

/* Botones amarillos para Steps 4 y 5 */
button {
  padding: 8px 16px;
  background-color: #fff176;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>
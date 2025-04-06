<template>
  <div class="step2-container">
    <h1 class="title-large">{{ titleLarge }}</h1>
    <p class="title-small">{{ titleSmall }}</p>

    <!-- Calendario centrado -->
    <div class="calendar-wrapper">
      <!-- El calendario se inyecta aquí vía flatpickr -->
      <div class="calendar-block" ref="calendar"></div>
    </div>

    <!-- CTA negro (la mitad de tamaño y deshabilitado hasta que se seleccione fecha) -->
    <div class="cta-wrapper">
      <button 
        class="cta-black" 
        :disabled="!isDateSelected"
        @click="goNextStep"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";

export default {
  name: "FutawayStep2",
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      titleLarge: "¡Pitido inicial!",
      titleSmall: "Elige el día en el que arrancará tu aventura FutAway.",
      fpInstance: null,
      isSettingRange: false, // Evita recursión al llamar setDate
      isDateSelected: false  // Para habilitar/deshabilitar el CTA
    };
  },
  methods: {
    onDateChange(selectedDates) {
      // Si no hay fechas seleccionadas, salimos
      if (!selectedDates.length) return;

      // Marcamos que al menos una fecha se ha seleccionado
      this.isDateSelected = true;

      // Fecha inicial
      const start = selectedDates[0];
      const year = start.getFullYear();
      const month = String(start.getMonth() + 1).padStart(2, "0");
      const day = String(start.getDate()).padStart(2, "0");
      const startDateStr = `${year}-${month}-${day}`;

      // Calculamos la fecha final en función de wizardData.dias
      const dur = Number(this.wizardData.dias) || 0;
      const end = new Date(start);
      end.setDate(end.getDate() + dur - 1);

      const yearEnd = end.getFullYear();
      const monthEnd = String(end.getMonth() + 1).padStart(2, "0");
      const dayEnd = String(end.getDate()).padStart(2, "0");
      const endDateStr = `${yearEnd}-${monthEnd}-${dayEnd}`;

      // Evitar recursión infinita si volvemos a setDate
      if (!this.isSettingRange) {
        this.isSettingRange = true;
        this.fpInstance.setDate([start, end], true);
        this.isSettingRange = false;
      }

      // Emitimos el rango al padre
      this.$emit("updateRange", { start: startDateStr, end: endDateStr });
    },

    goNextStep() {
      this.$emit("goNextStep");
    }
  },
  mounted() {
    this.fpInstance = flatpickr(this.$refs.calendar, {
      inline: true,
      showMonths: 2,
      minDate: "today",
      dateFormat: "Y-m-d",
      mode: "range",
      onChange: this.onDateChange,
      locale: Spanish
    });
  },
  beforeUnmount() {
    if (this.fpInstance) {
      this.fpInstance.destroy();
    }
  }
};
</script>

<style scoped>
.step2-container {
  width: 100%;
  font-family: "DM Sans", sans-serif;
  color: #262626;
  text-align: center;
  padding: 10px;
}

.title-large {
  font-size: 1.8rem;
  margin-bottom: 5px;
  /* Si quieres usar "Zuume Edge":
  font-family: "Zuume Edge", sans-serif;
  */
}

.title-small {
  font-size: 0.95rem;
  margin-bottom: 20px;
  color: #555;
}

/* Para centrar el calendario completamente */
.calendar-wrapper {
  display: flex;
  justify-content: center;
}

/* Bloque donde se inyecta el calendario */
.calendar-block {
  background-color: #fff;
  /* Aumentamos el padding lateral para dar más aire alrededor de los números periféricos */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* Ocultar el input "fantasma" de flatpickr si no se usa */
:deep(.flatpickr-input) {
  display: none !important;
}

/* CTA negro la mitad de tamaño */
.cta-wrapper {
  margin-top: 20px;
  text-align: center;
}
.cta-black {
  background-color: #000;
  color: #fff;
  padding: 10px 24px; /* Mitad del anterior (antes era ~20px 48px) */
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

/* Deshabilitado */
.cta-black:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ---------- ESTÉTICA DE LA SELECCIÓN DE FECHAS ---------- */

/* Día actual => círculo gris, número en negrita (negro) */
:deep(.flatpickr-day.today) {
  background: #ccc !important; /* gris */
  color: #000 !important;      /* número negro */
  border-radius: 50% !important;
  font-weight: bold;
  border: none !important;
}

/* Días intermedios => rectángulo amarillo con texto en negro */
:deep(.flatpickr-day.inRange) {
  background: #fff176 !important;  /* amarillo */
  color: #000 !important;
  border: none !important;
  border-radius: 4px !important;   /* si quieres con esquinas redondeadas */
}

/* Día de inicio/final => rectángulo relleno de negro, texto en blanco */
:deep(.flatpickr-day.startRange),
:deep(.flatpickr-day.endRange) {
  background: #000 !important;  /* relleno negro */
  color: #fff !important;       /* texto blanco */
  border: none !important;
  border-radius: 4px !important;
}
</style>
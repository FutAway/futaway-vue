<template>
  <div class="step2-container">
    <h1 class="title-large">{{ titleLarge }}</h1>
    <p class="title-small">{{ titleSmall }}</p>

    <!-- Calendario centrado -->
    <div class="calendar-wrapper">
      <div class="calendar-block" ref="calendar"></div>
    </div>

    <!-- CTA negro -->
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
import config from "@/config/config.js";

export default {
  name: "FutawayStep2",
  props: {
    wizardData: { type: Object, required: true }
  },
  data() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
      titleLarge: "¡Pitido inicial!",
      titleSmall: "Elige el día en el que arrancará tu aventura FutAway.",
      fpInstance: null,
      isSettingRange: false,
      isDateSelected: false,
      normalizedToday: today,
      holidays: [
        "2025-05-01","2025-05-02","2025-07-25",
        "2025-08-15","2025-11-01","2025-12-06",
        "2025-12-08","2025-12-25"
      ]
    };
  },
  methods: {
    onDateChange(selectedDates) {
      if (!selectedDates.length) return;
      this.isDateSelected = true;

      const fmt = d => String(d).padStart(2, "0");
      const s = selectedDates[0];
      const startStr = `${s.getFullYear()}-${fmt(s.getMonth()+1)}-${fmt(s.getDate())}`;

      const dur = Number(this.wizardData.dias) || 0;
      const e = new Date(s);
      e.setDate(e.getDate() + dur - 1);
      const endStr = `${e.getFullYear()}-${fmt(e.getMonth()+1)}-${fmt(e.getDate())}`;

      if (!this.isSettingRange) {
        this.isSettingRange = true;
        this.fpInstance.setDate([s, e], true);
        this.isSettingRange = false;
      }
      this.$emit("updateRange", { start: startStr, end: endStr });
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
      locale: Spanish,
      onChange: this.onDateChange,
      onDayCreate: (dObj, dStr, fp, dayElem) => {
        // SOLO días clicables (no prev/next month, no deshabilitados)
        if (dayElem.classList.contains("flatpickr-disabled")) return;

        try {
          const date = dayElem.dateObj;
          const diffMs = date.getTime() - this.normalizedToday.getTime();
          const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
          let price = config.basePrice || 0;

          // Recargos por antelación
          if (diffDays < 14) price += 100;
          else if (diffDays <= 28) price += 50;

          // Recargo festivo
          const y = date.getFullYear(),
                m = String(date.getMonth()+1).padStart(2,"0"),
                d = String(date.getDate()).padStart(2,"0"),
                key = `${y}-${m}-${d}`;
          if (this.holidays.includes(key)) price += 100;

          const span = document.createElement("span");
          span.className = "price-label";
          span.textContent = `${price}€`;
          dayElem.appendChild(span);

        } catch (err) {
          console.error("onDayCreate error:", err);
        }
      }
    });
  },
  beforeUnmount() {
    if (this.fpInstance) this.fpInstance.destroy();
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
}

.title-small {
  font-size: 0.95rem;
  margin-bottom: 20px;
  color: #555;
}

.calendar-wrapper {
  display: flex;
  justify-content: center;
}

.calendar-block {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* Ocultar el input "fantasma" */
:deep(.flatpickr-input) {
  display: none !important;
}

/* Precio bajo cada día clicable */
:deep(.flatpickr-day .price-label) {
  display: block;
  font-size: 0.65em;
  color: #ccc !important;       /* gris claro */
  margin-top: -28px;             /* aún más separación */
}

/* CTA */
.cta-wrapper {
  margin-top: 20px;
  text-align: center;
}
.cta-black {
  background-color: #000;
  color: #fff;
  padding: 10px 24px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.cta-black:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Estilos selección originales */
:deep(.flatpickr-day.today) {
  background: #ccc !important;
  color: #000 !important;
  border-radius: 50% !important;
  font-weight: bold;
  border: none !important;
}
:deep(.flatpickr-day.inRange) {
  background: #fff176 !important;
  color: #000 !important;
  border: none !important;
  border-radius: 4px !important;
}
:deep(.flatpickr-day.startRange),
:deep(.flatpickr-day.endRange) {
  background: #000 !important;
  color: #fff !important;
  border: none !important;
  border-radius: 4px !important;
}
</style>

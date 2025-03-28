<template>
  <div class="sidebar">
    <!-- Número de viajeros -->
    <div class="sidebar-item">
      <img :src="iconPersonas" class="sidebar-icon" alt="icono porteria" />
      <div class="sidebar-text">
        <div class="sidebar-label">Número de viajeros</div>
        <div class="sidebar-value">
          {{ wizardData.personas ? wizardData.personas + ' viajeros' : '-' }}
        </div>
      </div>
    </div>

    <!-- Fecha de inicio -->
    <div class="sidebar-item">
      <img :src="iconFecha" class="sidebar-icon" alt="icono porteria" />
      <div class="sidebar-text">
        <div class="sidebar-label">Fecha de inicio</div>
        <div class="sidebar-value">
          {{ fechaInicioFormateada }}
        </div>
      </div>
    </div>

    <!-- Fecha final -->
    <div class="sidebar-item">
      <img :src="iconFechaFinal" class="sidebar-icon" alt="icono porteria" />
      <div class="sidebar-text">
        <div class="sidebar-label">Fecha final</div>
        <div class="sidebar-value">
          {{ fechaFinalFormateada }}
        </div>
      </div>
    </div>

    <!-- Tipo de Jornada -->
    <div class="sidebar-item">
      <img :src="iconJornada" class="sidebar-icon" alt="icono porteria" />
      <div class="sidebar-text">
        <div class="sidebar-label">Tipo de Jornada</div>
        <div class="sidebar-value">
          {{ wizardData.jornada ? formatoJornada : '-' }}
        </div>
      </div>
    </div>

    <!-- Tipo de Hotel -->
    <div class="sidebar-item">
      <img :src="iconHotel" class="sidebar-icon" alt="icono porteria" />
      <div class="sidebar-text">
        <div class="sidebar-label">Tipo de Hotel</div>
        <div class="sidebar-value">
          {{ wizardData.hotel ? formatoHotel : '-' }}
        </div>
      </div>
    </div>

    <!-- Descartes de destinos -->
    <div class="sidebar-item sidebar-descartes">
      <img :src="iconDescartes" class="sidebar-icon" alt="icono porteria" />
      <div class="sidebar-text">
        <div class="sidebar-label">Descartes de destinos</div>
        <div class="sidebar-value">
          {{ (wizardData.descartes && wizardData.descartes.length > 0)
             ? wizardData.descartes.length + ' descartes'
             : '-'
          }}
        </div>
      </div>
    </div>

    <!-- Espacio extra antes del precio -->
    <div class="sidebar-spacer"></div>

    <!-- Título precio final -->
    <div class="sidebar-price-title">Precio final</div>

    <!-- Precio Final en grande -->
    <div class="sidebar-price">
      {{ finalPrice.toLocaleString() }}€
    </div>

    <!-- Línea de separación -->
    <hr class="sidebar-separator" />

    <!-- Precio por viajero (alineado a la derecha) -->
    <div class="sidebar-price-person">
      <span v-if="wizardData.personas">
        {{ (finalPrice / wizardData.personas).toLocaleString() }}€ por viajero
      </span>
      <span v-else>-</span>
    </div>
  </div>
</template>

<script>
import porteriaEmpty from '@/assets/porteriaEmpty.png'
import porteriaBall from '@/assets/porteriaBall.png'

export default {
  name: "FutawaySidebar",
  props: {
    wizardData: {
      type: Object,
      required: true
    },
    finalPrice: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      required: true
    }
  },
  computed: {
    // Mostrar fecha de inicio en formato "DD-MM-YYYY"
    fechaInicioFormateada() {
      if (!this.wizardData.startDate) return '-'
      return this.formatearFechaDMY(this.wizardData.startDate)
    },
    // Mostrar fecha final en formato "DD-MM-YYYY"
    fechaFinalFormateada() {
      if (!this.wizardData.endDate) return '-'
      return this.formatearFechaDMY(this.wizardData.endDate)
    },

    // Iconos
    iconPersonas() {
      return this.wizardData.personas ? porteriaBall : porteriaEmpty
    },
    iconFecha() {
      return this.wizardData.startDate ? porteriaBall : porteriaEmpty
    },
    iconFechaFinal() {
      return this.wizardData.endDate ? porteriaBall : porteriaEmpty
    },
    iconJornada() {
      return this.wizardData.jornada ? porteriaBall : porteriaEmpty
    },
    iconHotel() {
      return this.wizardData.hotel ? porteriaBall : porteriaEmpty
    },
    iconDescartes() {
      return (this.wizardData.descartes && this.wizardData.descartes.length > 0)
        ? porteriaBall
        : porteriaEmpty
    },

    /* Formato de jornada */
    formatoJornada() {
      if (this.wizardData.jornada === 'toda') {
        return 'Toda la jornada'
      } else if (this.wizardData.jornada === 'sin-viernes-lunes') {
        return 'Jornada sin viernes ni lunes'
      }
      return this.wizardData.jornada
    },

    /* Formato de hotel */
    formatoHotel() {
      if (this.wizardData.hotel === 'estandar') {
        return 'Hotel Estándar'
      } else if (this.wizardData.hotel === 'superior') {
        return 'Hotel Superior'
      }
      return this.wizardData.hotel
    }
  },
  methods: {
    // Función para pasar de "YYYY-MM-DD" a "DD-MM-YYYY"
    formatearFechaDMY(yyyy_mm_dd) {
      const [year, month, day] = yyyy_mm_dd.split('-')
      return `${day}-${month}-${year}`
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  font-family: "DM Sans", sans-serif;
  color: #262626;
}

.sidebar-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.sidebar-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  margin-top: 2px;
}

.sidebar-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.sidebar-label {
  font-weight: bold;
  margin-bottom: 2px;
}
.sidebar-value {
  font-size: 0.9rem;
}

/* Espacio extra antes de precio */
.sidebar-descartes {
  margin-bottom: 30px;
}

.sidebar-spacer {
  height: 10px;
}

/* Título de "Precio final" */
.sidebar-price-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Precio final (triple tamaño) */
.sidebar-price {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Línea de separación */
.sidebar-separator {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

/* Precio por viajero */
.sidebar-price-person {
  font-size: 0.8rem;
  text-align: right;
  color: #666;
}

/* Ajustes responsivos */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }
}
</style>
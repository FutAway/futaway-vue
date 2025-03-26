<!-- src/components/FutawaySidebar.vue -->
<template>
  <div class="sidebar">
    <h3>Número de viajeros</h3>
    <p>{{ wizardData.personas }} viajeros</p>

    <h3>Fecha</h3>
    <p v-if="wizardData.startDate">{{ wizardData.startDate }}</p>
    <p v-else>No seleccionada</p>

    <h3>Tipo de jornada</h3>
    <p>{{ wizardData.jornada === 'toda' ? 'Toda la jornada' : 'Sin Viernes ni Lunes' }}</p>

    <h3>Tipo de Hotel</h3>
    <p>{{ wizardData.hotel === 'estandar' ? 'Hotel Estándar' : 'Hotel Superior' }}</p>

    <h3>Descartes</h3>
    <p>{{ wizardData.descartes.length }} descartes</p>

    <h3>Precio Final</h3>
    <p class="final-price">{{ finalPrice }} €</p>
  </div>
</template>

<script>
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
}
.sidebar h3 {
  margin-top: 10px;
  margin-bottom: 5px;
}
.final-price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}
</style>
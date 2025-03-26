<!-- src/components/FutawayStep2.vue -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <h2>Paso 2: Selecciona la Fecha de Inicio</h2>
    <label for="startDate">Fecha de inicio:</label>
    <input type="date" id="startDate" v-model="wizardData.startDate" />
  </div>
</template>

<script>
export default {
  name: "FutawayStep2",
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
input[type="date"] {
  margin-top: 5px;
  padding: 8px;
  width: 100%;
  max-width: 300px;
}
</style>
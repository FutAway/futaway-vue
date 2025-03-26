<!-- src/components/FutawayStep1.vue -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <h2>Paso 1: Selección Inicial</h2>
    <label for="personas">¿Cuántos sois?</label>
    <select id="personas" v-model="wizardData.personas">
      <option value="1">1 persona (+50€)</option>
      <option value="2">2 personas</option>
      <option value="3">3 personas</option>
      <option value="4">4 personas</option>
      <option value="5">5 personas</option>
      <option value="6">6 personas</option>
    </select>

    <label for="dias">¿Cuántos días?</label>
    <select id="dias" v-model="wizardData.dias">
      <option value="2">2 días / 1 noche</option>
      <option value="3">3 días / 2 noches</option>
      <option value="4">4 días / 3 noches</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FutawayStep1",
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
select {
  margin-top: 5px;
  padding: 8px;
  width: 100%;
  max-width: 300px;
}
</style>
<!-- src/components/FutawayStep3.vue -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <h2>Paso 3: Personalización</h2>

    <p><strong>Fútbol de categoría</strong></p>
    <label>
      <input type="radio" value="primera-segunda" v-model="wizardData.categoria">
      Partidos de Primera y Segunda
    </label>
    <label>
      <input type="radio" value="solo-segunda" v-model="wizardData.categoria">
      Solo partidos de Segunda (-25€ por persona)
    </label>

    <p><strong>¿Partidos de viernes y lunes?</strong></p>
    <label>
      <input type="radio" value="toda" v-model="wizardData.jornada">
      Toda la Jornada
    </label>
    <label>
      <input type="radio" value="sin-viernes-lunes" v-model="wizardData.jornada">
      Jornada sin Viernes ni Lunes (+25€ por persona)
    </label>

    <p><strong>¿Cómo quieres que sea tu alojamiento?</strong></p>
    <label>
      <input type="radio" value="estandar" v-model="wizardData.hotel">
      Hotel Estándar
    </label>
    <label>
      <input type="radio" value="superior" v-model="wizardData.hotel">
      Hotel Superior (+40€ por persona)
    </label>

    <p><strong>¿Quieres incluir desayuno?</strong></p>
    <label>
      <input type="radio" :value="false" v-model="wizardData.desayuno">
      Sin desayuno
    </label>
    <label>
      <input type="radio" :value="true" v-model="wizardData.desayuno">
      Desayuno incluido (+6€ por persona)
    </label>
  </div>
</template>

<script>
export default {
  name: "FutawayStep3",
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: bold;
}
label {
  display: block;
  margin-left: 20px;
  margin-bottom: 5px;
}
</style>
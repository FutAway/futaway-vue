<!-- src/components/FutawayStep5.vue -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <h2>Paso 5: Datos de la reserva</h2>

    <div class="form-group">
      <label>Nombre</label>
      <input type="text" v-model="wizardData.nombre" />
    </div>
    <div class="form-group">
      <label>Apellidos</label>
      <input type="text" v-model="wizardData.apellidos" />
    </div>
    <div class="form-group">
      <label>Teléfono</label>
      <input type="text" v-model="wizardData.telefono" />
    </div>
    <div class="form-group">
      <label>Correo electrónico</label>
      <input type="email" v-model="wizardData.email" />
    </div>

    <p><strong>Resumen de tu reserva:</strong></p>
    <p>Personas: {{ wizardData.personas }}</p>
    <p>Días: {{ wizardData.dias }}</p>
    <p>Fecha de inicio: {{ wizardData.startDate }}</p>
    <p>Descartes: {{ wizardData.descartes.length }}</p>

    <div class="form-group">
      <label>Observaciones</label>
      <textarea v-model="wizardData.observaciones" rows="3"></textarea>
    </div>

    <p><strong>Método de pago</strong></p>
    <label>
      <input type="checkbox" value="Tarjeta" v-model="wizardData.metodoPago" />
      Tarjeta
    </label>
    <label>
      <input type="checkbox" value="PayPal" v-model="wizardData.metodoPago" />
      PayPal
    </label>
    <label>
      <input type="checkbox" value="Transferencia" v-model="wizardData.metodoPago" />
      Transferencia
    </label>
  </div>
</template>

<script>
export default {
  name: "FutawayStep5",
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
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  max-width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
EOF
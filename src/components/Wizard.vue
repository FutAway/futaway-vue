<template>
    <!-- Esta es la sección de HTML donde defines la interfaz del wizard -->
    <div class="wizard">
      <!-- Paso 1: Seleccionar número de personas y días -->
      <div v-if="step === 1">
        <h2>Paso 1: Selección Inicial</h2>
        <label for="personas">¿Cuántos sois?</label>
        <select id="personas" v-model="personas">
          <option value="1">1 persona (+50€)</option>
          <option value="2">2 personas</option>
          <option value="3">3 personas</option>
          <option value="4">4 personas</option>
          <option value="5">5 personas</option>
          <option value="6">6 personas</option>
        </select>
  
        <label for="dias">¿Cuántos días?</label>
        <select id="dias" v-model="dias">
          <option value="2">2 días / 1 noche</option>
          <option value="3">3 días / 2 noches</option>
          <option value="4">4 días / 3 noches</option>
        </select>
  
        <button @click="nextStep">¡Comenzar!</button>
      </div>
  
      <!-- Paso 2: Seleccionar la fecha de inicio -->
      <div v-else-if="step === 2">
        <h2>Paso 2: Selecciona la fecha de inicio</h2>
        <label for="fechaInicio">Fecha de inicio:</label>
        <input type="date" id="fechaInicio" v-model="fechaInicio" />
        <button :disabled="!fechaInicio" @click="nextStep">Continuar</button>
      </div>
  
      <!-- Paso 3: Personalización de extras (placeholder) -->
      <div v-else-if="step === 3">
        <h2>Paso 3: Personaliza tu experiencia</h2>
        <p>Aquí se mostrarán las opciones de personalización adicionales.</p>
        <button @click="nextStep">Continuar</button>
      </div>
  
      <!-- Paso Final: Resumen y confirmación -->
      <div v-else-if="step === 4">
        <h2>Resumen y Confirmación</h2>
        <p>{{ resumen }}</p>
        <button @click="finalizeWizard">Finalizar y Agregar al Carrito</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Wizard",
    data() {
      return {
        step: 1,          // Paso actual del wizard
        personas: 1,      // Valor por defecto: 1 persona
        dias: 2,          // Valor por defecto: 2 días / 1 noche
        fechaInicio: "",  // La fecha de inicio seleccionada
      };
    },
    computed: {
      resumen() {
        // Genera un resumen con los datos seleccionados
        return `Viajeros: ${this.personas}, Días: ${this.dias}, Fecha de inicio: ${this.fechaInicio}`;
      },
    },
    methods: {
      nextStep() {
        // Avanza al siguiente paso
        if (this.step < 4) {
          this.step++;
        }
      },
      finalizeWizard() {
        // Acción final: en un proyecto real, agregarías al carrito o enviarías los datos.
        alert("Reserva completada: " + this.resumen);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el componente Wizard */
  .wizard {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
  }
  
  select,
  input[type="date"] {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #fff176;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>

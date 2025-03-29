<!-- /src/App.vue -->
<template>
  <div id="app">
    <!-- FutawayHeader -->
    <FutawayHeader
      :current-step="currentStep"
      :logo="headerLogo"
      :anchor1="anchorCat1"
      :anchor2="anchorCat2"
      :anchor3="anchorCat3"
      @goHome="goHomeFromHeader"
    />

    <!-- Wizard con ref="wizard" -->
    <FutawayWizard ref="wizard" />
  </div>
</template>

<script>
import FutawayWizard from "./components/FutawayWizard.vue";
import FutawayHeader from "./components/FutawayHeader.vue";

export default {
  name: "App",
  components: {
    FutawayHeader,
    FutawayWizard
  },
  data() {
    return {
      headerLogo: "FutawayLogo.png",
      anchorCat1: "¿Cómo funciona FutAway?",
      anchorCat2: "Inicio",
      anchorCat3: "Contáctanos"
    };
  },
  computed: {
    currentStep() {
      // Si wizard existe, devolvemos wizard.step; si no, 1
      return this.$refs.wizard ? this.$refs.wizard.step : 1;
    }
  },
  methods: {
    goHomeFromHeader() {
      if (this.$refs.wizard) {
        // Llama al método goToStep1() del wizard
        this.$refs.wizard.goToStep1();
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
}
</style>
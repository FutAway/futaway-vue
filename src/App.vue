<template>
  <div id="app">
    <!-- Incluimos el header -->
    <DarkFloatingHeader />
    <!-- Wizard -->
    <FutawayWizard ref="wizard" />
  </div>
</template>

<script>
import FutawayWizard from "./components/FutawayWizard.vue";
import DarkFloatingHeader from "./components/DarkFloatingHeader.vue";

export default {
  name: "App",
  components: {
    FutawayWizard,
    DarkFloatingHeader
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
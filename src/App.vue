<!-- src/App.vue -->
<template>
  <div id="app">
    <FutawayWizard />
  </div>
</template>

<script>
import FutawayWizard from "./components/FutawayWizard.vue";

export default {
  name: "App",
  components: {
    FutawayWizard
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
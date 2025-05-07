<template>
  <div id="app">
    <!-- Header negro con logo y enlaces -->
    <SimpleHeader @go-home="goToStep1" />

    <!-- Wizard -->
    <FutawayWizard ref="wizard" />

    <!-- Footer -->
    <FutawayFooter />
  </div>
</template>

<script>
import SimpleHeader  from "@/components/SimpleHeader.vue";
import FutawayWizard from "@/components/FutawayWizard.vue";
import FutawayFooter from "@/components/FutawayFooter.vue";

export default {
  name: "App",
  components: {
    SimpleHeader,
    FutawayWizard,
    FutawayFooter
  },
  methods: {
    goToStep1() {
      this.$refs.wizard.goToStep1();
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
  /* Empujamos el contenido 80px hacia abajo para dejar hueco al header */
  /* quitamos el padding-botom para que el footer llegue hasta abajo */
  padding: 40px 20px 0;

  /* layout flex para sticky footer */
  display: flex;
  flex-direction: column;
}

/* empuja el footer al fondo */
#app > footer {
  margin-top: auto;
}
</style>
<!-- src/components/SimpleHeader.vue -->
<template>
  <header class="app-header">
    <!-- Logo a la izquierda -->
    <img
      src="@/assets/logo.svg"
      alt="FutAway"
      class="header-logo"
      @click="goHome"
    />

    <!-- Navegación de escritorio -->
    <nav class="header-nav">
      <a href="#" @click.prevent="goHome">Inicio</a>
      <a href="#como-funciona">¿Cómo funciona?</a>
      <a href="/contacto">Contáctanos</a>
    </nav>

    <!-- Botón hamburguesa en móvil -->
    <button class="hamburger" @click="toggleMenu" aria-label="Menú">
      <span/><span/><span/>
    </button>

    <!-- Menú móvil desplegable -->
    <div v-if="isOpen" class="mobile-menu">
      <a href="#" @click.prevent="goHome">Inicio</a>
      <a href="#como-funciona" @click.prevent="toggleMenu">¿Cómo funciona?</a>
      <a href="/contacto" @click.prevent="toggleMenu">Contáctanos</a>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SimpleHeader',
  emits: ['go-home'],
  setup(_, { emit }) {
    const isOpen = ref(false);

    function goHome() {
      emit('go-home');
      isOpen.value = false;
    }

    function toggleMenu() {
      isOpen.value = !isOpen.value;
    }

    return {
      isOpen,
      goHome,
      toggleMenu
    };
  }
};
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 80px;                    /* Mantiene la misma altura */
  background-color: #262626;       /* Fondo de respaldo */
  
  /* FONDO PERSONALIZADO */
  background-image: url('@/assets/fondo_header.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;                 /* Más espacio a los lados para centrar */
  box-sizing: border-box;
  z-index: 1000;
  font-family: 'Zuume Edge', sans-serif;
}

.header-logo {
  height: 120px;                   /* Logo más grande */
  cursor: pointer;
}

.header-nav {
  display: flex;
}
.header-nav a {
  color: #fff;
  margin-left: 30px;               /* Separa más los enlaces */
  text-decoration: none;
  font-size: 1.1rem;               /* Texto un poco más grande */
  transition: color 0.3s ease, transform 0.3s ease;
}
.header-nav a:hover {
  color: #ffef98;
  transform: scale(1.1);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.hamburger span {
  display: block;
  width: 100%;
  height: 3px;
  background: #fff;
  border-radius: 1px;
}

.mobile-menu {
  position: absolute;
  top: 80px;
  right: 60px;                     /* Coincide con el padding */
  background: #262626;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 12px;
}
.mobile-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 12px;
  transition: color 0.3s ease;
}
.mobile-menu a:last-child {
  margin-bottom: 0;
}
.mobile-menu a:hover {
  color: #ffef98;
}

@media (max-width: 768px) {
  .header-nav {
    display: none;
  }
  .hamburger {
    display: flex;
  }
}
</style>
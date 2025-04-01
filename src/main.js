// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'  // Se importa el archivo de estilos globales

// oh-vue-icons setup
import { addIcons, OIcon } from 'oh-vue-icons'
import { GiSoccerKick, GiPresent } from 'oh-vue-icons/icons/gi'

// Importa el JS compilado de Preline UI
import 'preline/dist/preline.js'

// Agregamos los iconos a la librería
addIcons(GiSoccerKick, GiPresent)

const app = createApp(App)

// Registramos el componente <o-icon> globalmente
app.component('o-icon', OIcon)

app.mount('#app')
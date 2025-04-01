<template>
  <div>
    <!-- Título principal -->
    <h2 class="title-step4">¿A qué estadios no quieres ir?</h2>
    <!-- Subtítulo -->
    <p class="subtitle-step4">Descarta 3 destinos gratis y paga 6€ a partir del cuarto, hasta un máximo de 10</p>

    <div class="stadiums-grid">
      <div
        v-for="stadium in stadiums"
        :key="stadium.id"
        :class="['stadium-item', { selected: descartesLocal.includes(stadium.id) }]"
        @click="toggleDiscard(stadium.id)"
      >
        <!-- Contenedor de la imagen -->
        <div class="image-container">
          <img
            class="stadium-image"
            :src="stadium.image"
            :alt="stadium.name"
          />
          <!-- Etiqueta GRATIS / +6€ -->
          <div
            v-if="descartesLocal.includes(stadium.id)"
            class="tag"
          >
            {{ discardTag(stadium.id) }}
          </div>
        </div>
        <!-- Nombre del estadio, POR FUERA y POR DEBAJO de la imagen -->
        <div class="stadium-caption">
          {{ stadium.name }}
        </div>
      </div>
    </div>

    <!-- Dos CTAs centrados -->
    <div class="cta-row">
      <button class="btn-back" @click="$emit('goPrevStep')">Atrás</button>
      <button class="btn-continue" @click="$emit('goNextStep')">Continuar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FutawayStep4",
  props: {
    // Array de descartes proveniente de wizardData.descartes
    descartes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // Copiamos la prop a una variable local para no mutarla directamente
      descartesLocal: [...this.descartes],
      stadiums: [
        { id: 1, name: "Estadio 1",  image: "/img/stadium1.jpg" },
        { id: 2, name: "Estadio 2",  image: "/img/stadium2.jpg" },
        { id: 3, name: "Estadio 3",  image: "/img/stadium3.jpg" },
        { id: 4, name: "Estadio 4",  image: "/img/stadium4.jpg" },
        { id: 5, name: "Estadio 5",  image: "/img/stadium5.jpg" },
        { id: 6, name: "Estadio 6",  image: "/img/stadium6.jpg" },
        { id: 7, name: "Estadio 7",  image: "/img/stadium7.jpg" },
        { id: 8, name: "Estadio 8",  image: "/img/stadium8.jpg" },
        { id: 9, name: "Estadio 9",  image: "/img/stadium9.jpg" },
        { id: 10, name: "Estadio 10", image: "/img/stadium10.jpg" },
        { id: 11, name: "Estadio 11", image: "/img/stadium11.jpg" },
        { id: 12, name: "Estadio 12", image: "/img/stadium12.jpg" },
        { id: 13, name: "Estadio 13", image: "/img/stadium13.jpg" },
        { id: 14, name: "Estadio 14", image: "/img/stadium14.jpg" },
        { id: 15, name: "Estadio 15", image: "/img/stadium15.jpg" },
        { id: 16, name: "Estadio 16", image: "/img/stadium16.jpg" },
        { id: 17, name: "Estadio 17", image: "/img/stadium17.jpg" },
        { id: 18, name: "Estadio 18", image: "/img/stadium18.jpg" },
        { id: 19, name: "Estadio 19", image: "/img/stadium19.jpg" },
        { id: 20, name: "Estadio 20", image: "/img/stadium20.jpg" },
        { id: 21, name: "Estadio 21", image: "/img/stadium21.jpg" }
      ]
    }
  },
  watch: {
    // Si la prop descartes cambia, actualizamos la copia local
    descartes(newVal) {
      this.descartesLocal = [...newVal];
    }
  },
  methods: {
    toggleDiscard(id) {
      const index = this.descartesLocal.indexOf(id);
      if (index === -1) {
        // Permitir agregar solo si no se han seleccionado 10 ya
        if (this.descartesLocal.length < 10) {
          this.descartesLocal.push(id);
        }
      } else {
        this.descartesLocal.splice(index, 1);
      }
      // Emitir la nueva lista para que el padre actualice wizardData.descartes
      this.$emit("update:descartes", [...this.descartesLocal]);
    },
    discardTag(stadiumId) {
      const pos = this.descartesLocal.indexOf(stadiumId);
      return pos < 3 ? "GRATIS" : "+6€";
    }
  }
}
</script>

<style scoped>
/* Título principal */
.title-step4 {
  font-size: 1.5rem; /* Más grande */
  font-weight: bold;
  margin-bottom: 0.75rem;
}

/* Subtítulo */
.subtitle-step4 {
  font-size: 1.1rem; /* Un poco más pequeño que el título */
  font-weight: normal;
  margin-bottom: 1.5rem;
  color: #333;
}

.stadiums-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.stadium-item {
  background-color: #eee;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  padding: 10px;
}

.stadium-item.selected {
  background-color: #ffe94d;
}

/* Contenedor para la imagen (4:5) */
.image-container {
  position: relative;
}

/* Imagen 4:5 */
.stadium-image {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 4px;
}

/* Nombre del estadio: se muestra POR FUERA de la imagen */
.stadium-caption {
  margin-top: 6px;
  font-weight: bold;
  font-size: 0.85rem;
}

/* Etiqueta GRATIS / +6€ */
.tag {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #000;
  color: #fff;
  font-size: 0.7rem;
  padding: 2px 4px;
  border-radius: 3px;
}

/* CTA centrados */
.cta-row {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* Botón Atrás: amarillo con letras negras */
.btn-back {
  background-color: #fff176;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

/* Botón Continuar: negro con letras blancas */
.btn-continue {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>
<template>
  <div>
    <!-- Título principal -->
    <h2 class="title-step4">¿A qué estadios no quieres ir?</h2>
    <!-- Subtítulo -->
    <p class="subtitle-step4">Descarta un máximo de cinco destinos... ¡te regalamos el primero!</p>

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
            alt=""
          />
          <!-- Etiqueta GRATIS / +6€ -->
          <div
            v-if="descartesLocal.includes(stadium.id)"
            class="tag"
          >
            {{ discardTag(stadium.id) }}
          </div>
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
    const tagNames = [
      'tag_barcelona', 'tag_sevilla', 'tag_espanyol', 'tag_cadiz',
      'tag_mirandes', 'tag_racingferrol', 'tag_racingsantander', 'tag_valladolid',
      'tag_valencia', 'tag_zaragoza', 'tag_malaga', 'tag_oviedo',
      'tag_sporting', 'tag_leganes', 'tag_getafe', 'tag_athletic',
      'tag_eldense', 'tag_albacete', 'tag_osasuna', 'tag_huesca',
      'tag_celta'
    ];
    return {
      // Copiamos la prop a una variable local para no mutarla directamente
      descartesLocal: [...this.descartes],
      stadiums: tagNames.map((tag, index) => ({
        id: index + 1,
        image: require(`@/assets/tags_stadiums/${tag}.png`)
      })),
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
        // Permitir agregar solo si no se han seleccionado 5 ya
        if (this.descartesLocal.length < 5) {
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
      return pos < 1 ? "GRATIS" : "+5€";
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
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  padding: 0;
}

.stadium-item.selected {
  background-color: transparent;
}

/* Contenedor para la imagen (1:1) */
.image-container {
  position: relative;
  overflow: hidden;
}

/* Imagen 1:1 */
.stadium-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
  transition: filter 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.stadium-item.selected .stadium-image {
  filter: brightness(50%) grayscale(100%);
  transition: filter 0.3s ease;
}

@keyframes shine {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.5); }
  100% { filter: brightness(1); }
}

@keyframes fancy-shine {
  0% {
    filter: brightness(1);
    transform: scale(1);
    box-shadow: none;
  }
  50% {
    filter: brightness(1.2);
    transform: scale(1.03);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
  }
  100% {
    filter: brightness(1);
    transform: scale(1);
    box-shadow: none;
  }
}

.stadium-item:not(.selected) .stadium-image {
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  transform: scale(1);
}
.stadium-item:not(.selected):hover .stadium-image {
  animation: fancy-shine 0.6s ease-in-out;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 35px;
  background-color: #fff;
  color: #000;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stadium-item.selected:hover .tag {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
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
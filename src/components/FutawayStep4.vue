<template>
  <div>
    <h2>Paso 4: ¿A qué estadios no quieres ir?</h2>
    <p>Descarta tres de ellos gratis y paga 6€ por estadio y persona a partir del cuarto.</p>

    <div class="stadiums-grid">
      <div
        v-for="stadium in stadiums"
        :key="stadium.id"
        :class="['stadium-item', { selected: wizardData.descartes.includes(stadium.id) }]"
        @click="toggleDiscard(stadium.id)"
      >
        <span>{{ stadium.name }}</span>
        <div v-if="wizardData.descartes.includes(stadium.id)" class="tag">
          {{ discardTag(stadium.id) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
export default {
  name: "FutawayStep4",
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      stadiums: [
        { id: 1, name: "Estadio 1" },
        { id: 2, name: "Estadio 2" },
        { id: 3, name: "Estadio 3" },
        { id: 4, name: "Estadio 4" },
        { id: 5, name: "Estadio 5" },
        { id: 6, name: "Estadio 6" },
        { id: 7, name: "Estadio 7" },
        { id: 8, name: "Estadio 8" },
        { id: 9, name: "Estadio 9" },
        { id: 10, name: "Estadio 10" },
        { id: 11, name: "Estadio 11" },
        { id: 12, name: "Estadio 12" },
        { id: 13, name: "Estadio 13" },
        { id: 14, name: "Estadio 14" },
        { id: 15, name: "Estadio 15" },
        { id: 16, name: "Estadio 16" },
        { id: 17, name: "Estadio 17" },
        { id: 18, name: "Estadio 18" },
        { id: 19, name: "Estadio 19" },
        { id: 20, name: "Estadio 20" },
        { id: 21, name: "Estadio 21" }
      ]
    }
  },
  methods: {
    toggleDiscard(id) {
      const index = this.wizardData.descartes.indexOf(id);
      if (index === -1) {
        this.wizardData.descartes.push(id);
      } else {
        this.wizardData.descartes.splice(index, 1);
      }
    },
    discardTag(stadiumId) {
      const pos = this.wizardData.descartes.indexOf(stadiumId);
      return pos < 3 ? "GRATIS" : "+6€";
    }
  }
}
</script>

<style scoped>
.stadiums-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 20px;
}
.stadium-item {
  background-color: #eee;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-weight: bold;
}
.stadium-item.selected {
  background-color: #ffe94d;
}
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
</style>
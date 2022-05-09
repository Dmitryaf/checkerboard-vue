<template>
  <div class="flats" :style="getRows">
    <div
      class="flats__row"
      v-for="flatsRow of section.floors"
      :key="flatsRow.floor"
      :style="getCols"
    >
      {{ flatsRow.floor }}
      <div v-for="flat of flatsRow.flats" :key="flat.id" class="flats__col">
        {{ flatsData[flat.id].plan_type }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['flatsData'],
  props: {
    section: { type: Object, require: true },
  },
  data() {
    return {
      style: null,
    };
  },

  computed: {
    getRows() {
      return {
        'grid-template-rows': `repeat(${this.section.floors.length}, 40px)`,
      };
    },

    getCols() {
      return {
        'grid-template-columns': `repeat(${this.section.flats_max + 1}, 1fr)`,
      };
    },
  },

  created() {
    console.log('flats', this.flatsData);
  },
};
</script>

<style lang="scss" scoped>
.flats {
  display: grid;

  &__row {
    display: grid;
  }
}
</style>

<template>
  <v-col cols="4">
    <div class="house">
      <div
        v-for="section of houseData"
        :key="section.id"
        class="house__section"
      >
        <Flats :section="section" />
        <h3 class="house__section-title">{{ section.title }}</h3>
      </div>
    </div>
  </v-col>
</template>

<script>
import Flats from './Flats.vue';
export default {
  props: {
    houseData: { type: Object, require: true },
  },
  created() {
    console.log('houseData', this.houseData);
  },
  components: { Flats },
};
</script>

<style lang="scss" scoped>
.house {
  height: 100%;
}
</style>

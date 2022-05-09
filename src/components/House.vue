<template>
  <div class="house">
    <div
      v-for="(section, index) of housesData"
      :key="section.id"
      class="house__section"
    >
      <Flats :section="section" :section-index="index" />
      <h3 class="house__section-title">{{ section.title }}</h3>
    </div>
  </div>
</template>

<script>
import Flats from './Flats.vue';

export default {
  props: {
    housesData: { type: Object, require: true },
  },
  components: { Flats },

  created() {
    console.log('housesData', this.housesData);
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';
.house {
  display: flex;
  align-items: flex-end;
  height: 100%;
  overflow-y: scroll;
  will-change: scroll-position;

  &__section {
    margin-right: 30px;

    &:first-child {
      & .house__section-title {
        margin-left: calc($flat-size + 10px);
      }
    }
  }

  &__section-title {
    font-weight: 400;
    color: $grey;
  }
}
</style>

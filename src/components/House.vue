<template>
  <div class="house">
    <div
      v-for="(section, index) of housesData"
      :key="section.id"
      :class="`house__section ${getHouseSectionClass(index)}`"
    >
      <div
        v-if="isFirstSection(index)"
        class="house__floors"
        :style="getRows(getHouseMaxFloors.length, $options.FLOOR_ROWS_SIZE)"
      >
        <div
          class="house__floors-row"
          v-for="floor of getHouseMaxFloors"
          :key="floor"
        >
          <div class="house__floors-item">{{ floor }}</div>
        </div>
      </div>
      <Flats :section="section" :section-index="index" />
      <h3 class="house__section-title">{{ section.title }}</h3>
    </div>
  </div>
</template>

<script>
import Flats from '@/components/Flats/Flats.vue';

import useGridTable from '@/composables/useGridTable';

export default {
  props: {
    housesData: { type: Object, require: true },
  },
  FLOOR_ROWS_SIZE: '40px',
  components: { Flats },

  setup() {
    const { getRows } = useGridTable();
    return { getRows };
  },

  computed: {
    getHouseMaxFloors() {
      const sections = [...this.housesData];
      const sortedSection = sections.sort(
        (a, b) => b.floors.length - a.floors.length
      );
      const floors = [];
      const floorsLength = sortedSection[0].floors.length;
      for (let number = 1; number <= floorsLength; number++) {
        floors.push(number);
      }
      return floors.reverse();
    },
  },
  created() {
    // console.log('housesData', this.housesData);
  },

  methods: {
    isFirstSection(index) {
      return index === 0;
    },

    getHouseSectionClass(index) {
      return this.isFirstSection(index) ? 'house__section--with-floors' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.house {
  display: flex;
  align-items: flex-end;
  height: 100%;
  padding: 60px 30px;
  overflow-x: auto;
  overflow-y: hidden;
  will-change: scroll-position;

  &::-webkit-scrollbar {
    position: absolute;
    left: 0;
    width: 8px;
    height: 6px;
    background: $grey;
  }

  &::-webkit-scrollbar-track {
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background: $orange;
    border-radius: 4px;
  }

  &__section {
    margin-right: 50px;

    &:first-child {
      & .house__section-title {
        margin-left: calc($flat-size + $section-gap);
      }
    }

    &--with-floors {
      display: grid;
      grid-template-columns: $flat-size auto;
      gap: 0 $section-gap;
    }
  }

  &__section-title {
    font-weight: 400;
    width: max-content;
    color: $grey;
  }

  &__floors {
    display: grid;

    &-row {
      display: grid;
      align-content: center;
      justify-content: center;
      gap: 10px;
    }

    &-item {
      color: $grey;
      display: flex;
      justify-content: center;
      align-items: center;
      width: $flat-size;
      height: $flat-size;
    }
  }
}
</style>

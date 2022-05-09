<template>
  <div class="flats" :style="getRows">
    <div
      class="flats__row"
      v-for="floors of section.floors"
      :key="floors.floor"
      :style="getCols"
    >
      <div v-if="isFirstSection" class="flats__floor">{{ floors.floor }}</div>
      <div
        v-for="flat of floors.flats"
        :key="flat.id"
        :class="`flats__item ${getFlatClasses(flatsData[flat.id])}`"
      >
        {{ flatsData[flat.id].plan_type }}
      </div>
    </div>
  </div>
</template>

<script>
const FLAT_STATUSES = {
  keysIssued: 'Выданы ключи',
  booking: 'Бронь',
  contract: 'Договор',
};
export default {
  inject: ['flatsData'],
  props: {
    section: { type: Object, require: true },
    sectionIndex: { type: Number, require: true },
    houseFloors: { type: Number, require: true },
  },

  computed: {
    isFirstSection() {
      return this.sectionIndex === 0;
    },

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

  methods: {
    getFlatClasses(flat) {
      const classes = [];
      if (!flat.plan_type) {
        classes.push('flats__item--empty-plan');
      }

      switch (flat.status) {
        case FLAT_STATUSES.keysIssued:
          classes.push('flats__item--issued');
          break;
        case FLAT_STATUSES.booking:
          classes.push('flats__item--booking');
          break;
        case FLAT_STATUSES.contract:
          classes.push('flats__item--contract');
          break;
      }

      return classes.join(' ');
    },
  },

  created() {
    console.log('flats', this.flatsData);
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';
.flats {
  display: grid;

  &__row {
    display: grid;
    align-content: center;
    justify-content: center;
    gap: 10px;
  }

  &__item,
  &__floor {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $flat-size;
    height: $flat-size;
  }

  &__item {
    font-weight: 500;
    color: $white;
    background: $dark-grey;
    cursor: pointer;
    user-select: none;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }

    &--empty-plan {
      background: $light-grey;
    }

    &--issued {
      background: $orange;
    }

    &--booking {
      background: $purple;
    }

    &--contract {
      background: $green;
    }
  }

  &__floor {
    color: $grey;
  }
}
</style>

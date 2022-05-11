<template>
  <div
    class="flats"
    :style="getRows(section.floors.length, $options.FLAT_ROWS_SIZE)"
  >
    <div
      class="flats__row"
      v-for="floors of section.floors"
      :key="floors.floor"
      :style="getCols(section.flats_max, $options.FLAT_COLS_SIZE)"
    >
      <div
        v-for="flat of floors.flats"
        :key="flat.id"
        :class="`flats__item ${getFlatClasses(flatsData[flat.id])}`"
        @click="openDetailModal(flatsData[flat.id])"
      >
        <FlatsDetails
          v-if="flatsData[flat.id]"
          :flatData="flatsData[flat.id]"
        />
        {{ flatsData[flat.id].plan_type }}
      </div>
    </div>
  </div>
</template>

<script>
import FlatsDetails from '@/components/Flats/FlatsDetails';

import useGridTable from '@/composables/useGridTable';

const FLAT_STATUSES = {
  keysIssued: 'Выданы ключи',
  booking: 'Бронь',
  contract: 'Договор',
};

export default {
  inject: ['flatsData', 'modalDetail'],
  components: {
    FlatsDetails,
  },
  props: {
    section: { type: Object, require: true },
    sectionIndex: { type: Number, require: true },
  },
  FLAT_ROWS_SIZE: '40px',
  FLAT_COLS_SIZE: '1fr',

  setup() {
    const { getRows, getCols } = useGridTable();
    return { getRows, getCols };
  },

  methods: {
    getFlatClasses(flat) {
      const classes = [];

      if (!flat.plan_type) {
        classes.push('flats__item--empty-plan');
      }

      if (
        flat.renovation ||
        flat.subsidy ||
        flat.marginal ||
        flat.installment
      ) {
        classes.push('flats__item--with-option');
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

    openDetailModal(flatData) {
      this.modalDetail.data = flatData;
      this.modalDetail.isOpen = true;
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.flats {
  display: grid;
  align-self: self-end;
  margin-bottom: 15px;

  &__row {
    display: grid;
    align-content: center;
    justify-content: center;
    gap: 10px;
  }

  &__item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: $flat-size;
    height: $flat-size;
    font-weight: 500;
    color: $white;
    background: $dark-grey;
    cursor: pointer;
    user-select: none;
    transition: 0.3s;

    &:hover {
      & .flats__details {
        display: block;
      }
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

    &--empty-plan {
      background: $light-grey;
    }

    &--with-option {
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 8px solid red;
        border-right: 8px solid transparent;
        transform: rotate(90deg);
      }
    }
  }
}
</style>

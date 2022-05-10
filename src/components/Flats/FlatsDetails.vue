<template>
  <div class="flats__details">
    <div
      v-for="item of optionsForDisplay"
      :key="item"
      class="flats__details-item"
    >
      {{ `${$options.FLAT_FIELDS[item]}: ${convertValue(flatData[item])}` }}
    </div>
  </div>
</template>

<script>
export default {
  props: { flatData: { type: Object }, options: { type: Object } },
  FLAT_FIELDS: {
    cost: 'Цена (₽)',
    type: 'Тип объекта',
    floor: 'Этаж',
    number: 'Номер квартиры',
    square: 'Площадь объекта (кв.м)',
    plan_type: 'Тип планировки',
    subsidy: 'Cубсидированная',
    marginal: 'Маржинальная',
    renovation: 'C ремонтом',
    installment: 'C рассрочкой',
  },
  data() {
    return {
      optionsForDisplay: [],
    };
  },

  created() {
    this.getTrueOptions(this.options);
  },

  methods: {
    getTrueOptions(options) {
      if (Object.keys(options).length) {
        for (const option in options) {
          if (options[option]) {
            this.optionsForDisplay.push(option);
          }
        }
      }
    },

    convertValue(value) {
      if (typeof value === 'boolean') {
        return 'Да';
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.flats__details {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc($detail-hover-height - 15px);
  padding: 10px;
  width: max-content;
  min-height: $detail-hover-height;
  background: $light-grey;
  z-index: 1;

  &-item {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 5px;
    bottom: -5px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 9px solid $light-grey;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    width: 100%;
    height: 10px;
  }
}
</style>

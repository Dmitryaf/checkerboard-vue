<template>
  <ul class="flats__details">
    <li
      v-for="option of optionsForDisplay"
      :key="option"
      class="flats__details-item"
    >
      {{ `${detailFields[option]}: ${convertValue(flatData[option])}` }}
    </li>
  </ul>
</template>

<script>
import useDetails from '@/composables/useDetails';

export default {
  props: { flatData: { type: Object }, options: { type: Object } },

  setup() {
    const {
      detailFields,
      detailOptions,
      optionsForDisplay,
      getTrueOptions,
      convertValue,
    } = useDetails();
    return {
      detailFields,
      detailOptions,
      optionsForDisplay,
      getTrueOptions,
      convertValue,
    };
  },

  created() {
    this.setOptionsForDisplay();
  },

  methods: {
    setOptionsForDisplay() {
      this.detailOptions.cost = true;
      this.detailOptions.square = true;
      this.getTrueOptions(this.detailOptions);
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

<template>
  <div class="colors-panel">
    <div
      v-for="item of $options.PANEL_ITEM"
      :key="item.title"
      class="colors-panel__item"
    >
      <div
        :class="`colors-panel__item-color colors-panel__item-color--${item.styleClass}`"
      ></div>
      <span class="colors-panel__item-title">{{ item.title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  PANEL_ITEM: [
    { title: 'Выданы ключи', styleClass: 'sales' },
    { title: 'Свободно', styleClass: 'free' },
    { title: 'Бронь', styleClass: 'booking' },
    { title: 'Присутствуют доп. опции', styleClass: 'additional' },
  ],
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables';
.colors-panel {
  display: flex;
  width: max-content;
  align-self: flex-end;
  border-bottom: 1px solid $light-grey;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-self: flex-start;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-right: 10px;

    @media (max-width: 600px) {
      margin: 0 0 10px;
    }

    &-title {
      margin-left: 10px;
    }

    &-color {
      position: relative;
      width: 20px;
      height: 20px;
      border: 1px solid $light-grey;

      &--sales {
        background: $green;
      }

      &--free {
        background: $orange;
      }

      &--booking {
        background: $purple;
      }

      &--additional {
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-top: 8px solid $red;
          border-right: 8px solid transparent;
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>

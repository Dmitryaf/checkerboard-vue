<template>
  <div class="modal-detail__wrap">
    <div class="modal-detail__content">
      <button @click="closeModal" class="btn modal-detail__btn" type="button">
        Закрыть
      </button>
      <h3 class="modal-detail__title">
        Квартира номер: {{ modalData.number }}
      </h3>

      <ul class="modal-detail__list">
        <li
          v-for="option of optionsForDisplay"
          :key="option"
          :class="`modal-detail__item ${getItemClass(option)}`"
        >
          <span class="modal-detail__item-title">{{
            `${detailFields[option]}:`
          }}</span>
          <span class="modal-detail__item-value">{{
            `${convertValue(modalData[option])}`
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const OPTIONS = ['subsidy', 'marginal', 'renovation', 'installment'];
import useDetails from '@/composables/useDetails';

export default {
  inject: ['modalDetail'],
  data() {
    return {
      modalData: this.modalDetail.data,
    };
  },

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

  beforeCreate() {
    document.body.className = 'modal-open';
  },

  created() {
    this.setOptionsForDisplay();
  },

  beforeUnmount() {
    document.body.className = '';
  },

  methods: {
    setOptionsForDisplay() {
      this.detailOptions.cost = true;
      this.detailOptions.status = true;
      this.detailOptions.type = true;
      this.detailOptions.floor = true;
      this.detailOptions.number = true;
      this.detailOptions.square = true;
      this.detailOptions.marginal = true;
      this.detailOptions.renovation = true;
      this.detailOptions.installment = true;
      this.detailOptions.square = true;
      this.getTrueOptions(this.detailOptions);
    },

    closeModal() {
      this.modalDetail.isOpen = false;
      this.modalDetail.data = null;
    },

    getItemClass(option) {
      return OPTIONS.includes(option) ? 'modal-detail__item-additional' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';
.modal-detail {
  &__wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($black, 0.3);
    z-index: 3;
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 2px solid $light-grey;
    width: 500px;
    height: 550px;
    background: $white;
    overflow-y: auto;

    @media (max-width: 600px) {
      width: 90%;
    }

    &::-webkit-scrollbar {
      position: absolute;
      left: 0;
      width: 8px;
      height: 6px;
      background: $grey;
    }

    &::-webkit-scrollbar-thumb {
      background: $orange;
      border-radius: 4px;
    }
  }

  &__btn {
    align-self: flex-end;
    margin-bottom: 20px;
  }

  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  &__list {
    margin-bottom: 30px;
  }

  &__item {
    position: relative;
    font-size: $font-size-16;
    padding-bottom: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid $light-grey;

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      font-weight: 500;
    }

    &-value {
      margin-left: 10px;
    }

    &-additional {
      &:before {
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
</style>

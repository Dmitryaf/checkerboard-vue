<template>
  <div class="board">
    <ModalDetail v-if="modalDetail.isOpen" />
    <ColorsPanel />
    <swiper
      class="swiper-custom"
      :slides-per-view="1"
      :space-between="50"
      :pagination="{ clickable: true }"
      :navigation="true"
      :modules="modules"
      :allowTouchMove="false"
      :autoHeight="true"
    >
      <swiper-slide v-for="house of boardData.houses" :key="house">
        <House :housesData="housesData[house]" />
      </swiper-slide>
      <navigation></navigation>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import { Navigation, Pagination } from 'swiper';

import BoardData from '@/static/data.json';

import House from '@/components/House.vue';
import ModalDetail from '@/components/ModalDetail.vue';
import ColorsPanel from '@/components/ColorsPanel.vue';

export default {
  components: {
    House,
    ModalDetail,
    ColorsPanel,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      boardData: BoardData,
      housesData: {},
      flatsData: BoardData.flats,
      modalDetail: { isOpen: false, data: null },
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination],
    };
  },

  provide() {
    return {
      flatsData: this.flatsData,
      modalDetail: this.modalDetail,
    };
  },

  created() {
    this.getHouseData(this.boardData);
  },

  methods: {
    getHouseData(data) {
      if (data) {
        for (const houseID of data.houses) {
          this.housesData[houseID] = [];
        }
        for (const item of data.entrances) {
          this.housesData[item.house_id].push(item);
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.board {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  max-width: 1400px;
}
</style>

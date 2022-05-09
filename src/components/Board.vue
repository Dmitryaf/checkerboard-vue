<template>
  <div class="board">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      :navigation="true"
      :modules="modules"
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
import { Navigation } from 'swiper';

import BoardData from '../static/data.json';

import House from './House.vue';

export default {
  components: {
    House,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      boardData: BoardData,
      housesData: {},
      flatsData: BoardData.flats,
    };
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },

  provide() {
    return {
      flatsData: this.flatsData,
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
  padding: 20px;
}
</style>

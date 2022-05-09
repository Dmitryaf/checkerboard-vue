<template>
  <v-container>
    <v-row>
      <House
        v-for="house of boardData.houses"
        :houseData="housesData[house]"
        :key="house"
      />
    </v-row>
  </v-container>
</template>
<script>
import BoardData from '../static/data.json';

import House from './House.vue';

export default {
  components: {
    House,
  },
  data() {
    return {
      boardData: BoardData,
      housesData: {},
      flatsData: BoardData.flats,
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
<style scoped lang="scss"></style>

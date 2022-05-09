<template>
  <v-app>
    <v-main>
      <Board />
    </v-main>
  </v-app>
</template>

<script>
import Board from './Board.vue';
export default {
  name: 'App',
  components: {
    Board,
  },
};
</script>

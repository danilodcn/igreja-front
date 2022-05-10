<template>
  <div class="mx-auto">
    <v-card rounded="3">
      <div class="card" v-bind:class="{ left: side == 'left' }">
        <img class="ma-4" :src="churchBody.image" />
        <div class="content">
          <p class="text-subtitle-1">{{ churchBody.name }}</p>
          <p class="text-h6">{{ churchBody.member_type.name }}</p>
          <div class="text-body-1 text" v-html="churchBody.content"></div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IChurchBody } from '../../types/homePage'

export default Vue.extend({
  name: 'ChurchBodyCard',
  props: {
    churchBody: {
      type: Object as Vue.PropType<IChurchBody>,
      required: true,
    },
    side: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}

.card.left {
  flex-direction: row-reverse;
}

.card.left .content {
  text-align: right;
}

img {
  max-height: 250px;
  height: 250px;
}

@media (max-width: 960px) {
  .card,
  .card.left {
    flex-direction: column;
  }
  .content {
    justify-content: center;
    align-items: center;
    justify-items: center;
  }

  .card.left .content,
  .card .content {
    text-align: center;
  }
}
</style>

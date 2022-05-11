<template>
  <v-container class="mx-auto px-0">
    <v-card>
      <v-spacer />
      <v-card-title class="mx-auto text-h4 center">
        {{ pageInfo.title }}
      </v-card-title>
      <v-spacer />

      <v-card-text>
        <v-spacer />

        <div v-html="pageInfo.content" class="text-body-1 content" />

        <v-spacer class="py-4" />

        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          interval="5000"
          style="border-radius: 6px"
        >
          <v-carousel-item
            v-for="(image, index) in pageInfo.images"
            :key="index"
            :src="image.imagehome.image"
            reverse-transition="fade-transition"
            transition="fade-transition"
          />
        </v-carousel>
      </v-card-text>

      <v-spacer class="py-6" />

      <v-card-subtitle class="mx-auto text-h4 center">{{
        pageInfo.body_title
      }}</v-card-subtitle>

      <v-card-text>
        <div v-for="(body, index) in pageInfo.body" :key="index">
          <church-body-card
            :churchBody="body"
            :side="index % 2 ? 'left' : 'right'"
          />
        </div>
      </v-card-text>

      <v-card-subtitle class="mx-auto text-h4 center"
        >Localização</v-card-subtitle
      >

      <v-card-text>
        <div v-html="pageInfo.maps_frame" class="center localization" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ChurchBodyCard from '../components/shared/ChurchBodyCard.vue'
import { HomePageService } from '../services/homePageService'
import { IHomePage } from '../types/homePage'

const homePageService = new HomePageService()

export default Vue.extend({
  components: { ChurchBodyCard },
  name: 'HomePage',
  data() {
    return {
      pageInfo: {} as IHomePage,
    }
  },
  methods: {
    async getHomePageInfo() {
      this.pageInfo = await homePageService.getHomePageInfo()
    },
  },
  created() {
    this.getHomePageInfo()
  },
})
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  text-align: center;
}

.localization {
  height: 100%;
}
</style>

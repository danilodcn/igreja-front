<template>
  <v-container class="mx-auto px-0">
    <v-card>
      <v-card-title class="mx-auto my-10 text-h4 center">
        {{ pageInfo.title }}
      </v-card-title>

      <v-card-text>
        <v-spacer />

        <v-carousel
          v-if="pageInfo.images"
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          interval="15000"
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
        <v-spacer class="py-4" />

        <div class="text-body-1 content" v-html="pageInfo.content" />
      </v-card-text>

      <v-spacer class="py-6" />

      <v-card-subtitle class="mx-auto text-h4 center">{{
        pageInfo.body_title
      }}</v-card-subtitle>

      <v-card-text>
        <div v-for="(body, index) in pageInfo.body" :key="index">
          <church-body-card
            :church-body="body"
            :side="index % 2 ? 'left' : 'right'"
          />
        </div>
      </v-card-text>

      <v-card-subtitle class="mx-auto text-h4 center"
        >Localização</v-card-subtitle
      >
      <v-spacer class="py-6" />
      <v-card-text>
        <div class="center localization" v-html="pageInfo.maps_frame" />
      </v-card-text>
      <v-spacer class="py-6" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ChurchBodyCard from '@/components/shared/ChurchBodyCard.vue'
import { HomePageService } from '@/services/homePageService'
import { IHomePage } from '@/types/homePage'

const homePageService = new HomePageService()

export default Vue.extend({
  name: 'HomePage',
  components: { ChurchBodyCard },
  data() {
    return {
      pageInfo: {} as IHomePage,
    }
  },
  created() {
    this.getHomePageInfo()
  },
  methods: {
    async getHomePageInfo() {
      this.pageInfo = await homePageService.getHomePageInfo()
    },
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

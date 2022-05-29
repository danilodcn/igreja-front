<template>
  <v-container class="mx-auto px-0">
    <v-card>
      <v-card-title class="mx-auto my-10 text-h4 center">
        {{ pageTitle }}
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
            :src="image.image.image"
            reverse-transition="fade-transition"
            transition="fade-transition"
          />
        </v-carousel>
        <v-spacer class="py-6" />

      </v-card-text>

      <div
        v-for="(section, i) in pageInfo.sections"
        :key="i"
        class="mx-2 mx-sm-4 mx-md-6 mx-lg-8"
      >
        <v-card-subtitle :key="`subtitle-${i}`" class="mx-auto text-h4 center">
          {{ section.title }}</v-card-subtitle
        >
        <v-spacer class="py-2" />
        <v-card-text
          :key="`text-${i}`"
          class="text-justify"
          v-html="section.content"
        ></v-card-text>
        <v-spacer class="py-4" />
      </div>

      <v-card-text>
        <div v-for="(body, index) in pageInfo.body" :key="index">
          <church-body-card
            :member="body"
            :side="index % 2 ? 'left' : 'right'"
          />
        </div>
      </v-card-text>
      <v-card-subtitle v-if="pageInfo.maps_frame" class="mx-auto text-h4 center"
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
import { IPage } from '~/types/pages'

const homePageService = new HomePageService()

export default Vue.extend({
  name: 'HomePage',
  components: { ChurchBodyCard },
  data() {
    return {
      pageInfo: {} as IPage,
    }
  },
  computed: {
    pageTitle(this: any) {
      return this.pageInfo?.church?.name || ''
    },
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

<template>
  <div>
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

      <page-section
        v-for="(section, i) in pageInfo.sections"
        :key="`section-${i}`"
        :section="section"
      />

      <church-body-card
        v-for="(body, index) in pageInfo.body"
        :key="index"
        :member="body"
        :side="index % 2 ? 'left' : 'right'"
      />
      <v-card-subtitle v-if="pageInfo.maps_frame" class="mx-auto text-h4 center"
        >Localização</v-card-subtitle
      >
      <v-spacer class="py-6" />
      <v-card-text>
        <div class="center localization" v-html="pageInfo.maps_frame" />
      </v-card-text>
      <v-spacer class="py-6" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ChurchBodyCard from '@/components/shared/ChurchBodyCard.vue'
import PageSection from '@/components/shared/PageSection.vue'
import { IPage } from '@/types/pages'

@Component({
  name: 'PageCard',
  components: { ChurchBodyCard, PageSection },
})
export default class PageCard extends Vue {
  @Prop({ required: true }) pageInfo!: IPage

  get pageTitle() {
    return this.pageInfo?.church?.name || ''
  }
}
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

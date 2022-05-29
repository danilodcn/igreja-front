<template>
  <v-card class="mx-2 mx-sm-4 mx-md-6 mx-lg-8" elevation="0">
    <v-card-subtitle class="mx-auto text-h4 center">
      {{ section.title }}</v-card-subtitle
    >
    <v-spacer class="py-2" />
    <v-card-text
      class="text-justify text-body-1"
      v-html="section.content"
    ></v-card-text>
    <v-spacer class="py-4" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ISection } from '@/types/pages'

@Component({
  name: 'PageSection',
})
export default class PageSection extends Vue {
  @Prop({ required: true }) section!: ISection
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>

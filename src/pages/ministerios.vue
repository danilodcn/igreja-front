<template>
  <v-container class="mx-auto px-0">
    <page-card v-if="pageInfo" :page-info="pageInfo" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { HomePageService } from '@/services/homePageService'
import { IPage } from '@/types/pages'

const homePageService = new HomePageService()

@Component({
  name: 'PageMinisterios',
})
export default class extends Vue {
  pageInfo = {} as IPage

  async getHomePageInfo() {
    this.pageInfo = await homePageService.getHomePageInfo({ type: 2 }) // 1 is index pages
  }

  created() {
    this.getHomePageInfo()
  }
}
</script>

<template>
  <v-container class="mx-auto px-0">
    <page-card v-if="pageInfo" :page-info="pageInfo" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Mutation } from 'nuxt-property-decorator'
import { HomePageService } from '@/services/homePageService'
import { IPage } from '@/types/pages'
import { MutationTypes, ToggleLoading } from '@/store'

const homePageService = new HomePageService()

@Component({
  name: 'PageMinisterios',
})
export default class extends Vue {
  pageInfo = {} as IPage

  @Mutation(MutationTypes.TOGGLE_LOADING) toggleLoading: ToggleLoading
  async getHomePageInfo() {
    this.pageInfo = await homePageService.getHomePageInfo({ type: 2 }) // 1 is index pages
  }

  async created() {
    this.toggleLoading(true)
    await this.getHomePageInfo()
    this.toggleLoading(false)
  }
}
</script>

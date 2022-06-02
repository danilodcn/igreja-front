<template>
  <v-container class="mx-auto px-0">
    <page-card v-if="pageInfo" :page-info="pageInfo" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'
import PageCard from '@/components/PageCard.vue'
import { HomePageService } from '@/services/homePageService'
import { IPage } from '@/types/pages'
import { MutationTypes, ToggleLoading } from '@/store'

const homePageService = new HomePageService()

@Component({
  name: 'HomePage',
  components: { PageCard },
})
export default class IndexPage extends Vue {
  pageInfo = {} as IPage

  @Mutation(MutationTypes.TOGGLE_LOADING) toggleLoading: ToggleLoading

  async created() {
    await this.getHomePageInfo()
  }

  async getHomePageInfo() {
    this.toggleLoading(true)
    this.pageInfo = await homePageService.getHomePageInfo({ type: 1 }) // 1 is index pages
    this.toggleLoading(false)
  }
}
</script>

<template>
  <v-container class="mx-auto px-0">
    <page-card v-if="pageInfo" :page-info="pageInfo" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PageCard from '~/components/PageCard.vue'
import { HomePageService } from '@/services/homePageService'
import { IPage } from '~/types/pages'

const homePageService = new HomePageService()

export default Vue.extend({
  name: 'HomePage',
  components: { PageCard },
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
      this.pageInfo = await homePageService.getHomePageInfo({ type: 0 }) // 0 is index pages
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

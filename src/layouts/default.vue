<template>
  <v-app light class="app">
    <v-main>
      <v-container class="mt-0 pt-0 mb-4">
        <v-container fluid class="main">
          <header-nav />
          <main-loading />
          <main-dialog />
          <main-alert style="display: none" />
          <Nuxt />
          <div class="space" />
          <footer-nav />
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import HeaderNav from '@/components/nav/Header.vue'
import FooterNav from '@/components/nav/Footer.vue'
import MainLoading from '@/components/main/Loading.vue'
import MainDialog from '@/components/main/Dialog.vue'
import MainAlert from '@/components/main/Alert.vue'

@Component({
  name: 'DefaultLayout',
  components: {
    FooterNav,
    HeaderNav,
    MainLoading,
    MainDialog,
    MainAlert,
  },
})
export default class IndexLayout extends Vue {}
</script>

<style></style>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 0;
}
.content {
  margin-bottom: auto;
}

.space {
  height: 100%;
  width: 100%;
  margin: auto;
  padding: auto;
  min-height: 2rem;
}
</style>

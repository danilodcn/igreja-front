<template>
  <v-app light class="app">
    <v-main>
      <v-container fluid class="main">
        <header-nav />
        <Nuxt />
        <div class="space" />
        <footer-nav />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import HeaderNav from '@/components/nav/Header.vue'
import FooterNav from '@/components/nav/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    HeaderNav,
    FooterNav,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

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
}
</style>

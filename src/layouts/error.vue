<template>
  <v-app light>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
      <v-icon dark> </v-icon>
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Página Principal </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  methods: {
    cal(): string {
      return this.pageNotFound
    },
  },
  data() {
    return {
      pageNotFound: '404 página não encontrada',
      otherError: 'Ocorreu um erro!',
    }
  },
  head(this: any) {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

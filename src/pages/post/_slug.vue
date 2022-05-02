<template>
  <v-container class="max-width"> o slug é {{ slug }} </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PostListPage',
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
})
</script>

<template>
  <v-card outlined tile>
    {{ post.resume }}
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { IPost } from '~/src/types/posts'

export default Vue.extend({
  name: 'PostCard',
  props: {
    post: {
      type: Object as Vue.PropType<IPost>,
      required: true,
    },
  },
})
</script>

<style scoped></style>

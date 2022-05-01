<template>
  <v-card outlined class="post-content" :to="'/conteudo/' + post.slug">
    <img :src="post.image" :alt="post.title" />
    <v-card-title>{{ post.title }}</v-card-title>
    <v-divider class="mx-2"></v-divider>
    <v-card-text>
      {{ post.resume }}
    </v-card-text>
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

<style scoped>
.main {
  display: flex;
}
.post-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem 3rem;
  max-width: 30rem;
  margin: auto;
}
.post-content:hover {
  opacity: 0.7;
}
img {
  max-width: 100%;
  border-radius: 10px;
}
</style>

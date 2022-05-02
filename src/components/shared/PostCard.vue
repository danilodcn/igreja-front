<template>
  <v-card outlined class="post-content" :to="'/post/' + post.slug">
    <img :src="post.image" :alt="post.title" />
    <v-card-title>{{ post.title }}</v-card-title>
    <v-divider class="mx-2"></v-divider>
    <v-card-text>
      {{ post.resume }}
    </v-card-text>
    <v-divider class="mx-2"></v-divider>
    <div>
      <div class="date">
        <v-icon color="primary">mdi-calendar</v-icon>
        <p>{{ getDate(post.publish_date) }}</p>
      </div>
    </div>
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
  methods: {
    getDate(date: string) {
      const _date = new Date(date)
      const monName = new Array(
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'Maio',
        'junho',
        'agosto',
        'outubro',
        'novembro',
        'dezembro'
      )
      const day = _date.getDate()
      const month = monName[_date.getMonth()]
      const year = _date.getFullYear()

      const hour = _date.getHours()
      const minutes = _date.getMinutes()

      const _minutes = minutes > 10 ? minutes : `0${minutes}`
      return `${day} de ${month} de ${year} às ${hour}:${_minutes}`
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
hr {
  margin-top: auto;
  border: solid 1px var(--primary-color);
  width: 95%;
}
.date * {
  margin: 0;
}
.date {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
  gap: 0.2rem;
  width: 100%;
}
</style>

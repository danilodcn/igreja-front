<template>
  <v-card v-bind="getProps()" outlined class="post-content" elevation="4">
    <v-img
      class="pa-1"
      :src="post.image"
      :alt="post.title"
      width="100%"
      aspect-ratio="1.2"
      contain
    />
    <v-card-title class="text-center text-h6 lighten-2">{{
      post.title
    }}</v-card-title>
    <v-divider class="mx-2"></v-divider>
    <v-card-text class="text-justify text-body-2">
      {{ post.resume }}
    </v-card-text>
    <v-divider class="mx-2"></v-divider>
    <div>
      <div class="date">
        <v-icon color="primary" class="pr-2">mdi-calendar</v-icon>
        <p>{{ getDate(post.publish_date) }}</p>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { IPost } from '@/types/posts'

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
      const monName = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'Maio',
        'junho',
        'agosto',
        'outubro',
        'novembro',
        'dezembro',
      ]
      const day = _date.getDate()
      const month = monName[_date.getMonth()]
      const year = _date.getFullYear()

      const hour = _date.getHours()
      const minutes = _date.getMinutes()

      const _minutes = minutes > 10 ? minutes : `0${minutes}`
      return `${day} de ${month} de ${year} às ${hour}:${_minutes}`
    },
    getProps() {
      return this.$attrs
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
  /* border-radius: 10px; */
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

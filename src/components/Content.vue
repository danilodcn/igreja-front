<template>
  <v-container fluid>
    <v-col sm="9" md="6" class="px-0 px-sm-10 mx-auto py-16">
      <v-row align-content="center" align="center" class="center">
        <v-text-field
          v-model="search"
          class="mx-5"
          label="Busca"
          placeholder="Buscar Evento"
          append-icon="mdi-magnify"
          @keyup.stop.native="handleKeyUp"
        />
        <v-btn color="primary" text align-content="center" class="mx-auto">
          Pesquisar
        </v-btn>
      </v-row>
    </v-col>

    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3">
        <categories
          v-model="selectedCategories"
          :categories="categories"
        ></categories>
      </v-col>

      <v-col>
        <v-card elevation="0">
          <v-row>
            <v-col
              v-for="(post, index) in content"
              :key="`post.slug-${index}`"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <post-card :post="post" :to="`/${baseUrl}/${post.slug}`" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-container class="my-10">
      <v-row class="my-auto" justify="center">
        <span class="my-auto">{{ textInPagination }}</span>
        <v-pagination
          v-model="pages.current"
          class="my-4"
          circle
          :length="pages.maxPage"
          :total-visible="7"
          >Minha</v-pagination
        >
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'
import Categories from '@/components/shared/Categories.vue'
import PostCard from '@/components/shared/PostCard.vue'
import { IContent, ICategory, IPaginationInfo } from '@/types/content'

const pages: IPaginationInfo = {
  current: 1,
  pageSize: 6,
  maxPage: 50,
}

@Component({
  name: 'Content',
  components: {
    PostCard,
    Categories,
  },
})
export default class EventsIndex extends Vue {
  @Prop() content!: IContent[]
  @Prop() categories!: ICategory[]
  @Prop({ default: 'post' }) baseUrl!: string

  @VModel() selectedCategories!: ICategory[]

  search = null

  pages: IPaginationInfo = pages

  get textInPagination() {
    const plural = this.pages.maxPage > 1 ? 's' : ''
    const text = `${this.pages.current} de ${this.pages.maxPage} página${plural}`
    return text
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.key.toLowerCase() === 'enter') {
      return 0
    }
  }

  created() {
    const currentPage = this.$route.query.page?.toString()
    if (currentPage) {
      this.pages.current = Number(currentPage)
    }
  }
}
</script>

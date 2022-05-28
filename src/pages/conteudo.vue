<template>
  <div>
    <v-alert v-model="alert.active" :type="alert.type" dismissible>{{
      alert.message
    }}</v-alert>
    <v-col sm="9" md="6" class="pa-10 mx-auto">
      <v-row align-content="center" align="center" class="center">
        <v-text-field
          v-model="search"
          label="Buscar"
          placeholder="Estudo de células"
          align-content="center"
          clearable
          class="mx-5"
        ></v-text-field>
        <v-btn
          color="primary"
          align-content="center"
          class="mx-auto"
          @click="getCategories()"
          >Pesquisar</v-btn
        >
      </v-row>
    </v-col>

    <v-row class="content">
      <v-col class="categories-list">
        <v-container>
          <v-card hidden class="pa-0 py-0">
            <v-card-title color="text_normal">
              <span class="text-h6 secondary-text" align-items="center"
                >Categorias</span
              >
              <v-spacer />
              <v-btn color="primary" @click="handleFilter()"> Filtrar </v-btn>
            </v-card-title>
            <v-list rounded border-radius="4px">
              <v-list-item-group v-model="selectedCategories" multiple>
                <template v-for="(category, i) in categories">
                  <v-divider v-if="!category" :key="`divider-${i}`"></v-divider>

                  <v-list-item
                    v-else
                    :key="`item-${i}`"
                    :value="category.id"
                    active-class="deep-purple--text text--accent-4"
                  >
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="deep-purple accent-4"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title
                          class="secondary-text"
                          v-text="category.name"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-container>
      </v-col>
      <v-col class="posts-list">
        <div v-for="post in posts" :key="post.slug" class="post">
          <v-container class="mx-auto">
            <post-card :post="post" />
          </v-container>
        </div>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
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
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostCard from '@/components/shared/PostCard.vue'
import { ICategory, IPaginationInfo, IPost, IPostDTO } from '@/types/posts'
import { PostService } from '@/services/postsService'
import { PageHelper } from '@/helpers/pages'
import { alertDefault } from '@/types/utils'

const pages: IPaginationInfo = {
  current: 1,
  pageSize: 6,
  maxPage: 0,
  count: 0,
  pages: [],
}

const postService = new PostService()

export default Vue.extend({
  name: 'ContentPage',
  components: {
    PostCard,
  },
  data() {
    return {
      search: '',
      pages,
      alert: alertDefault,
      posts: {} as IPost[],
      selectedCategories: [] as number[],
      categories: [] as ICategory[],
    }
  },
  computed: {
    textInPagination(this: any) {
      const plural = this.pages.maxPage > 1 ? 's' : ''
      const text = `${this.pages.current} de ${this.pages.maxPage} página${plural}`
      return text
    },
  },
  beforeMount() {
    const data: IPostDTO = {
      current: this.pages.current,
      pageSize: this.pages.pageSize,
    }
    this.getCategories()
    this.getPosts(data)
  },
  created() {
    this.$watch(
      () => this.pages.current,
      () => {
        const data: IPostDTO = {
          current: this.pages.current,
          pageSize: this.pages.pageSize,
          categories: this.selectedCategories,
        }
        // this.getCategories()
        this.getPosts(data)
      }
    )
  },
  methods: {
    async getCategories() {
      try {
        this.categories = await postService.getCategories()
      } catch (error) {
        this.alert = {
          active: true,
          message: 'Erro ao carregar as Categorias',
          type: 'error',
        }
      }
    },
    async getPosts(data: IPostDTO) {
      const result = await postService.getPosts(data)
      this.posts = result.posts

      const helper = new PageHelper()
      this.pages = helper.getPagination({
        current: data.current,
        pageSize: data.pageSize,
        count: result.count,
      })
    },
    async handleFilter() {
      const data: IPostDTO = {
        current: 1,
        pageSize: this.pages.pageSize,
        categories: this.selectedCategories,
      }
      await this.getPosts(data)
    },
  },
})
</script>
<style scoped>
.container,
.center {
  margin: auto;
  padding: auto;
}
.category {
  color: var(--text);
}
/* div.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
div.search > div {
  max-width: 400px;
} */

.content {
  display: flex;
  flex-direction: column;
}

.posts-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.posts-list div {
  max-width: 100%;
}

@media (min-width: 500px) {
  .posts-list {
    grid-template-columns: 1fr 1fr;
    gap: 1rem 0rem;
  }
}

@media (min-width: 680px) {
  .posts-list {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem 0rem;
  }
}

@media (min-width: 960px) {
  .posts-list {
    grid-template-columns: 1fr 1fr;
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 7fr;
  }
}
@media (min-width: 1264px) {
  .posts-list {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}
</style>

<template>
  <div>
    <v-alert :type="alert.type" dismissible v-model="alert.active">{{
      alert.message
    }}</v-alert>
    <div class="pa-8 search">
      <v-text-field
        v-model="search"
        label="Buscar"
        placeholder="Estudo de células"
        align-content="center"
        clearable
      ></v-text-field>
      <v-col align-content="center" align="center" class="center">
        <v-btn
          color="primary"
          align-content="center"
          class="center"
          @click="getCategories()"
          >Pesquisar</v-btn
        >
      </v-col>
      <!-- <v-spacer /> -->
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <v-card hidden class="pa-0 py-0">
            <v-card-title color="text_normal">
              <span class="text-h6 secondary-text" align-items="center"
                >Categorias</span
              >
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
                    <template v-slot:default="{ active }">
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
        </v-col>
        <v-col>
          <post-card v-for="post in posts" :post="post" :key="post.slug" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostCard from '../components/shared/PostCard.vue'
import { ICategory, IPaginationInfo, IPost, IPostDTO } from '../types/posts'
import { CategoryService, PostService } from '../services/postsService'

interface IAlert {
  message?: string
  type?: 'error' | 'info'
  active: boolean
}

const pages: IPaginationInfo = {
  current: 0,
  pageSize: 6,
  maxPage: 0,
  count: 0,
  pages: [],
}

const alert: IAlert = {
  active: false,
}

export default Vue.extend({
  name: 'ContentPage',
  components: {
    PostCard,
  },
  data() {
    return {
      search: '',
      alert,
      pages,
      posts: {} as IPost[],
      selectedCategories: [] as number[],
      categories: [] as ICategory[],
    }
  },
  methods: {
    async getCategories() {
      try {
        this.categories = await new CategoryService().getAll()
      } catch (error) {
        console.log(error)
        this.alert = {
          active: true,
          message: 'Erro ao carregar as Categorias',
          type: 'error',
        }
      }
    },
    async getPosts(data: IPostDTO) {
      const service = new PostService()
      this.posts = await service.get(data)
      this.pages.count = service.count
    },
  },
  beforeMount() {
    const data: IPostDTO = {
      current: 1,
      pageSize: this.pages.pageSize,
    }
    this.getCategories()
    this.getPosts(data)
  },
})
</script>
<style scoped>
.center {
  margin: auto;
  padding: auto;
}
.category {
  color: var(--text);
}
div.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
div.search > div {
  max-width: 400px;
}
</style>

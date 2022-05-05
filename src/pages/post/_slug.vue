<template>
  <v-container class="max-width">
    <v-spacer class="my-8" />
    <v-img
      :src="post.image"
      :alt="post.title"
      outlined
      rounded
      max-height="400px"
    >
    </v-img>
    <v-spacer class="my-4" />
    <v-card-text>
      <span class="text-h4">{{ post.title }}</span>
    </v-card-text>
    <v-row>
      <v-col cols="6" v-if="post.author">
        <span>Por {{ getAuthorName }}</span>
      </v-col>
      <v-col cols="6">
        <v-row>
          <a :href="post.document" target="black">
            <v-btn color="primary" class="mx-2 my-auto">
              <v-icon>mdi-download</v-icon>
              Baixar
            </v-btn>
          </a>
          <v-btn color="primary" class="mx-2 my-auto">
            <v-icon>mdi-plus</v-icon>
            Salvar
          </v-btn>
          <share-dialog>
            <v-icon>mdi-share-variant</v-icon>
            Compartilhar
          </share-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-spacer />
    <v-col>
      <v-spacer class="my-4" />

      <div v-html="post.content" />
      <v-spacer class="my-4" />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ShareDialog from '../../components/shared/ShareDialog.vue'
import { downloadFile } from '../../helpers/download-file'
import { PostService } from '../../services/postsService'
import { IAuthor, IPostDetail } from '../../types/posts'

export default Vue.extend({
  name: 'PostListPage',
  data() {
    return {
      slug: this.$route.params.slug,
      post: {} as IPostDetail,
      shareDialog: false,
    }
  },
  computed: {
    getAuthorName(this: any) {
      const author: IAuthor = this.post ? this.post.author : undefined
      return author.name ? author.name : ' - '
    },
  },
  components: {
    ShareDialog,
  },
  methods: {
    async getPost() {
      const service = new PostService()
      this.post = await service.getDetail(this.slug)
    },
    downloadFile() {
      const url = this.post?.document ? this.post?.document : ''
      const data = {
        url,
        label: 'documento.pdf',
      }
      if (url != '') {
        downloadFile(data)
      }
    },
  },
  beforeMount() {
    this.getPost()
  },
})
</script>

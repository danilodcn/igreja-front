<template>
  <v-container class="mx-auto px-0">
    <v-card>
      <v-card-title class="text-center mx-auto">Livros</v-card-title>
      <v-card-actions>
        <v-container>
          <div class="selection">
            <v-select
              v-model="bookName"
              :items="books"
              label="Livro"
              item-text="name"
              filled
            >
              <template #item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="data.item.group"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-select>

            <v-select
              :disabled="numberOfChapters == null"
              :items="generateRange(numberOfChapters)"
              label="Capítulo"
              filled
            ></v-select>

            <v-select
              :disabled="numberOfChapters == null"
              :items="generateRange(numberOfChapters)"
              label="Versículo"
              filled
            ></v-select>
          </div>

          {{ selectedBook }}
        </v-container>
      </v-card-actions>
      <v-card-text> texto </v-card-text>
    </v-card>

    <v-col>
      <v-btn color="primary" @click="getBook()">Books</v-btn>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { State, namespace } from 'vuex-class'
import BookList from '@/components/bible/BookList.vue'
import { IBibleState, BibleActionsTypes } from '@/store/bible'
import { IBook } from '~/types/bible'
import bibleService from '~/services/bibleService'

const bibleState = namespace('bible')

@Component({
  name: 'BibleIndexPage',
  components: { BookList },
})
export default class extends Vue {
  @State bible!: IBibleState

  @bibleState.Action(BibleActionsTypes.TOGGLE_DIALOG) closeBible!: Function
  @bibleState.Action(BibleActionsTypes.GET_USER) getUser!: Function
  @bibleState.Action(BibleActionsTypes.GET_BOOK) getBooks!: Function

  @Watch('bible')
  onRouterChange(val: string[]) {
    console.log(val)
  }

  log() {
    console.log('aqui')
  }

  books: IBook[] = []
  bookName = null as string

  async getBook(book = '') {
    this.books = await bibleService.getBook(book)
  }

  get bookNames() {
    const books = this.books.map((book) => book.name)
    return books
  }

  get selectedBook() {
    return this.books?.find((item) => item.name === this.bookName)
  }

  get numberOfChapters() {
    return this.selectedBook?.chapters
  }

  generateRange(n: number) {
    const array = Array.from(Array(n).keys())
    return array.map((item) => item + 1)
  }

  created() {
    this.getBook()
  }
}
</script>

<style scoped>
.buttons {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.buttons::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  padding: 5px 30px 25px 30px !important;
  text-align: justify;
  text-indent: 10px;
  margin-top: 5px;
  max-height: 240px;
  overflow: scroll;
}

.selection {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: .5rem
}
</style>

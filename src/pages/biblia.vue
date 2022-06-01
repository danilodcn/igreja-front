<template>
  <v-container class="mx-auto px-0">
    <v-card>
      <v-card-title class="text-center mx-auto"></v-card-title>

      <v-card-actions>
        <v-container>
          <v-col cols="12" class="mx-auto">
            <div class="selection">
              <v-select
                v-model="versionName"
                :items="versions"
                label="Versão"
                item-text="version"
                filled
              >
                <template #item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="data.item.version"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="data.item.description"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-select>
              <v-select
                v-model="bookName"
                :items="books"
                label="Livro"
                item-text="name"
                filled
              >
                <template #item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
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
                v-model="chapterNumber"
                :disabled="numberOfChapters == null"
                :items="generateRange(numberOfChapters)"
                label="Capítulo"
                filled
              ></v-select>
            </div>
          </v-col>

          <v-card v-if="chapter">
            <v-card-subtitle class="subtitle">
              <v-btn
                color="primary"
                text
                icon
                large
                :disabled="chapterNumber <= 1"
                @click="handleBntClick(-1)"
              >
                <v-icon>mdi-arrow-left-drop-circle</v-icon>
              </v-btn>

              <span class="mx-auto text-center text-h4 text-md-h3">
                {{ chapter.book.name + ' ' + chapter.chapter.number }}
              </span>

              <v-btn
                color="primary"
                text
                icon
                large
                :disabled="chapterNumber >= selectedBook.chapters"
                @click="handleBntClick(+1)"
              >
                <v-icon>mdi-arrow-right-drop-circle</v-icon>
              </v-btn>
            </v-card-subtitle>
            <v-divider class="py-3"></v-divider>
            <v-card-text>
              <v-list-item-group>
                <v-list-item
                  v-for="verse in chapter.verses"
                  :key="`${verse.number}-${chapter.book.abbrev}-${chapterNumber}`"
                  color="primary"
                  class="mx-2 my-2"
                  @click="handleSnackbar(verse)"
                >
                  <span class="verse-number verse text-subtitle-1">{{
                    verse.number
                  }}</span>
                  <span class="text-body-1 text-justify ml-6">{{
                    verse.text
                  }}</span>
                </v-list-item>
              </v-list-item-group>
            </v-card-text>
          </v-card>
        </v-container>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="snackbar.active"
      max-width="200"
      :timeout="snackbar.timeout"
    >
      <span class="text-center">
        {{ snackbar.text }}
      </span>

      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar.active = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { State, namespace } from 'vuex-class'
import BookList from '@/components/bible/BookList.vue'
import { IBibleState, BibleActionsTypes } from '@/store/bible'
import { IBook, IChapter, IVerse, IVersion } from '@/types/bible'
import { versionsDescriptionHelper } from '@/helpers/bible-versions'

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

  @Watch('bookName')
  onBookNameChange() {
    const selectedBook = this.selectedBook
    if (selectedBook.chapters < this.chapterNumber) {
      this.chapterNumber = 1
    }
  }

  @Watch('versionName')
  @Watch('bookName')
  @Watch('chapterNumber')
  onBookBibleChange() {
    if (
      this.versionName !== null &&
      this.versionName !== null &&
      this.chapterNumber !== null
    ) {
      this.handleChapter()
    }
  }

  snackbar = {
    active: false,
    text: 'Meu',
    timeout: 2000,
  }

  books: IBook[] = []
  versions: IVersion[] = []
  bookName = null as string
  versionName = null as string
  chapterNumber = 1 as number
  chapter = null as IChapter

  get bookNames() {
    const books = this.books?.map((book) => book.name)
    return books
  }

  get selectedBook() {
    return this.books?.find((item) => item.name === this.bookName)
  }

  get numberOfChapters() {
    return this.selectedBook?.chapters
  }

  async getBook(book = '') {
    this.books = await bibleService.getBook(book)
    this.bookName = this.books[0].name
  }

  async getVersions() {
    const versions = await bibleService.getVersions()
    this.versions = versionsDescriptionHelper.getVersions(versions)
    this.versionName = versions[0]
  }

  handleBntClick(value: number) {
    const res = this.chapterNumber + value
    if (res > 0 && res <= this.selectedBook.chapters) {
      this.chapterNumber = res
    }
  }

  handleSnackbar(verse: IVerse) {
    const text = `${verse.number} - ${verse.text}`
    const clipboardData = navigator.clipboard
    let snackbarText = 'Erro ao copiar o versiculo'
    if (clipboardData !== undefined) {
      clipboardData.writeText(text)
      snackbarText = 'Copiado'
    }

    this.snackbar.active = true
    this.snackbar.text = snackbarText
  }

  handleChapter() {
    const selectedBook = this.selectedBook
    if (selectedBook) {
      const abbrev = this.selectedBook.abbrev.pt
      this.getChapter(this.versionName, abbrev, this.chapterNumber)
    }
  }

  async getChapter(version: string, abbrev: string, chapter: number) {
    this.chapter = await bibleService.getChapter(version, abbrev, chapter)
  }

  generateRange(n: number) {
    const array = Array.from(Array(n).keys())
    return array.map((item) => item + 1)
  }

  created() {
    this.getVersions()
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
  grid-template-columns: 1fr 2fr 1fr;
  gap: 0.5rem;
}

.subtitle {
  display: flex;
}
</style>

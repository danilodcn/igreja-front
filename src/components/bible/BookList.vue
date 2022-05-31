<template>
  <v-card elevation="4" class="ma-2">
    <v-card-title>Livros</v-card-title>
    <v-card-actions>
      <div class="buttons">
        <div v-for="(book, i) in booksList" :key="i" class="button">
          <v-btn>{{ book }}</v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { VBtn } from 'vuetify/lib'
import { BibleGettersTypes, IBibleState } from '@/store/bible'

const bibleState = namespace('bible')

@Component({
  name: 'BookList',
  components: {
    VBtn,
  },
})
export default class BookList extends Vue {
  @bibleState.State((state: IBibleState) => state.bible.books) books
  @bibleState.Getter(BibleGettersTypes.GET_ALL_BOOKS) booksList!: string[]
}
</script>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>

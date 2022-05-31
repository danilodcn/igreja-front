<template>
  <v-dialog
    :value="bible.dialog.active"
    max-width="800"
    max-height="700"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="info-button"
        color="primary"
        fab
        small
        text
        v-bind="attrs"
        v-on="on"
      >
        <slot />
      </v-btn>
    </template>
    <v-card class="body d-flex flex-column">
      <v-card-actions class="text-subtitle-1">
        <v-col>
          <v-row align="center">
            <p class="title my-auto">
              {{ bible.dialog.title }}
            </p>
            <v-spacer></v-spacer>
            <v-btn fab small text color="red" @click="closeBible()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-card-actions>
      <v-spacer></v-spacer>
      <v-card-text class="text-body-1 content">
        <h1>Livros</h1>
        {{ $store.state.bible.bible }}
      </v-card-text>

      <component :is="mainComponent" v-bind="mainComponentProps" />

      <v-card-actions>
        <v-btn color="primary" @click="getUser()">Click</v-btn>
        <v-btn color="primary" @click="getBooks()">Books</v-btn>
        <v-btn color="primary" @click="log()">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import BookList from './BookList.vue'
import {
  IBibleState,
  BibleActionsTypes,
  BibleGettersTypes,
} from '@/store/bible'

const bibleState = namespace('bible')

@Component({
  name: 'MainDialog',
  components: {
    BookList,
  },
})
export default class InfoDialog extends Vue {
  mainComponent = 'BookList'
  mainComponentProps = []

  @State bible!: IBibleState

  @bibleState.Action(BibleActionsTypes.TOGGLE_DIALOG) closeBible!: Function
  @bibleState.Action(BibleActionsTypes.GET_USER) getUser!: Function
  @bibleState.Action(BibleActionsTypes.GET_BOOK) getBooks!: Function

  @bibleState.Getter(BibleGettersTypes.GET_ALL_BOOKS) books!: string[]

  @Watch('bible')
  onRouterChange(val: string[]) {
    console.log(val)
  }

  log() {
    console.log('aqui')
  }

  created() {}
}
</script>

<style lang="scss" scoped>
.title {
  max-width: 90%;
}
.text-subtitle-1 {
  background-color: #f7f7f7;
}
.content {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.content::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.content {
  padding: 5px 30px 25px 30px !important;
  text-align: justify;
  text-indent: 10px;
  margin-top: 5px;
  max-height: 240px;
  overflow: scroll;
}
</style>

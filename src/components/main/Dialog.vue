<template>
  <v-dialog
    v-model="dialog.active"
    :persistent="dialog.persistent"
    max-width="290"
  >
    <v-card>
      <v-card-actions>
        <v-card-title class="text-h5 lighten">
          {{ dialog.title }}
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="dialog.bntClose"
          fab
          small
          text
          color="red"
          @click="dialog.active = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text>{{ dialog.msg }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { IRootState, IDialog } from '@/store/types'

@Component({})
export default class MainDialog extends Vue {
  @State((state: IRootState) => state.dialog) dialog!: IDialog
}
</script>

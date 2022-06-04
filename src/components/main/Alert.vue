<template>
  <v-alert
    :value="alert.active"
    :type="alert.type"
    :dismissible="alert.dismissible"
    :dense="alert.dense"
    :outlined="alert.outlined"
    :border="alert.border"
    :icon="alert.icon"
    class="my-2"
  >
    <div class="text-h6">
      {{ alert.title }}
    </div>
    <div>
      {{ alert.text }}
    </div>
    <v-btn
      v-if="alert.btnClose"
      color="primary"
      dark
      @click="alert.active = false"
    >
      Reset
    </v-btn>
  </v-alert>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { IRootState, IAlert } from '@/store/types'

@Component({})
export default class MainDialog extends Vue {
  @State((state: IRootState) => state.alert) alert!: IAlert
}
</script>

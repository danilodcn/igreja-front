<template>
  <div class="text-center">
    <v-overlay :value="loading">
      <div class="content">
        <v-progress-circular indeterminate size="80" />
        <span class="text-body-1 my-2">Carregando ...</span>
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'

@Component({ name: 'MainLoading' })
export default class Loading extends Vue {
  @State loading!: boolean
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>

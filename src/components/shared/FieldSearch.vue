<template>
  <v-row align-content="center" align="center" class="center">
    <v-text-field
      class="mx-5"
      v-bind="getProps"
      :value="value"
      @input="handleInput"
    ></v-text-field>
    <slot />
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  name: 'FieldSearch',
})
export default class FieldSearch extends Vue {
  value = null

  get getProps() {
    const attrs = {
      label: 'Buscar',
      placeholder: '',
      'align-content': 'center',
      clearable: true,
    }
    return {
      ...attrs,
      ...this.$attrs,
    }
  }

  handleInput(input) {
    this.$emit('input', input)
  }
}
</script>

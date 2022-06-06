<template>
  <v-card elevation="4" class="pa-2">
    <v-card-title color="text-center">
      <v-row align-content="space-between">
        <span class="text-h5" align-items="center">Categorias</span>
        <v-spacer class="mx-auto" />
        <v-btn color="primary" text>Filtrar</v-btn>
      </v-row>
    </v-card-title>

    <v-list rounded border-radius="4px">
      <v-list-item-group v-model="selectedCategories" multiple>
        <v-row>
          <v-col
            v-for="(category, i) in categories"
            :key="`col-${i}`"
            cols="12"
            sm="6"
            md="4"
            lg="12"
            class="py-2"
          >
            <v-divider v-if="!category" :key="`divider-${i}`"></v-divider>
            <v-list-item
              v-else
              :key="`item-${i}`"
              :value="category"
              active-class="primary lighten-2 white--text"
            >
              <template #default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active" color="accent"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title
                    class="secondary-text"
                    v-text="category.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'
import { ICategory } from '~/types/content'

@Component({ name: 'Categories' })
export default class Categories extends Vue {
  @Prop() categories!: ICategory[]
  @VModel() selectedCategories!: ICategory[]

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
}
</script>

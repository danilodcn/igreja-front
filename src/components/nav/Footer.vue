<template>
  <footer>
    <v-footer dark padless>
      <v-card flat tile class="primary lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.name"
            class="mx-4 white--text"
            icon
            :href="icon.href"
            target="_black"
          >
            <v-icon size="24px">
              {{ icon.name }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>IMB</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

interface IIcon {
  name: string
  href?: string
}

const icons: IIcon[] = [
  { name: 'mdi-facebook' },
  { name: 'mdi-instagram', href: `https://instagram.com/ibm_sede` },
  { name: 'mdi-twitter' },
  { name: 'mdi-linkedin' },
]

export default Vue.extend({
  data: () => ({
    icons,
  }),
})
</script>
<style scoped>
footer {
  margin-top: auto;
  display: flex;
}
</style>

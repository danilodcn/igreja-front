<template>
  <v-dialog v-model="dialog" width="350" max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <slot />
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-row justify="center" align="center">
          Compartilhe
          <v-spacer></v-spacer>
          <v-btn fab small text color="primary" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-actions>
        <v-col align="center">
          <v-btn fab large text color="primary">
            <v-icon>mdi-link-variant</v-icon>
          </v-btn>
          <v-spacer />
          Copiar
        </v-col>
        <v-col align="center">
          <v-btn fab large text color="primary">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          Facebook
          <v-spacer />
        </v-col>
        <v-col align="center">
          <v-btn fab large text color="primary">
            <v-icon text>mdi-whatsapp</v-icon>
          </v-btn>
          WhatsApp
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'share-dialog',
  data() {
    return {
      dialog: false,
    }
  },
})
</script>

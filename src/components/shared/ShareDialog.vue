<template>
  <v-dialog v-model="dialog" width="350" max-width="350">
    <template #activator="{ on, attrs }">
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
          <v-btn fab large text color="primary" @click="copyCurrentURL()">
            <v-icon>mdi-link-variant</v-icon>
          </v-btn>
          <v-spacer />
          <span v-if="!copied"> Copiar </span>
          <span v-else>Copiado</span>
        </v-col>
        <v-col align="center">
          <v-btn
            fab
            large
            text
            color="primary"
            :href="shareFacebook()"
            target="_blank"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          Facebook
          <v-spacer />
        </v-col>
        <v-col align="center">
          <v-btn
            fab
            large
            text
            color="primary"
            :href="shareWhatsApp()"
            target="_blank"
          >
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
  name: 'ShareDialog',
  data() {
    return {
      dialog: false,
      copied: false,
    }
  },
  computed: {
    getShareText(this: any) {
      if (process.client) {
        return `${this.getTitle} ${this.getCurrentURL}`
      }
      return this.$route.path
    },
    getTitle() {
      if (process.client) {
        return document.title
      }
      return ''
    },
    getCurrentURL() {
      if (process.client) {
        return window.location.href
      }
      return ''
    },
  },
  created() {
    this.$watch(
      () => this.dialog,
      (value) => {
        if (!value) {
          this.copied = false
        }
      }
    )
  },
  methods: {
    async copyUrl() {},
    shareWhatsApp() {
      const url = this.encode(this.getShareText)
      const base = "https://web.whatsapp.com/send"
      return `${base}?text=${url}`
    },
    encode(text: string) {
      return encodeURIComponent(text)
    },
    shareFacebook() {
      const url = this.encode(this.getCurrentURL)
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    copyCurrentURL() {
      const clipboardData = navigator.clipboard
      clipboardData.writeText(this.getCurrentURL)
      this.copied = true
    },
  },
})
</script>

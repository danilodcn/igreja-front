<template>
  <v-dialog v-model="active" max-width="500">
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
              {{ title }}
            </p>
            <v-spacer></v-spacer>
            <v-btn fab small text color="red" @click="active = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-card-actions>
      <v-spacer></v-spacer>
      <v-card-text v-if="text" class="text-body-1 content" v-html="text" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class InfoDialog extends Vue {
  active = false

  @Prop({ required: false }) title!: string
  @Prop({ required: false }) text!: string
}
</script>

<style lang="scss" scoped>
// @import "@/scss/main.scss";

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

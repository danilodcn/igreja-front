<template>
  <div class="mx-auto">
    <v-card rounded="3" class="mx-4 mx-md-10" elevation="4">
      <div class="card" :class="{ left: side == 'left' }">
        <img class="ma-4" :src="src" />
        <div class="content my-8">
          <p class="text-body-1">{{ title }}</p>
          <p class="text-h6 center">
            {{ subtitle }}
            <info-dialog :text="description" :title="subtitle"
              ><v-icon size="20">mdi-information</v-icon></info-dialog
            >
          </p>
          <div class="text-body-1 text" v-html="content"></div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import InfoDialog from './InfoDialog.vue'

@Component({
  name: 'ChurchBodyCard',
  components: { 'info-dialog': InfoDialog },
})
export default class ChurchBodyCard extends Vue {
  @Prop({ required: true }) src!: string
  @Prop({ required: true }) title!: string
  @Prop({ required: true }) subtitle!: string
  @Prop({ required: true }) description!: string
  @Prop({ required: true }) content!: string

  @Prop({ required: true }) side!: String
}
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}

.card.left {
  flex-direction: row-reverse;
}

.card.left .content {
  text-align: right;
}

img {
  max-height: 250px;
  height: 250px;
  border-radius: 0.4rem;
}

@media (max-width: 960px) {
  .card,
  .card.left {
    flex-direction: column;
  }
  .content {
    justify-content: center;
    align-items: center;
    justify-items: center;
  }

  .card.left .content,
  .card .content {
    text-align: center;
  }
}
</style>

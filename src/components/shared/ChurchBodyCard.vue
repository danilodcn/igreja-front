<template>
  <div class="mx-auto">
    <v-card rounded="3" class="mx-4 mx-md-10" elevation="4">
      <div class="card" :class="{ left: side == 'left' }">
        <img class="ma-4" :src="member.image" />
        <div class="content">
          <p class="text-subtitle-1">{{ member.name }}</p>
          <p class="text-h6 center">
            {{ member.member_type.name }}
            <info-dialog
              :text="member.member_type.description"
              :title="member.member_type.name"
              ><v-icon size="20">mdi-information</v-icon></info-dialog
            >
          </p>
          <div class="text-body-1 text" v-html="member.content"></div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import InfoDialog from './InfoDialog.vue'
import { IChurchBody } from '~/types/pages'

@Component({
  name: 'ChurchBodyCard',
  components: { 'info-dialog': InfoDialog },
})
export default class ChurchBodyCard extends Vue {
  @Prop({ required: true }) member!: IChurchBody
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

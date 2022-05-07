<template>
  <div>
    <v-container class="mx-auto">
      <v-col cols="8" sm="7" md="5" class="mx-auto px-">
        <v-row cols="12" class="mx-auto" align="center" justify="center">
          <v-avatar size="160">
            <v-img :src="user.image" v-if="user"></v-img>
            <v-icon size="160" class="mx-0" color="primary" v-else
              >mdi-account-circle</v-icon
            >
          </v-avatar>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn color="primary" text>
            <span>Alterar</span>
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </v-row>

        <v-form v-model="form.isValid">
          <v-text-field label="Nome" placeholder="Nome"></v-text-field>

          <v-text-field
            label="Sobrenome"
            placeholder="Sobrenome"
          ></v-text-field>

          <v-text-field label="Email" placeholder="Email"></v-text-field>

          <v-text-field
            label="Confirmação do email"
            placeholder="Confirmação do email"
          ></v-text-field>

          <v-file-input
            show-size
            accept="image/png, image/jpeg, image/bmp"
            :rules="form.fileRules"
            label="Foto do perfil"
            placeholder="Foto do perfil"
            prepend-icon="mdi-camera"
          ></v-file-input>

          <v-text-field
            label="Endereço"
            placeholder="Endereço"
            prepend-inner-icon="mdi-map-marker"
          ></v-text-field>

          <v-text-field label="Estado" placeholder="Estado"></v-text-field>

          <v-text-field label="Cidade" placeholder="Cidade"></v-text-field>

          <v-text-field label="CEP" placeholder="CEP"></v-text-field>
        </v-form>
      </v-col>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IRootState } from '~/src/store'
import { ILoggedUser } from '~/src/types/user'

const form = {
  fileRules: [
    (value) =>
      !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
  ],
  isValid: false,
}
export default Vue.extend({
  name: 'UserProfilePage',
  data() {
    return {
      form,
    }
  },
  computed: {
    user() {
      const user: ILoggedUser = (this.$store?.state as IRootState).user
      console.log('meu user', user)
      if (user.id) {
        return user
      } else {
        return null
      }
    },
  },
})
</script>

<style scoped>
.user-avatar {
}
</style>

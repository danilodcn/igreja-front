<template>
  <v-container class="mx-auto">
    {{ form }}
    <v-col cols="6" class="mx-auto" align="center" justify="center">
      <img src="./../assets/assets/logo-compressed.png" />
      <v-spacer />
      <v-col>
        <v-form v-model="form.isValid">
          <v-col>
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              type="email"
              clearable
              label="Email"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              type="password"
              :rules="passwordRules"
              clearable
              label="Senha"
              required
            ></v-text-field>
            <v-btn text color="primary" @click="handleLogin()"> Entrar </v-btn>
          </v-col>
        </v-form>
      </v-col>
    </v-col>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { AuthService } from "../services/auth/user"
import { ILoggingUser } from "../types/user"

interface IFormData {
  isValid: boolean
  email: string
  password: string
}

export default Vue.extend({
  name: 'LoginPage',
  data() {
    return {
      form: {} as IFormData,
    }
  },
  computed: {
    emailRules() {
      return [(v: string) => !!v || 'Email é obrigatório']
    },
    passwordRules() {
      return [
        (v: string) => !!v || 'Senha é obrigatória',
        (v: string) => v?.length >= 6 || 'Senha muito curta',
      ]
    },
  },
  methods: {
    handleLogin() {
      const user: ILoggingUser = {
        email: this.form.email,
        password: this.form.password,
      }
      const service = new AuthService()
      service.getToken(user)
    },
  },
})
</script>

<style scoped>
img {
  max-height: 120px;
}
</style>

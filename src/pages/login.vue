<template>
  <div>
    <v-alert :type="alert.type" dismissible v-model="alert.active">{{
      alert.message
    }}</v-alert>
    <v-container class="mx-auto">
      <v-col
        cols="12"
        sm="7"
        md="5"
        class="mx-auto px-0"
        align="center"
        justify="center"
      >
        <img src="./../assets/assets/logo-compressed.png" />
        <v-spacer />
        <v-col class="mx-0 px-0">
          <v-form v-model="form.isValid">
            <v-col>
              <v-text-field
                v-model="form.user.email"
                :rules="emailRules"
                type="email"
                clearable
                label="Email"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.user.password"
                :type="form.passwordVisibility ? 'password' : 'text'"
                :append-icon="
                  form.passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append="
                  form.passwordVisibility = !form.passwordVisibility
                "
                :rules="passwordRules"
                label="Senha"
                required
              >
              </v-text-field>
              <v-btn
                text
                :disabled="!form.isValid"
                color="primary"
                @click="handleLogin()"
                @keyup.enter.native="handleLogin()"
                :loading="form.loading"
              >
                Entrar
              </v-btn>
            </v-col>
          </v-form>
        </v-col>
      </v-col>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { AuthService } from '../services/auth/user'
import { ILoggingUser } from '../types/user'
import { alertDefault } from '../types/utils'

interface IFormData {
  loading: boolean
  passwordVisibility: boolean
  isValid: boolean
  user: ILoggingUser
}

const form: IFormData = {
  loading: false,
  isValid: false,
  passwordVisibility: false,
  user: {
    email: '',
    password: '',
  },
}

export default Vue.extend({
  name: 'LoginPage',
  data() {
    return {
      form,
      alert: alertDefault,
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
    async handleLogin() {
      this.form.loading = true
      const service = new AuthService()
      try {
        const res = await service.getToken(this.form.user)
        console.log(res)
      } catch (error) {
        console.log(error)
        this.alert = {
          active: true,
          message: 'Erro ao fazer login',
          type: 'warning',
        }
      }
      setInterval(() => (this.form.loading = false), 500)
    },
  },
})
</script>

<style scoped>
img {
  max-height: 120px;
}
</style>

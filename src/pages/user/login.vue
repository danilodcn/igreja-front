<template>
  <div>
    <v-alert v-model="alert.active" :type="alert.type" dismissible>{{
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
        <img src="@/assets/assets/logo-compressed.png" />
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
                :rules="passwordRules"
                label="Senha"
                required
                @click:append="
                  form.passwordVisibility = !form.passwordVisibility
                "
              >
              </v-text-field>
              <v-btn
                text
                :disabled="!form.isValid"
                color="primary"
                :loading="form.loading"
                @click="handleLogin()"
              >
                Entrar
              </v-btn>
              <v-btn @click="handleLogin()"> Click </v-btn>
            </v-col>
          </v-form>
        </v-col>
      </v-col>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ILoggingUser } from '@/types/user'
import { alertDefault } from '@/types/utils'
import { IRootState } from '@/store/types'
// import { UserService } from '@/services/user'

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
    email: 'daconnas.dcn@gmail.com',
    password: '1234',
  },
}

// const userService = new UserService()

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
    getUser() {
      return (this.$store.state as IRootState).user
    },
  },
  methods: {
    async handleLogin() {},
  },
})
</script>

<style scoped>
img {
  max-height: 120px;
}
</style>

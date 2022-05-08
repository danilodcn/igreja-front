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
        <img src="./../../assets/assets/logo-compressed.png" />
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
                :loading="form.loading"
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
import { ILoggingUser } from '../../types/user'
import { alertDefault } from '../../types/utils'
import { IRootState, MutationTypes } from '../../store'
import { login } from '../../api/users'
import { UserService } from '../../services/user'
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
    password: 'Senha@123',
  },
}

const userService = new UserService()

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
    async handleLogin() {
      this.form.loading = true
      console.log(new Date())
      var user = undefined
      try {
        await userService.getUser(this.form.user)
        user = userService.user
      } catch {
        console.log('error')
        user = undefined
      }
      console.log('user', user)
      if (user) {
        this.$store.commit(MutationTypes.LOGIN_USER, user)
        console.log(this.$store.state.user, 'meu user')
        this.$router.push('/')
      } else
        this.alert = {
          active: true,
          message: 'Erro ao fazer login',
          type: 'warning',
        }

      setInterval(() => (this.form.loading = false), 500)
    },
  },
  // async beforeMount() {
  //   const user = await this.loadFromStorage('user')
  //   console.log(user, "usuário")
  //   if (user) {
  //     this.$store.commit(MutationTypes.LOGIN_USER, user)
  //     this.alert = {
  //       active: true,
  //       message: 'Usuário já logado no sistema',
  //       type: 'warning',
  //     }
  //   }
  // },
})
</script>

<style scoped>
img {
  max-height: 120px;
}
</style>

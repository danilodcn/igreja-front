<template>
  <header class="row">
    <v-col cols="12">
      <v-card style="border-radius: 0">
        <v-card-title class="primary white--text">
          <nuxt-link to="/">
            <img
              src="./../../assets/assets/logo-compressed.png"
              alt="Logo"
              class="logo"
            />
          </nuxt-link>
          <span class="text-h5">Igreja Batista Missionária</span>

          <v-spacer></v-spacer>

          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>

            <v-list>
              <UserLogo :user="user" />
              <v-spacer />

              <v-col>
                <v-list-item
                  v-for="(item, i) in items.items"
                  :key="i"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-col>
            </v-list>
          </v-menu>
        </v-card-title>
      </v-card>
    </v-col>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { LoggedUser } from '../../types/user'
import UserLogo from '../shared/UserLogo.vue'

interface NavItem {
  title: string
  to: string
}

interface NavItems {
  items: NavItem[]
  clicked?: number
}

const navItems: NavItems = {
  clicked: 0,
  items: [
    {
      title: 'A IBM',
      to: '/',
    },
    {
      title: 'Conteúdo',
      to: '/conteudo',
    },
    {
      title: 'Ministérios',
      to: '/ministerios',
    },
  ],
}

export default Vue.extend({
  data: () => ({
    items: navItems,
    user: {
      // url: 'https://cdn.vuetifyjs.com/images/john.jpg',
      name: 'John',
    } as LoggedUser,
    computed: {
      user() {},
    },
  }),
  components: {
    UserLogo,
  },
})
</script>
<style scoped>
header {
  padding: 0;
}
.logo {
  --height: 40px;
  height: var(--height);
  width: var(--height);
  margin-right: 1rem;
}
</style>

<template>
  <v-toolbar color="primary">
    <v-toolbar-title>
      <nuxt-link to="/">
        <img
          src="./../../assets/assets/logo-compressed.png"
          alt="Logo"
          class="logo"
        />
      </nuxt-link>
    </v-toolbar-title>

    <v-divider class="mx-4" vertical></v-divider>
    <span class="text-h6">Igreja Batista Missionária - IMB</span>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn :to="item.to" v-for="(item, i) in items.items" text :key="i">
        {{ item.title }}
      </v-btn>
      <v-divider vertical></v-divider>
    </v-toolbar-items>

    <!-- <div class="hidden-md-and-up pa-0"> -->
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon class="hidden-md-and-up">mdi-menu</v-icon>
          <v-icon class="hidden-sm-and-down">mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <UserLogo :user="user" />
        <v-spacer />

        <v-col class="hidden-md-and-up">
          <v-list-item v-for="(item, i) in items.items" :key="i" :to="item.to">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-col>
      </v-list>
    </v-menu>
    <!-- </div> -->
  </v-toolbar>
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
  margin: 0 auto;
}
</style>

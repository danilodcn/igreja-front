<template>
  <v-toolbar color="primary">
    <v-toolbar-title>
      <nuxt-link to="/">
        <img
          src="@/assets/assets/logo-compressed.png"
          alt="Logo"
          class="logo"
        />
      </nuxt-link>
    </v-toolbar-title>

    <v-divider class="mx-4" vertical></v-divider>
    <span class="text-h6 white--text">Igreja Batista Missionária - IBM</span>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="(item, i) in items.items" :key="i" :to="item.to" text>
        <span class="white--text">
          {{ item.title }}
        </span>
      </v-btn>
      <v-divider vertical></v-divider>
    </v-toolbar-items>

    <v-menu bottom left>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon class="hidden-md-and-up">mdi-menu</v-icon>
          <v-icon class="hidden-sm-and-down">mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <UserLogo :user="getUser" />
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
import UserLogo from '@/components/shared/UserLogo.vue'
import { IRootState } from '@/store'
import { IChurch } from '~/types/pages'
import { HomePageService } from '@/services/homePageService'
import { ILoggedUser } from '@/types/user'

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
    {
      title: 'Bíblia',
      to: '/biblia',
    },
  ],
}

const homePageService = new HomePageService()

export default Vue.extend({
  name: 'HeaderNav',
  components: {
    UserLogo,
  },
  data: () => ({
    items: navItems,
    church: [] as IChurch[],
    churchSelected: {} as IChurch,
  }),
  computed: {
    getUser() {
      const user: ILoggedUser = (this.$store?.state as IRootState).user
      if (user.id) {
        return user
      } else {
        return null
      }
    },
    defaultChurchName() {
      if (this.churchSelected !== ({} as IChurch) && this.churchSelected.name) {
        return this.churchSelected.name
      }
      return this.church[0].name
    },
  },
  beforeMount() {
    this.getChurch()
  },
  methods: {
    async getChurch() {
      this.church = await homePageService.getChurchInfo()
    },
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

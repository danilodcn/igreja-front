<template>
  <div>
    <v-col class="center">
      <v-col>
        <v-list-item class="avatar">
          <v-avatar color="primary" size="75" v-if="user">
            <img class="white--text text-h5" :src="user.url" v-if="user.url" />
            <span class="white--text text-h5" v-else>{{ user.name[0] }}</span>
          </v-avatar>

          <v-avatar color="primary" v-else>
            <v-icon dark>mdi-account-circle</v-icon>
          </v-avatar>
        </v-list-item>
      </v-col>

      <v-spacer />

      <v-list-item>
          <v-col v-if="user" class="center">
            <v-btn to="/logout">Logout</v-btn>
            <v-btn to="/profile">Perfil</v-btn>
          </v-col>
        <v-col>
          <v-btn v-if="!user" to="/login">login</v-btn>
        </v-col>
      </v-list-item>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { LoggedUser } from '../../types/user'

export default Vue.extend({
  computed: {
    userLetters(this: any): string {
      return this.user
    },
  },
  data: () => ({}),
  props: {
    user: {
      type: Object as PropType<LoggedUser>,
      required: false,
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
  margin-right: 1rem;
}
.avatar div {
  margin: auto;
}

.center {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 auto;
  gap: .4rem
}
</style>

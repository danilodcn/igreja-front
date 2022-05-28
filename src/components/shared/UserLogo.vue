<template>
  <div>
    <v-col class="center">
      <v-col>
        <v-list-item class="avatar">
          <v-avatar v-if="user" color="primary" size="75">
            <img
              v-if="user.image"
              class="white--text text-h5"
              :src="user.image"
            />
            <span v-else class="white--text text-h5">{{
              user.name ? user.name[0] : '?'
            }}</span>
          </v-avatar>

          <v-avatar v-else color="primary">
            <v-icon dark>mdi-account-circle</v-icon>
          </v-avatar>
        </v-list-item>
      </v-col>
      <v-spacer />

      <v-list-item>
        <v-col v-if="user" class="center">
          <v-btn color="primary" text to="/user/logout">Logout</v-btn>
          <v-btn color="primary" text to="/user/profile">Perfil</v-btn>
        </v-col>
        <v-col v-if="!user">
          <v-btn color="primary" text to="/user/login">login</v-btn>
        </v-col>
      </v-list-item>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { ILoggedUser } from '@/types/user'

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<ILoggedUser>,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    userLetters(this: any): string {
      return this.user
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
  gap: 0.4rem;
}
</style>

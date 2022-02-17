<template>
  <div class="home">
    <h2>{{ state.title }}</h2>

    <ul v-if="users">
      <li v-for="user in users" :key="user.id">
        <router-link :to="{name: 'Profile', params: {userId: user.id}}">{{ user.username }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import {reactive} from "vue";
import {users} from "../assets/users";

export default {
  name: 'Home',
  setup() {

    const state = reactive({
      title: 'Twitter users'
    });

    return {
      state,
      users
    }
  },
  components: {
  }
}
</script>

<template>
  <div class="home">
    <h2>{{ state.title }}</h2>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      title: 'Welcome to home page'
    });

    return {
      state
    }
  },
  components: {
  }
}
</script>

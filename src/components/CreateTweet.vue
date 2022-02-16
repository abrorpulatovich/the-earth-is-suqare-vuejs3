<template>
  <form @submit.prevent="saveNewTweet">
    <label for="tweet">Your tweet ({{ tweetLettersCount }}/180)</label> <br>
    <textarea id="tweet" cols="56" rows="4" v-model="state.tweetForm.tweet" :class="['tweettext', {exceed: tweetLettersCount > 180}]"></textarea>

    <br>
    <br>

    <label for="type">Type</label> <br>
    <select v-model="state.tweetForm.type" id="type" class="tweettype">
      <option v-for="tweetType in state.tweetTypes" :value="tweetType.value" :key="tweetType.name">{{ tweetType.name }}</option>
    </select>

    <br>
    <br>

    <button type="submit" :class="{exceed: tweetLettersCount > 180}" :disabled="tweetLettersCount > 180">Tweet</button>
  </form>
</template>

<script>
import {computed, reactive} from "vue";

export default {
  name: "CreateTweet",
  setup(props, context) {
    const state = reactive({
      tweetForm: {
        tweet: '',
        type: 'instant'
      },
      tweetTypes: [
        {value: 'draft', name: 'Draft'},
        {value: 'instant', name: 'Instant'}
      ]
    });

    const tweetLettersCount = computed(() => state.tweetForm.tweet.length);

    function saveNewTweet() {
      if (state.tweetForm.type === 'instant') {
        context.emit('saveTweet', {
          id: this.userTweetsCount,
          content: state.tweetForm.tweet
        })
        state.tweetForm.tweet = '';
        state.tweetForm.type = 'instant';
      }
    }

    return {
      state,
      tweetLettersCount,
      saveNewTweet
    }
  },
  props: {
    userTweetsCount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
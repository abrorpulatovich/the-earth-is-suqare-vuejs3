<template>
  <form @submit.prevent="saveNewTweet">
    <label for="tweet">Your tweet ({{ tweetLettersCount }}/180)</label> <br>
    <textarea id="tweet" cols="56" rows="4" v-model="tweetForm.tweet" :class="['tweettext', {exceed: tweetLettersCount > 180}]"></textarea>

    <br>
    <br>

    <label for="type">Type</label> <br>
    <select v-model="tweetForm.type" id="type" class="tweettype">
      <option v-for="tweetType in tweetTypes" :value="tweetType.value" :key="tweetType.name">{{ tweetType.name }}</option>
    </select>

    <br>
    <br>

    <button type="submit" :class="{exceed: tweetLettersCount > 180}" :disabled="tweetLettersCount > 180">Tweet</button>
  </form>
</template>

<script>
export default {
  name: "CreateTweet",
  props: {
    userTweetsCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tweetForm: {
        tweet: '',
        type: 'instant'
      },
      tweetTypes: [
        {value: 'draft', name: 'Draft'},
        {value: 'instant', name: 'Instant'}
      ]
    }
  },
  methods: {
    saveNewTweet() {
      if (this.tweetForm.type === 'instant') {
        this.$emit('saveTweet', {
          id: this.userTweetsCount,
          content: this.tweetForm.tweet
        })
        this.tweetForm.tweet = '';
        this.tweetForm.type = 'instant';
      }
    }
  },
  computed: {
    tweetLettersCount() {
      return this.tweetForm.tweet.length;
    }
  }
}
</script>

<style scoped>

</style>
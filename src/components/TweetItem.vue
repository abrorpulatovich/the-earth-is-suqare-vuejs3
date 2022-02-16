<template>
  <div class="tweet-item" @click="favoriteTweet(tweet.id)">
    <h2>@{{ username }}</h2>
    <p>{{ tweet.content }}</p>
  </div>
</template>

<script>
export default {
  name: "TweetItem",
  props: {
    tweet: {
      type: Object,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    favoriteTweet(id) {
      this.$emit('favorite', id);
    }
  }
}
</script>

<style scoped>
  .tweet-item {
    width: 98%;
    min-height: 35px;
    border: 1px solid #cccccc;
    margin-bottom: 20px;
    padding: 20px;
    transition: all 0.25s ease;
    background: #eeeeee;
  }

  .tweet-item:hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
  }
</style>
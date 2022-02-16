<template>
  <div>
    <div class="profile">
      <h2>
        {{ fullname }} <br>
        <small><b>@{{ state.user.username }}</b></small>
      </h2>
      <p><b>Followers</b>: {{ state.followers }}</p>
      <p v-if="state.user.isAdmin" class="role-label">Admin</p>

      <div class="new__tweet">
        <CreateTweet :userTweetsCount="state.user.tweets.length" @saveTweet="savePostTweet"/>
      </div>
    </div>
    <div class="tweets">
      <h2>Tweets</h2>
      <br>
      <TweetItem v-for="tweet in state.user.tweets" :key="tweet.id" :tweet="tweet" :username="state.user.username" @favorite="fav"/>
    </div>
  </div>
</template>

<script>

import {reactive, computed} from 'vue';
import TweetItem from "@/components/TweetItem";
import CreateTweet from "@/components/CreateTweet";

export default {
  name: "UserProfile",
  components: {CreateTweet, TweetItem},
  setup() {
    const state = reactive({
      followers: 0,
      user: {
        id: 1,
        username: '_abrorkhan',
        firstname: 'Abror',
        lastname: 'Eshkabilov',
        email: 'abror.eshkabilov@gmail.com',
        isAdmin: true,
        tweets: [
          {id: 1, content: 'Some content section 1'},
          {id: 2, content: 'Some content section 1'}
        ]
      }
    });

    const fullname = computed(() => `${state.user.firstname} ${state.user.lastname}`);

    function followUser() {
      state.followers += 1;
    }

    function fav(id) {
      console.log('Fav id', id);
    }

    function savePostTweet(newTweet) {
      state.user.tweets.unshift(newTweet);
    }

    return {
      state,
      fullname,
      followUser,
      fav,
      savePostTweet
    }
  },
  watch: {
    followers(newFollowersCount, oldFollowersCount) {
      if (newFollowersCount > oldFollowersCount) {
        console.log(`${this.user.username} followerlari soni oshdi`)
      }
    }
  },
  mounted() {
    this.followUser();
  }
}
</script>

<style scoped>
  .profile {
    width: 25%;
    min-height: 120px;
    border: 1px solid #ccc;
    padding: 20px;
    float: left;
  }

  .role-label {
    display: block;
    width: 50px;
    height: 15px;
    padding: 5px;
    background: coral;
    border-radius: 3px;
    color: white;
  }

  .tweets {
    width: 70%;
    min-height: 120px;
    float: left;
    margin-left: 20px;
  }

  .tweettype, .tweettext {
    width: 100%;
  }

  .button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
  }

  .exceed {
    border-color: red;
  }

  .button1 {font-size: 10px;}
  .button2 {font-size: 12px;}
</style>
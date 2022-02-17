import { createStore } from 'vuex'
import {UserModule} from "./User";

const store = createStore({
  modules: {
    User: UserModule
  }
})

export default store;
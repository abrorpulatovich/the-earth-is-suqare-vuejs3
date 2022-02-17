import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue';
import Admin from '@/views/Admin.vue';
import {users} from "../assets/users";
import store from "../store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Users.vue')
  },
  {
    path: '/users/:userId',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/UserProfile.vue'),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {

  if (to.name == 'Profile' && to.params.userId) {
    let userId = to.params.userId;
    let user = users[userId - 1];
    await store.dispatch('User/setUser', user);
    user = store.state.User.user;
    console.log("user", user);
    const isAdmin = user.isAdmin;
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

    if (requiresAdmin && !isAdmin) next({ name: 'Home' });
    else next();
  }
  next();
});

export default router

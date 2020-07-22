<template>
  <div id="app">
    <Header />
    <router-view />
    <Login :show="isLogin" />
  </div>
</template>

<script>
import Header from "@/components/header/header";
import Login from "@/components/login/login";
import { mapState } from "vuex";
export default {
  components: { Header, Login },
  computed: {
    ...mapState("loginStore", ["isLogin"]),
  },
};
</script>

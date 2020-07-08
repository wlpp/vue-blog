<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/header/header";
export default {
  components: { Header },
};
</script>

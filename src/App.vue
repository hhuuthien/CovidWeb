<template>
  <navbar />
  <router-view></router-view>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
};
</script>

<style>
@font-face {
  font-family: GoogleSans-Black;
  src: url(./fonts/GoogleSans-Black.ttf);
}
@font-face {
  font-family: GoogleSans-Regular;
  src: url(./fonts/GoogleSans-Regular.ttf);
}
@font-face {
  font-family: GoogleSans-Medium;
  src: url(./fonts/GoogleSans-Medium.ttf);
}
</style>

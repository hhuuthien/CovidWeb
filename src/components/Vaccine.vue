<template>
  <div class="columns">
    <div class="column"><VaccineVN v-on:loaded="loaded" /></div>
    <div class="column"><VaccineW /></div>
  </div>
  <transition name="fade">
    <div id="overlay2" v-show="!showContent">
      <div class="spinner"></div>
    </div>
  </transition>
</template>

<script>
import VaccineVN from "./VaccineVN.vue";
import VaccineW from "./VaccineW.vue";
import { ref } from "vue";

export default {
  components: { VaccineVN, VaccineW },
  name: "Vaccine",
  setup() {
    const showContent = ref(false);

    const loaded = () => {
      showContent.value = true;
    };

    return {
      showContent,
      loaded,
    };
  },
};
</script>

<style scoped>
.columns {
  width: 95%;
  margin: auto;
}

#overlay2 {
  position: fixed;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(255, 255, 255);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.columns {
  width: 95%;
  margin: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.spinner {
  width: 60px;
  height: 60px;
  background-color: black;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }
  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>

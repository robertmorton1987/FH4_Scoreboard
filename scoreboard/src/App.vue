<template>
  <div id="app">
    <div class="pb-4">
      <Timer />
    </div>  
  </div>
</template>

<script>
import Timer from './components/Timer.vue'


export default {
  name: 'App',
  components: {
    Timer
  }
}
</script>

<style>
  @import "~@/assets/css/main.css";
</style>

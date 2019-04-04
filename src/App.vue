<template>
  <div id="app">
    <main-view></main-view>
  </div>
</template>

<script>
import mainView from './layout/main'
export default {
  name: 'app',
  components: {
    mainView
  }
}
</script>

<style>
* {
  margin:0;
  padding:0;
}
</style>

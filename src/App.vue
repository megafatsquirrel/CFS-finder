<template>
  <div id="app">
    <div class="banner">
      <div class="image-container">
        <img src="./assets/CFS.jpg" height="200" width="200"/>
      </div>
    </div>
    <CFSFinder msg="Welcome to CFS Finder"/>
  </div>
</template>

<script>
import CFSFinder from './components/CFSFinder.vue'

export default {
  name: 'app',
  components: {
    CFSFinder
  }
}
</script>

<style>
html, body {
  background-color: #F58A07;
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
.image-container {
  width: 150px;
  margin: 0 auto;
}
img {
  width: 100%;
  border: 4px solid #FFA630;
  border-radius: 45%;
}
.banner {
  background-color: #F4D06F;
  border-bottom: 10px solid #F3C969;
  padding: 15px;
}
</style>

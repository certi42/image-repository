<template>
  
  <div id="app">
    
    <search-pane class="search" @choosePath="choosePath" @chooseImage="chooseImage" />
    <image-view :path="imagePath"/>
  </div>
</template>

<script>
import SearchPane from './components/SearchPane.vue'
import ImageView from './components/ImageView.vue'

export default {
  name: 'App',
  data() {
    return {
      image: "",
      path: "",
      imagePath: ""
    }
  },
  methods: {
    choosePath(path) {
      this.path = path;
      if(this.path && this.image) {
        this.imagePath = this.path + "/" + this.image;
      }
    },
    chooseImage(img) {
      this.image = img;
      if(this.path && this.image) {
        this.imagePath = this.path + "/" + this.image;
      }
    }
  },
  components: {
    SearchPane, ImageView
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.search {
  width: 30%;
  height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  background-color: white;
}
</style>

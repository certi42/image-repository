<template>
  <div id="app">
    <search-pane class="search" @choosePath="choosePath" @chooseImage="chooseImage" ref="search"/>
    <div id="image-container">
      <image-view :path="imagePath"/>
      <tag-view :tags="imageTags" v-if="imagePath"/>
    </div>
  </div>
</template>

<script>
import SearchPane from './components/SearchPane.vue'
import ImageView from './components/ImageView.vue'
import TagView from './components/TagView.vue'

import fs from 'fs';
import path from 'path';
import { getImages, setTags } from '@/search';

export default {
  name: 'App',
  data() {
    return {
      image: "",
      path: "",
      imagePath: "",
      imageTags: [],
      tags: [],
    }
  },
  methods: {
    choosePath(path) {
      this.saveTags();
      const tagPath = path + "/.tags.json";
      if(fs.existsSync(tagPath)) {
        this.tags = JSON.parse(fs.readFileSync(tagPath));
      } else {
        this.tags = getImages().map((imageName) => {
          return {
            name: imageName,
            tags: []
          };
        });
      }

      setTags(this.tags);

      this.path = path;
      if(this.path && this.image) {
        this.imagePath = this.path + "/" + this.image;
      }
    },
    chooseImage(img) {
      this.image = img;
      if(this.path && this.image) {
        this.imagePath = this.path + "/" + this.image;
        this.imageTags = this.tags.find(tag => tag.name == img).tags;
      }
    },
    saveTags() {
      if(this.path) {
        // save tags
        const tagPath = path.join(this.path, ".tags.json");
        console.log("saving tags to", tagPath);
        fs.writeFileSync(tagPath, JSON.stringify(this.tags));
      }
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.saveTags);
  },
  components: {
    SearchPane, ImageView, TagView
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

#image-container {
  height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 80%;
  overflow: scroll;
}
</style>

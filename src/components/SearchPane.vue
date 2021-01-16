<template>
  <div class="search-pane">
    <input type="text" v-model="searchTerm" placeholder="Search by name or tags">
    <div id="image-listings">
      <p v-for="name in showImages" :key="name" class="image-line" 
        :class="{selected: selectedImage === name}" @click="selectImage(name)">{{ name }}</p>
    </div>
    <div v-if="images.length === 0" style="display: flex;">
      <button id="choose-folder" @click="chooseDir()">Choose Directory for Images</button>
    </div>
  </div>
</template>

<script>
var remote = window.require('electron').remote;
var fs = remote.require('fs');
var dialog = remote.dialog;
// import fs from 'fs';
// import { dialog } from 'electron'


import { getType } from 'mime';


export default {
  data() {
    return {
      searchTerm: "",
      images: [],
      showImages: [],
      path: "",
      selectedImage: ""
    }
  },
  methods: {
    async chooseDir() {
      const path = dialog.showOpenDialogSync({properties: ['openDirectory']})[0];
      this.$emit("choosePath", path);
      const files = fs.readdirSync(path);
      this.images = files.filter(name => {
        const type = getType(name);
        return type && type.includes("image");
      });
      this.search();
    },
    search() {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.showImages = this.images.filter(name => {
        const lowerName = name.toLowerCase();
        return lowerName.includes(lowerSearchTerm);
      });
    },
    selectImage(name) {
      this.selectedImage = name;
      this.$emit("chooseImage", name);
    }
  },
  name: 'SearchPane',
  watch: {
    searchTerm() {
      this.search();
    }
  }
}
</script>

<style scoped>
input {
  padding: 10px;
  width: calc(100% - 22px);
  font-size: 16px;
  margin: 0;
  outline: none;
}

#image-listings {
  overflow: scroll;
  flex: 1 1 auto;
}

.image-line {
  margin: 0;
  padding: 3px;
  cursor: pointer;
  font-size: 14px;
}

.image-line:hover {
  background: #eee;
}

.image-line.selected {
  background: #ddd;
}
.image-line.selected:hover {
  background: #ccc;
}

#choose-folder {
  padding: 6px 8px;
  background: white;
  border: 1px solid #555;
  border-radius: 5px;
  margin: 16px auto;
  transition: 0.2s;
  cursor: pointer;
}

#choose-folder:hover {
  background: #eee;
}


</style>

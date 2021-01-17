<template>
  <div class="search-pane">
    <input type="text" v-model="searchTerm" placeholder="Search by name or tags">
    <div id="image-listings" v-if="path">
      <p v-for="name in showImages" :key="name" class="image-line" 
        :class="{selected: selectedImage === name}" @click="selectImage(name)">{{ name }}</p>
      <button class="button" id="add-image" @click="addImage()">Add Image</button>
    </div>
    <div v-else style="display: flex;">
      <button class="button" id="choose-folder" @click="chooseDir()">Choose Directory for Images</button>
    </div>
  </div>
</template>

<script>
const remote = window.require('electron').remote;
const dialog = remote.dialog;
import fs from 'fs';
import path from 'path';
import { getType } from 'mime';
import { setImages, search } from '@/search'


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
    chooseDir() {
      const path = dialog.showOpenDialogSync({properties: ['openDirectory']})[0];
      this.path = path;
      const files = fs.readdirSync(path);
      this.images = files.filter(name => {
        const type = getType(name);
        return type && type.includes("image");
      });
      setImages(this.images);
      this.$emit("choosePath", path);
      this.search();
    },
    search() {
      this.showImages = search(this.searchTerm);
    },
    selectImage(name) {
      this.selectedImage = name;
      this.$emit("chooseImage", name);
    },
    addImage() {
      const paths = dialog.showOpenDialogSync({
        filters: [{name: 'Image', extensions: ['png','jpg','jpeg','bpm','gif']}],
        properties: ['openFile', 'multiSelections']
      });
      const imageNames = paths.filter(pname => {
        return path.dirname(pname) !== this.path;
      }).map(pname => {
        const imgName = path.basename(pname);
        fs.copyFileSync(pname, path.join(this.path, imgName));
        return imgName;
      });
      imageNames.forEach(imgName => {
        this.images.push(imgName);
      });
      setImages(this.images);
      this.$emit("addImages", imageNames);
      this.search();
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

.button {
  padding: 6px 8px;
  background: white;
  border: 1px solid #555;
  border-radius: 5px;
  margin: 16px auto;
  transition: 0.2s;
  cursor: pointer;
}

.button:hover {
  background: #eee;
}
</style>

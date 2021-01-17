<template>
  <div id="image-view">
    <img id="selected-image" v-if="path" :src="getPath()"/>
    <p id="select-message" v-else>No Image Selected</p>
  </div>
</template>

<script>

export default {
  methods: {
    getPath() {
      if(this.path) {
        return 'file://' + this.path;
      } else {
        return "";
      }
    }
  },
  props: ["path"],
  name: "ImageView"
}
</script>

<style scoped>
#image-view {
  padding: 30px;
  flex-grow: 1;
  height: 70%;
}

#selected-image {
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
}

#select-message {
  font-weight: lighter;
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 80%;
  position: relative;
  top: 40%;
  transform: translateY(-50%);
  margin: 0 auto;
}

</style>
<template>
  <div id="tag-view">
    <h2>Tags</h2>
    <div class="tags">
      <p class="tag" v-for="tag of tags" :key="tag">{{ tag }}</p>
      <p v-if="tags.length === 0">No tags yet. Press '+' to add one!</p>
      <p class="add-tag tag" @click="showModal = true">+</p>
    </div>
    <modal v-if="showModal" @close="tagRecieved()">
      <template v-slot:header>
        <h2>Enter a tag to add to this image</h2>
      </template>
      <template v-slot:body>
        <input type="text" placeholder="Tag value..." v-model="tagInput" @keyup.enter="tagRecieved()">
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  data() {
    return {
      showModal: false,
      tagInput: ""
    }
  },
  methods: {
    tagRecieved() {
      this.showModal = false;
      if(this.tagInput) {
        this.$emit("newTag", this.tagInput);
        this.tags.push(this.tagInput);
        this.tagInput = "";
      }
    }
  },
  name: "TagView",
  props: ["tags"],
  components: { Modal }
}
</script>

<style scoped>
#tag-view {
  height: 20%;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  border: 1px solid #ddd;
  border-radius: 5px;
  width: fit-content;
  padding: 6px 10px;
  background: #eee;
  cursor: pointer;
  user-select: none;
  margin: 5px;
}
</style>
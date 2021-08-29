<template>
  <div class="slide-edit">

    <a @click="removeSlide" v-if="index" class="slide-edit__close"
    ><i class="far fa-times-circle"></i
    ></a>

    <img :src="slideImage" alt="" class="slide-edit__image"/>


    <input
        @change="changePreview"
        type="file"
        :id="`topSlide` + index"
        style="display: none"
        accept="image/*"
    />
    <label
        :for="`topSlide` + index"
        class="slide-edit__button btn btn-block btn-primary btn-sm"
    >
      Добавить
    </label>

    <div class="form-group">
      <input
          type="text"
          class="form-control"
          placeholder="Enter URL"
          v-model="url"
          @input="editUrl"
      />
    </div>

    <div class="form-group">
      <input
          type="text"
          class="form-control"
          placeholder="Enter Text"
          v-model="text"
          @input="editText"
      />
    </div>

  </div>
</template>

<script>

export default {
  name: "SlideEdit",
  props: {
    index: Number,
    slideUrl: String,
    slideText: String,
    slideImage: String,
    isRemoving: Boolean
  },
  data() {
    return {
      text: this.slideText,
      url: this.slideUrl,
    };
  },
  methods: {

    removeSlide() {
      this.$emit("removeSlide", this.index);
    },

    editUrl() {
      this.$emit("editUrl", this.index, this.url);
    },

    editText() {
      this.$emit("editText", this.index, this.text);
    },

    changePreview() {
      const fileInput = document.querySelector(`#topSlide${this.index}`)

      let file = fileInput.files[0]

      this.$emit('changeImage', this.index, file)
    }

  },
  computed: {},
  watch: {}
};
</script>

<style>
.slide-edit {
  min-width: 260px;
  max-width: 260px;
  position: relative;
  padding-top: 10px;
  display: inline-block;
  margin: 0 20px;
}

.slide-edit__close {
  position: absolute;
  top: 0px;
  right: -10px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
}

.slide-edit__image {
  width: 100%;
  height: auto;
  margin: 0 0 15px 0;
  width: 260px;
  height: 208px;
  object-fit: cover;
}

.slide-edit__button {
  width: 100%;
  margin-bottom: 15px;
}
</style>
<template>
  <div class="slide-edit">

    <a @click="removeSlide" class="slide-edit__close"
      ><i class="far fa-times-circle"></i
    ></a>

    <img :src="slideImage" alt="" class="slide-edit__image" />
    

    <input
      @change="changePreview"
      type="file"
      :id="`bottomSlide` + index"
      style="display: none"
      accept="image/*"
    />
    <label
      :for="`bottomSlide` + index"
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

  </div>
</template>

<script>

export default {
  name: "SlideEdit",
  props: {
    index: Number,
    slideUrl: String,
    slideImage: String
  },
  data() {
    return {
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

    changePreview() {
      const fileInput = document.querySelector(`#bottomSlide${this.index}`)

      let file = fileInput.files[0]

      this.$emit('changeImage', this.index, file)
    }

  },
  computed: {
  },
  watch: {
  }
};
</script>

<style>

</style>
<template>
  <div class="seo general__margin">
    <label for="" class="general__text">{{ text }}</label>
    <form class="seo-content">
      <p class="form-url">
        <label>URL</label>
        <input
            class="form-control"
            type="text"
            placeholder="URL"
            @input="$emit('url', $event.target.value)"
            :value="value.url"
        >
      </p>

      <p class="form-title">
        <label for="">Title</label>
        <input
            class="form-control"
            type="text"
            placeholder="Title"
            @input="$emit('title', $event.target.value)"
            :value="value.title"
        >
      </p>

      <p class="form-keywords">
        <label for="">Keywords</label>
        <input
            class="form-control"
            type="text"
            placeholder="Keywords"
            @input="$emit('keywords', $event.target.value)"
            :value="value.keywords"
        >
      </p>

      <p class="form-description">
        <label for="">Description</label>
        <textarea
            class="form-control"
            placeholder="Description"
            @input="$emit('description', $event.target.value)"
            :value="value.description"
        />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Seo',
  props: {
    value: Object,
    text: {
      type: String,
      default: 'SEO блок'
    }
  },
  methods: {
    change() {
      this.$emit('change', this.seo)
    }
  },
}
</script>

<style scoped>
.seo {
  display: flex;
}

.seo-content {
  width: 100%;
}

p {
  display: flex;
}

label {
  width: 100px;
  min-width: 100px;
}

textarea {
  resize: vertical;
  min-height: 220px;
}
</style>
<template>
    <div class="seo general__margin">
        <label for="" class="general__text">{{text}}</label>
        <form class="seo-content">
            <p class="form-url">
                <label for="">URL</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="URL"
                    v-model="seo.url"
                    @input="change"
                >
            </p>

            <p class="form-title">
                <label for="">Title</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Title"
                    v-model="seo.title"
                    @input="change"
                >
            </p>

            <p class="form-keywords">
                <label for="">Keywords</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Keywords"
                    v-model="seo.keywords"
                    @input="change"
                >
            </p>

            <p class="form-description">
                <label for="">Description</label>
                <textarea 
                    class="form-control" 
                    placeholder="Description"
                    v-model="seo.description"
                    @input="change"
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
      data() {
        return {
          seo: {
            url: this.value.url,
            title: this.value.title,
            keywords: this.value.keywords,
            description: this.value.description,
          }
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
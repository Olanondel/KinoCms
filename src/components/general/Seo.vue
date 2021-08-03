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
                    :value="value.url"
                    @input="$emit('input', $event.target.value)"
                >
            </p>

            <p class="form-title">
                <label for="">Title</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Title"
                    :value="value.title"
                    @input="$emit('input', $event.target.value)"
                >
            </p>

            <p class="form-keywords">
                <label for="">Keywords</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Keywords"
                    :value="value.keywords"
                    @input="$emit('input', $event.target.value)"
                >
            </p>

            <p class="form-description">
                <label for="">Description</label>
                <textarea 
                    class="form-control" 
                    placeholder="Description"
                    :value="value.description"
                    @input="$emit('input', $event.target.value)"
                />
            </p>    
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Seo',
        props: {
            value: {
                type: Object,
                default: () => {
                    return {url: '', title: '', keywords: '', description: ''}
                }
            },
            text: {
              type: String,
              default: 'SEO блок'
            }
        },
        data() {
            return {
                data: {
                    url: this.value.url,
                    title: this.value.title,
                    keywords: this.value.keywords,
                    description: this.value.description
                }
            }
        },
        methods: {
            change() {
                this.$emit('change', this.data)
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
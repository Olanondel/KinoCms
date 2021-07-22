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
                    @input="change"
                    v-model="data.url"
                >
            </p>

            <p class="form-title">
                <label for="">Title</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Title"
                    @input="change"
                    v-model="data.title"
                >
            </p>

            <p class="form-keywords">
                <label for="">Keywords</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Keywords"
                    @input="change"
                    v-model="data.keywords"
                >
            </p>

            <p class="form-description">
                <label for="">Description</label>
                <textarea 
                    class="form-control" 
                    placeholder="Description" 
                    @input="change"
                    v-model="data.description"
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
            text: String
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
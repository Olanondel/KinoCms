<template>
    <div class="youtube-link general__margin">
        <label for="" class="general__text">{{text}}</label>
        <input 
            type="text" 
            class="youtube-link__input form-control" 
            placeholder="Ссылка на видео в Youtube"
            @input="change"
            v-model="link"
        >
    </div>
</template>

<script>
    export default {
        name: 'youtube-link',
        props: {
            text: {
                type: String,
                default: 'Ссылка на трейлер'
            },
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                link: this.value
            }
        },
        methods: {
            change() {
                this.$emit('change', this.link)
            }
        },
    }
</script>

<style scoped>
    .youtube-link {
        display: flex;
    }
</style>
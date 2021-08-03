<template>
    <div class="youtube-link general__margin">
        <label for="" class="general__text">{{text}}</label>
        <input 
            type="text" 
            class="youtube-link__input form-control" 
            :placeholder="text"
            :value="value"
            @input="$emit('input', $event.target.value)"
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
    }
</script>

<style scoped>
    .youtube-link {
        display: flex;
    }
</style>
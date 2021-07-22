<template>
  <div class="input-with-two-button general__margin">
    <label class="input-with-two-button__text general__text">{{text}}</label>
        <img :src="image || require('@/assets/image/empty.jpg')" class="input-with-two-button__image" alt="alt">
    
    <input @change="changeImage" type="file" name="file" :id="uId" style="display: none">
    <label class="btn btn-primary general__button" :for="uId">{{addText}}</label>
    <button @click="removeImage" class="btn btn-danger general__button">{{removeText}}</button>
  </div>
</template>

<script>
import lodash from 'lodash'

    export default {
        name: 'ImageWithTwoButton',
        props: {
            text: String,
            image: {
                type: String,
                default: ''
            },
            addText: String,
            removeText: String
        },
        data() {
            return {
                uId: null
            }
        },
        methods: {
            changeImage() {
                let fileInput = document.querySelector(`#${this.uId}`)
                let file = fileInput.files[0]

                this.$emit('changeImage', file)
            },
            removeImage() {
                this.$emit('removeImage')
            },
            setUniqueId() {
                this.uId = lodash.uniqueId('file'); 
            }
        },
        created() {
            this.setUniqueId()
        }
    }
</script>

<style scoped>

.input-with-two-button__image {
    max-width: 18%;
    min-width: 18%;
    width: 18%;
    margin-right: 35px;
    min-height: 194px;
    height: 194px;
}
</style>
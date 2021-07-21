<template>
    <div class="images-row__image-wrapper">
        <img 
            class="images-row__image" 
            :src="image || require('@/assets/image/empty.jpg')" 
            alt="alt" 
        />
        <input type="file" @change="change" class="rowFile" :id="uId" style="display: none">
        <label
            :for="uId" 
            class="btn btn-block btn-primary"
        >Добавить </label>
      </div>
</template>

<script>
import lodash from 'lodash'

    export default {
        props: { image: String, index: Number },
        methods: {
            change() {
                let fileInput = document.querySelector('#' + this.uId)
                let file = fileInput.files[0]

                this.$emit('change', file, this.index)
            },
            setUniqueId() {
                this.uId = lodash.uniqueId('imagesRow')
            }
        },
        data() {
            return {
                uId: null
            }
        },
        created() {
            this.setUniqueId()
        }
    }
</script>

<style scoped>
.images-row__image-wrapper {
    width: 20%;
    min-width: 20%;
    padding: 15px;
}

.images-row__image {
    width: 238px;
    height: 190px;
    margin-bottom: 18px;
    min-height: 178px;
    min-width: 238px;
}
</style>
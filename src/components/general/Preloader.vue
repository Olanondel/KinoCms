<template>
        <div class="preloader">
            <img src="@/assets/image/general/preloader.svg" alt="" class="preloader-image">
        </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

    .preloader {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 60vh;
        width: 100%;
    }

    .preloader-image {
        width: 320px;
        height: 320px;
        background-color: transparent;
    }
</style>
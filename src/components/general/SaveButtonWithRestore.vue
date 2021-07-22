<template>
    <div class="save-restore-btns general-margin">
        <button @click="save" class="btn btn-success btn-lg" :disabled="disabled">{{saveText}}</button>
        <button @click="restore" class="btn btn-warning btn-lg">{{restoreText}}</button>
    </div>
</template>

<script>
    export default {
        props: {
            disabled: Boolean,
            saveText: String,
            restoreText: String,
        },
        methods: {
            save() {
                this.$emit('save')
            },
            restore() {
                this.$emit('restore')
            }
        }
    }
</script>

<style scoped>
.save-restore-btns {
    display: flex;
    justify-content: center;
    gap: 30px;
}
</style>
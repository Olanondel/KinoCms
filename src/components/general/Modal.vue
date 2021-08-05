<template>
  <div data-v-b6cce874="" id="modal-default" class="modal fade show" text="modal text you are welcome!"
       style="display: block; padding-right: 17px;" aria-modal="true" role="dialog">
    <div data-v-b6cce874="" class="modal-dialog">
      <div data-v-b6cce874="" class="modal-content">
        <div data-v-b6cce874="" class="modal-header"><h4 data-v-b6cce874="" class="modal-title">Default Modal</h4>
          <button data-v-b6cce874="" type="button" data-dismiss="modal" aria-label="Close" class="close"><span
              data-v-b6cce874="" @click="close" aria-hidden="true">×</span></button>
        </div>
        <div data-v-b6cce874="" class="modal-body"><p data-v-b6cce874="">One fine body…</p></div>
        <div data-v-b6cce874="" class="modal-footer justify-content-between">
          <button data-v-b6cce874="" @click="close" type="button" data-dismiss="modal" class="btn btn-default">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modalText: String,
    btnText: String,
  },
  methods: {
    addModalStyles() {
      let body = document.querySelector('body')
      body.classList.toggle('modal-open')
    },
    close() {
      this.$emit('close')
    }
  },
  created() {
    this.addModalStyles()
  },
  destroyed() {
    this.addModalStyles()
  }
}
</script>

<style scoped>

</style>
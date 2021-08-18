<template>
  <div class="row general__margin">
    <div class="col-12">
      <!-- Default box -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"></h3>
        </div>
        <div class="card-body">

          <div class="flex" v-if="index">
            <SwitcherWithText v-model="state" />
          </div>

          <div>
            <InputWithText
                v-model="title"
                text="Название кинотеатра"
                class="mb"
                @input="changeTitle"
            />
            <TextAreaWithText
                text="Адресс"
                class="mb"
                v-model="address"
                @input="changeAddress"
            />
            <InputWithText
                v-model="coordinates"
                text="Координаты для карты"
                class="mb"
                @input="changeCoordinates"
            />
            <ImageWithTwoButton
                text="Лого"
                class="mb"
                addText="Добавить"
                removeText="Удалить"
                :image="cinema.logoImage"
                @changeImage="changeImage"
                @removeImage="removeImage"
            />
          </div>

        </div>
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import InputWithText from "../general/InputWithText";
import TextAreaWithText from "../general/TextAreaWithText";
import ImageWithTwoButton from "../general/ImageWithTwoButton";
import SwitcherWithText from "../general/SwitcherWithText";

export default {
  name: "CinemaForm",
  components: {SwitcherWithText, ImageWithTwoButton, TextAreaWithText, InputWithText},
  props: {
    index: Number,
    cinema: Object
  },
  data() {
    return {
      title: this.cinema.title,
      address: this.cinema.address,
      coordinates: this.cinema.coordinates,
      logoImage: this.cinema.logoImage,
      state: this.cinema.state
    }
  },
  methods: {
    changeTitle() {
      this.$emit('changeTitle', this.title, this.index)
    },
    changeAddress() {
      this.$emit('changeAddress', this.address, this.index)
    },
    changeCoordinates() {
      this.$emit('changeCoordinates', this.coordinates, this.index)
    },
    changeImage(file) {
      this.$emit('changeImage', file, this.index)
    },
    removeImage() {
      this.$emit('removeImage', this.index)
    }
  },
  watch: {
    state() {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<style>
.mb {
  margin-bottom: 20px;
}

.flex {
  display: flex;
  justify-content: flex-end;
}
</style>
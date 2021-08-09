<template>
  <div class="top-slider">
    <h2 class="top-slider__title banners-title">
      На главной верх
      <Switcher class="banners-switcher" @stateChanged="showToggle" />
    </h2>
    <div class="top-slider__content top-content" v-show="showTopSliderConfig">
      <div class="top-slider__text top-text">Размер: 1000х190</div>
      <div class="top-slider__top">
        <div class="top-slider__slides">
          <SlideEdit
            @removeSlide="removeSlide"
            @editUrl="editUrl"
            @editText="editText"
            @changeImage="changeImage"
            v-for="(slide, index) in slides"
            :index="index"
            :slideUrl="slide.url"
            :slideText="slide.text"
            :key="slide.id"
            :slideImage="slide.image"
          />
        </div>

        <div class="top-slider__add-button">
          <a @click="addSlide" class="btn btn-app">
            <i class="fas fa-play"></i> Добавить фото
          </a>
        </div>
      </div>

      <div class="top-slider__bottom">
        <div class="top-slider__speed">
          <div class="form-group">
            <label>Скорость вращения</label>
            <select
              class="form-control select2bs4 select2-hidden-accessible"
              style="width: 100%"
              data-select2-id="17"
              tabindex="-1"
              aria-hidden="true"
              v-model="sliderSpeed"
            >
              <option selected data-select2-id="19">2</option>
              <option data-select2-id="81">4</option>
              <option data-select2-id="82">6</option>
            </select>
          </div>
        </div>

        <button
          @click="saveSliderSettings"
          class="btn bg-gradient-success save-btn"
          :disabled="isFetching"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SlideEdit from "@/components/banners/topSlider/SlideEdit";
import Switcher from "@/components/general/Switcher.vue";
import db from "@/firebase/firebaseInit";
import firebase from "firebase";
import "firebase/firestore";

export default {
  components: {
    SlideEdit,
    Switcher,
  },
  data() {
    return {
      slides: [],
      slideImageFiles: [],
      sliderSpeed: 2,
      showTopSliderConfig: null,
      isFetching: false,
      isInit: false,
    };
  },
  methods: {
    addSlide() {
      this.slides.push({
        id: +Math.random(),
        image: "../../assets/image/empty.jpg",
        text: "",
        url: "",
        imageChanged: null,
      });
    },
    removeSlide(index) {
      this.slides.splice(index, 1);
    },
    showToggle(status) {
      this.showTopSliderConfig = status;
    },

    async setImageRef(slide) {
        const storageRef = firebase.storage().ref();

        let ref = storageRef.child(
          `Banners&Sliders/TopSlider/${"slide" + slide}`
        );

        await ref.put(this.slideImageFiles[slide])
        let link = await ref.getDownloadURL()
        this.slides[slide].image = link
    },

    async saveSliderSettings() {
      this.isFetching = true

      await Promise.all(this.slides.map(async (slide, index) => {
        if (slide.imageChanged) {
          await this.setImageRef(index);
          this.slides[index].imageChanged = false;
        }
      }))

      this.slides.imagesFiles = []

      const topSliderConfig = db.collection("topSliderConfig").doc("topSliderConfig");

      await topSliderConfig.set({
        slidesConfig: this.slides,
        speed: this.sliderSpeed,
      });

      this.isFetching = false
    },

    async getTopSliderConfig() {
      const slides = await db.collection("topSliderConfig").get();
      const data = slides.docs[0].data();
      this.slides = data.slidesConfig;
      this.sliderSpeed = data.speed;
      this.isInit = true
    },
    editUrl(index, value) {
      this.slides[index].url = value;
    },
    editText(index, value) {
      this.slides[index].text = value;
      console.log(index);
    },
    changeImage(index, file) {
      let reader = new FileReader();
      this.slideImageFiles[index] = file

      reader.onload = () => {
        this.slides[index].image = reader.result;
        this.slides[index].imageChanged = true;
      };

      reader.readAsDataURL(file);
    },
  },
  created() {
    this.getTopSliderConfig();
  },
};
</script>

<style>
.top-slider {
  margin: 30px 0 0 0;
}

.top-slider__top {
  display: flex;
  justify-content: space-between;
  margin: 25px 0 40px 0;
}

.top-slider__slides {
  display: flex;
  flex-wrap: nowrap;
  max-width: 85%;
  overflow-x: auto;
}

.top-slider__add-button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.top-slider__speed {
  max-width: 260px;
  width: 260px;
  display: inline-block;
  margin: 0 60px 0 30px;
}

.top-slider__speed .form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}

.top-slider__speed label {
  margin-top: 6px;
}

.top-slider__speed select {
  max-width: 80px;
}

.save-btn {
  max-width: 200px;
}
</style>
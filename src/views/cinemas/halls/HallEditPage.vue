<template>
  <div class="hall-edit-page">
    <InputWithText :text="hallLang.hallNumber" v-model="hallNumber" />

    <TextAreaWithText :text="hallLang.description" v-model="description" />

    <ImageWithTwoButton
        :text="hallLang.scheme"
        :image="hallSchemeImage"
        :addText="hallLang.addText"
        :removeText="hallLang.removeText"
        @removeImage="removeHallSchemeImage"
        @changeImage="changeHallSchemeImage"
    />

    <ImageWithTwoButton
        :text="hallLang.topBanner"
        :image="topBannerImage"
        :addText="hallLang.addText"
        :removeText="hallLang.removeText"
        @removeImage="removeTopBannerImage"
        @changeImage="changeTopBannerImage"
    />

    <ImageRow
        :data="images"
        :text="hallLang.imageRowSizeText"
        :btnText="hallLang.imageRowButtonText"
        @change="changeRowImage"
    />

    <Seo
      @url="editSeoUrl"
      @title="editSeoTitle"
      @keywords="editSeoKeywords"
      @description="editSeoDescription"
      :value="seo"
    />

    <SaveButton :text="hallLang.saveButtonText" @saveEvent="saveHall" />

  </div>
</template>

<script>
import InputWithText from "../../../components/general/InputWithText";
import TextAreaWithText from "../../../components/general/TextAreaWithText";
import ImageWithTwoButton from "../../../components/general/ImageWithTwoButton";
import ImageRow from "../../../components/general/imagesRow/ImagesRow";
import Seo from "../../../components/general/Seo";
import SaveButton from "../../../components/general/SaveButton";
import {mapGetters} from 'vuex'

export default {
  name: "HallEditPage",
  components: {SaveButton, Seo, ImageRow, ImageWithTwoButton, TextAreaWithText, InputWithText},
  props: {
    halls: {
      type: Array
    },
    hallLang: Object,
    hallsCurrentLang: String
  },
  data() {
    return {
      hallNumber: '',
      description: '',
      hallSchemeImage: '',
      hallSchemeImageFile: null,
      topBannerImage: '',
      topBannerImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      isFetching: false,
      seo: {url: '', title: '', keywords: '', description: '',},
      date: '',
      id: this.$route.params.id || ''
    }
  },
  methods: {
    changeLang(lang) {
      this.currentLang = lang
      this.$emit('changeHallLang', lang)
    },
    editSeoUrl(url) {
      this.seo.url = url
    },
    editSeoTitle(title) {
      this.seo.title = title
    },
    editSeoKeywords(keywords) {
      this.seo.keywords = keywords
    },
    editSeoDescription(description) {
      this.seo.description = description
    },
    changeSeo(data) {
      this.seo = data
    },
    getLang() {
      this.$emit('getLang')
    },
    removeHallSchemeImage() {
      this.hallSchemeImage = ''
      this.hallSchemeImageFile = ''
    },
    changeHallSchemeImage(file) {
      this.hallSchemeImageFile = file
      let reader = new FileReader()

      reader.onload = () => this.hallSchemeImage = reader.result

      reader.readAsDataURL(file)
    },
    removeTopBannerImage() {
      this.topBannerImage = ''
      this.topBannerImageFile = ''
    },
    changeTopBannerImage(file) {
      this.topBannerImageFile = file
      let reader = new FileReader()

      reader.onload = () => this.topBannerImage = reader.result

      reader.readAsDataURL(file)
    },
    changeRowImage(file, index) {
      this.imagesFiles.push({file, index})
      let reader = new FileReader()

      reader.onload = () => this.images.splice(index, 1, reader.result)

      reader.readAsDataURL(file)
    },
    saveHall() {
        if (this.hallNumber) {
          this.$emit('saveHall', this.$route.params.index, {
            hallNumber: this.hallNumber,
            description: this.description,
            hallSchemeImage: this.hallSchemeImage,
            hallSchemeImageFile: this.hallSchemeImageFile,
            topBannerImage: this.topBannerImage,
            topBannerImageFile: this.topBannerImageFile,
            images: this.images,
            imagesFiles: this.imagesFiles,
            seo: this.seo,
            date: this.getDate(),
            id: this.id === 'addCinema' ? '' : this.id
          })

          this.$router.go(-1)
        }
    },
    getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return today = dd + '-' + mm + '-' + yyyy;
    },
    createHall() {
      this.$emit('createHall')
    },
    getHallData() {
      let hallIndex = this.$route.params.index

      if(hallIndex || hallIndex === 0) {
        let data = this.halls[hallIndex]

        for (let [key, value] of Object.entries(data)) {
          this[key] = value
        }
      }
    }
  },
  computed: mapGetters(["currentLang"]),
  watch: {
    currentLang() {
      this.$router.go(-1)
    }
  },
  async created() {
    await this.getHallData()
    await this.getLang()
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
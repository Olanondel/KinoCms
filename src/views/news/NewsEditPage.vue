<template>
  <section class="newsEditPage">
    <Language :currentLang="currentLang" @changeLang="changeLang">
      <SwitcherWithText v-model="state" :stateText="stateText" />
    </Language>

    <div class="row-wrap">
      <div>
        <InputWithText
            :text="lang.title"
            v-model="title"
        />
      </div>
      <div>
        <DateWithText v-model="date" />
      </div>
    </div>

    <TextAreaWithText
        v-model="description"
        :text="lang.description"
    />

    <ImageWithTwoButton
      :image="mainImage"
      :text="lang.mainImageText"
      :addText="lang.addText"
      :removeText="lang.removeText"
      @changeImage="changeMainImage"
      @removeImage="removeMainImage"
    />

    <ImageRow
        :data="images"
        :text="lang.imageRowText"
        :btnText="lang.addText"
        @change="changeRowImage"
    />

    <YoutubeLink
      :text="lang.youtubeText"
      v-model="youtubeLink"
    />

    <Seo :value="seo" @change="changeSeo" />

    <SaveButton :isFetching="isFetching" @saveEvent="save" :text="lang.saveBtnText" />


  </section>
</template>

<script>
import SwitcherWithText from "../../components/general/SwitcherWithText";
import Language from "../../components/general/Language";
import InputWithText from "../../components/general/InputWithText";
import TextAreaWithText from "../../components/general/TextAreaWithText";
import ImageWithTwoButton from "../../components/general/ImageWithTwoButton";
import YoutubeLink from "../../components/general/YoutubeLink";
import Seo from "../../components/general/Seo";
import SaveButton from "../../components/general/SaveButton";
import server from '@/requests/newsPage'
import ImageRow from "../../components/general/imagesRow/ImagesRow";
import DateWithText from "../../components/general/DateWithText";
export default {
  name: "NewsEditPage",
  components: {
    DateWithText,
    ImageRow,
    SaveButton,
    Seo, YoutubeLink, ImageWithTwoButton, TextAreaWithText, InputWithText, Language, SwitcherWithText},
  data() {
    return {
      title: '',
      date: '',
      currentLang: 'ru',
      state: true,
      stateText: 'ВКЛ',
      description: '',
      mainImage: '',
      mainImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      youtubeLink: '',
      id: '',
      init: false,
      isFetching: false,
      seo: {
        url: '', title: '', keywords: '', description: ''
      },

      lang: {}
    }
  },
  methods: {
    getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return today = dd + '-' + mm + '-' + yyyy;
    },
    changeRowImage(file, index) {
      this.imagesFiles.push({file, index})
      let reader = new FileReader()

      reader.onload = () => this.images.splice(index, 1, reader.result)

      reader.readAsDataURL(file)
    },
    changeState(state) {
      this.state = state
    },
    async changeLang(lang) {
      this.currentLang = lang

      let result = await server.getLang(this.currentLang)

      this.lang = result.data()
    },
    getLang() {
      if (!this.currentLang) {
        this.currentLang = navigator.language || navigator.userLanguage
      }

      this.changeLang(this.currentLang)
    },
    changeDate(date) {
      this.date = date
    },
    changeSeo(seo) {
      this.seo = seo
    },
    async getData() {
      let id = this.$route.params.id

      if (id) {
        let data = await server.getNewsData(id)

        for (let value in data) {
          this[value] = data[value]
        }
      } else {
        this.init = true
      }
    },
    async save() {
      this.isFetching = true
      this.id = await server.getId(this.id)

      if (!this.date) {
        this.date = this.getDate()
      }

      await server.save(this.$data)
      this.isFetching = false
      this.$router.push({name: 'news'})
    },
    removeMainImage() {
      this.mainImage = ''
      this.mainImageFile = null
    },
    changeMainImage(file) {
      this.mainImageFile = file

      let reader = new FileReader()

      reader.onload =  () => { this.mainImage = reader.result }

      reader.readAsDataURL(file)
    },
  },
  watch: {
    state: function () {
      if (this.state) { this.stateText = 'ВКЛ' }
      else { this.stateText = 'ВЫКЛ' }
    }
  },
  mounted() {
    this.getLang()
    this.getData()
  },
  created() {
  }
}
</script>

<style scoped>
.row-wrap {
  display: flex;
  gap: 40px;
}

.row-wrap > div {
  width: 50%;
}
</style>
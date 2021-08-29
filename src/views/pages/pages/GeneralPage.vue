<template>
  <Preloader v-if="!init"/>

  <section v-else class="newsEditPage">
    <Language :currentLang="currentLang" @changeLang="changeLang">
      <SwitcherWithText v-model="state" :stateText="stateText"/>
    </Language>

    <InputWithText
        :text="lang.title"
        v-model="title"
    />

    <TextAreaWithText
        v-model="description"
        :text="lang.description"
    />

    <ImageWithTwoButton
        :image="mainImage"
        :text="lang.mainImage"
        :addText="lang.addButton"
        :removeText="lang.removeButton"
        @changeImage="changeMainImage"
        @removeImage="removeMainImage"
    />

    <ImageRow
        :data="images"
        :text="lang.rowImageSize"
        :btnText="lang.addButton"
        @change="changeRowImage"
    />

    <Seo
        :value="seo"
        @url="editSeoUrl"
        @title="editSeoTitle"
        @keywords="editSeoKeywords"
        @description="editSeoDescription"
    />

    <SaveButton
        :isFetching="isFetching"
        :text="lang.saveButton"
        @saveEvent="save"
    />


  </section>
</template>

<script>
import SwitcherWithText from "@/components/general/SwitcherWithText";
import Language from "@/components/general/Language";
import InputWithText from "@/components/general/InputWithText";
import TextAreaWithText from "@/components/general/TextAreaWithText";
import ImageWithTwoButton from "@/components/general/ImageWithTwoButton";
import Seo from "@/components/general/Seo";
import SaveButton from "@/components/general/SaveButton";
import server from '@/requests/requests'
import ImageRow from "@/components/general/imagesRow/ImagesRow";
import db from '@/firebase/firebaseInit.js'
import Preloader from "@/components/general/Preloader";

export default {
  name: "GeneralPage",
  components: {
    Preloader,
    ImageRow,
    SaveButton,
    Seo, ImageWithTwoButton, TextAreaWithText, InputWithText, Language, SwitcherWithText
  },
  data() {
    return {
      title: '',
      date: '',
      currentLang: 'ru',
      state: null,
      stateText: 'ВЫКЛ',
      description: '',
      mainImage: '',
      mainImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      notDelete: false,
      id: '',
      init: false,
      isFetching: false,
      to: '',
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

      let result = await server.getLang(this.currentLang, db.collection('Language').doc('Pages').collection('aboutCinema').doc(lang))

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
    async getData() {
      if (this.$route.params.id !== 'addPage') {
        let data = await server.getCurrentData(this.$route.params.id, 'Pages')

        for (let [key, value] of Object.entries(data)) {
          this[key] = value
        }
      } else {
        this.init = true
      }
    },
    async save() {
      this.isFetching = true

      if (!this.date) {
        this.date = this.getDate()
      }

      await server.save({
        title: this.title,
        date: this.getDate(),
        currentLang: this.currentLang,
        state: this.state,
        stateText: this.stateText,
        description: this.description,
        mainImage: this.mainImage,
        images: this.images,
        id: await server.getId(this.id, 'Pages'),
        to: 'general',
        notDelete: this.notDelete,
        init: true,
        isFetching: false,
        seo: this.seo,
      }, 'Pages', this.mainImageFile, this.images, this.imagesFiles, this.$route.params.id)
      this.isFetching = false
      await this.$router.push({name: 'pages'})
    },
    removeMainImage() {
      this.mainImage = ''
      this.mainImageFile = null
    },
    changeMainImage(file) {
      this.mainImageFile = file

      let reader = new FileReader()

      reader.onload = () => {
        this.mainImage = reader.result
      }

      reader.readAsDataURL(file)
    },
  },
  watch: {
    state: function () {
      if (this.state) {
        /* eslint-env jquery */
        this.stateText = 'ВКЛ'
        $("[name='my-checkbox']").bootstrapSwitch('state', true)
      } else {
        this.stateText = 'ВЫКЛ'
        $("[name='my-checkbox']").bootstrapSwitch('state', false)
      }
    }
  },
  async mounted() {
    await this.getData()
    await this.getLang()
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
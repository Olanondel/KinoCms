<template>
  <section class="newsEditPage">

    <div class="switcher">
      <SwitcherWithText class="margin " v-model="state" :stateText="stateText" />
    </div>

    <hr>

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

    <Seo
        :value="seo"
        @url="editSeoUrl"
        @title="editSeoTitle"
        @keywords="editSeoKeywords"
        @description="editSeoDescription"
    />

    <SaveButton :isFetching="isFetching" @saveEvent="save" :text="lang.saveBtnText" />


  </section>
</template>

<script>
import SwitcherWithText from "../../components/general/SwitcherWithText";
import InputWithText from "../../components/general/InputWithText";
import TextAreaWithText from "../../components/general/TextAreaWithText";
import ImageWithTwoButton from "../../components/general/ImageWithTwoButton";
import YoutubeLink from "../../components/general/YoutubeLink";
import Seo from "../../components/general/Seo";
import SaveButton from "../../components/general/SaveButton";
import server from '@/requests/newsPage'
import ImageRow from "../../components/general/imagesRow/ImagesRow";
import DateWithText from "../../components/general/DateWithText";
import {mapGetters} from 'vuex'

export default {
  name: "NewsEditPage",
  components: {
    DateWithText,
    ImageRow,
    SaveButton,
    Seo, YoutubeLink, ImageWithTwoButton, TextAreaWithText, InputWithText, SwitcherWithText},
  data() {
    return {
      title: '',
      date: '',
      state: true,
      stateText: 'ВКЛ',
      description: '',
      mainImage: '',
      mainImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      youtubeLink: '',
      id: '',
      to: '',
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
    async changeLang() {

      let result = await server.getLang(this.currentLang)

      this.lang = result.data()
      console.log(this.lang)
    },
    getLang() {
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
        let data = await server.getNewsData(id, this.currentLang)

        if (data) {
          for (let value in data) {
            this[value] = data[value]
          }
        } else {
            this.title = '',
            this.date = '',
            this.state = true,
            this.stateText = 'ВКЛ',
            this.description = '',
            this.mainImage = '',
            this.mainImageFile = null,
            this.images = ['', '', '', '', ''],
            this.imagesFiles = [],
            this.youtubeLink = '',
            this.id = id,
            this.to = 'newsEdit',
            this.isFetching = false,
            this.seo = {
              url: '', title: '', keywords: '', description: ''
            }
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

      await server.save(this.$data, this.currentLang)
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
    },
    currentLang() {
      this.getLang()
      this.getData()
    }
  },
  computed: mapGetters(["currentLang"]),
  async mounted() {
    await this.getData()
    await this.getLang()
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

.switcher {
  display: flex;
  justify-content: flex-end;
}

.margin {
  margin: 5px 150px 0 0;
  align-items: center;
}
</style>
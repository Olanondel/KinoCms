<template>
  <Preloader v-if="!init"/>

  <section v-else class="newsEditPage">

    <div class="switcher">
      <SwitcherWithText class="margin" v-model="state" :stateText="stateText"/>
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
        <DateWithText :text="lang.date" v-model="date"/>
      </div>
    </div>

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

    <YoutubeLink
        :text="lang.youtubeLink"
        v-model="youtubeLink"
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
import SwitcherWithText from "../../../components/admin/general/SwitcherWithText";
import InputWithText from "../../../components/admin/general/InputWithText";
import TextAreaWithText from "../../../components/admin/general/TextAreaWithText";
import ImageWithTwoButton from "../../../components/admin/general/ImageWithTwoButton";
import YoutubeLink from "../../../components/admin/general/YoutubeLink";
import Seo from "../../../components/admin/general/Seo";
import SaveButton from "../../../components/admin/general/SaveButton";
import server from '../../../requests/admin/requests'
import ImageRow from "../../../components/admin/general/imagesRow/ImagesRow";
import DateWithText from "../../../components/admin/general/DateWithText";
import db from '../../../firebase/firebaseInit.js'
import Preloader from "../../../components/admin/general/Preloader";
import {mapGetters} from 'vuex'

export default {
  name: "PromotionsEditPage",
  components: {
    Preloader,
    DateWithText,
    ImageRow,
    SaveButton,
    Seo, YoutubeLink, ImageWithTwoButton, TextAreaWithText, InputWithText, SwitcherWithText
  },
  data() {
    return {
      title: '',
      date: '',
      state: null,
      stateText: 'ВЫКЛ',
      description: '',
      mainImage: '',
      mainImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      youtubeLink: '',
      id: '',
      to: 'promotionEdit',
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

      let result = await server.getLang(this.currentLang, db.collection('Language').doc('Promotions').collection('Promotions').doc(this.currentLang))

      this.lang = result.data()
    },
    async getLang() { await this.changeLang(this.currentLang) },
    changeDate(date) {
      this.date = date
    },
    changeSeo(seo) {
      this.seo = seo
    },
    async getData() {
      let id = this.$route.params.id

      if (id && id !== 'addPromotion') {
        let data = await server.getCurrentData(id, 'Promotions', this.currentLang)

        if (data) {
          for (let value in data) {
            this[value] = data[value]
          }
        } else {
          Object.assign(this.$data, this.$options.data.call(this), {lang: this.lang, init: true, id: this.id, to: 'promotionEdit'})
        }
      } else {
        this.init = true
      }
    },
    async save() {
      this.isFetching = true
      this.id = await server.getId(this.id, 'Promotions', this.currentLang)

      if (!this.date) {
        this.date = this.getDate()
      }

      await server.save({
        title: this.title,
        date: this.date,
        stateText: this.stateText,
        description: this.description,
        mainImage: this.mainImage,
        images: this.images,
        youtubeLink: this.youtubeLink,
        state: this.state,
        id: this.id,
        to: this.to,
        init: true,
        seo: this.seo,
        isFetching: false
      }, 'Promotions', this.mainImageFile, this.images, this.imagesFiles, null, this.currentLang)
      this.isFetching = false
      await this.$router.push({name: 'promotions'})
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
        $('#toggle-demo').bootstrapToggle('on')
      } else {
        this.stateText = 'ВЫКЛ'
        $('#toggle-demo').bootstrapToggle('off')
      }
    },
    currentLang() {
      Promise.all([this.getLang(), this.getData()])
    }
  },
  computed: mapGetters(['currentLang']),
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

.switcher {
  display: flex;
  justify-content: flex-end;
}

.margin {
  margin: 5px 150px 0 0;
  align-items: center;
}
</style>
<template>
  <Preloader v-if="!init"/>
  <div class="film-edit" v-else>

    <div class="film-edit__content">
      <InputWithText :text="lang.title" v-model="name"/>
      <TextAreaWithText :text="lang.description" v-model="description"/>

      <ImageWithTwoButton
          :text="lang.mainImage"
          @removeImage="removeImage"
          @changeImage="changeImage"
          :image="mainImage"
          :addText="lang.addText"
          :removeText="lang.removeText"
      />
      <ImagesRow
          @change="changeImages"
          :data="images"
          :text="lang.size"
          :btnText="lang.imageRowText"
      />
      <YoutubeLink :link="trailer" v-model="trailer" :text="lang.trailer"/>
      <FilmType
          @change="changeTypes"
          :value="types"
          :text="lang.type"
      />
      <Seo
          :text="lang.seo"
          :value="seo"
          @url="editSeoUrl"
          @title="editSeoTitle"
          @keywords="editSeoKeywords"
          @description="editSeoDescription"
      />

      <SaveButtonWithRestore
          @restore="restore"
          @save="savePageData"
          :disabled="isRequesting"
          :saveText="lang.save"
          :restoreText="lang.restore"
      />
    </div>
  </div>
</template>

<script>
import db from "../../../firebase/firebaseInit";
import ImagesRow from "@/components/admin/general/imagesRow/ImagesRow.vue";
import ImageWithTwoButton from "../../../components/admin/general/ImageWithTwoButton.vue";
import InputWithText from "../../../components/admin/general/InputWithText.vue";
import TextAreaWithText from "../../../components/admin/general/TextAreaWithText.vue";
import YoutubeLink from "../../../components/admin/general/YoutubeLink.vue";
import Seo from "../../../components/admin/general/Seo.vue";
import SaveButtonWithRestore from "../../../components/admin/general/SaveButtonWithRestore.vue";
import FilmType from "../../../components/admin/films/FilmType.vue";
import firebase from "firebase";
import Preloader from "../../../components/admin/general/Preloader.vue";
import {mapGetters} from 'vuex'

export default {
  components: {
    InputWithText,
    TextAreaWithText,
    ImageWithTwoButton,
    ImagesRow,
    YoutubeLink,
    Seo,
    SaveButtonWithRestore,
    FilmType,
    Preloader,
  },
  data() {
    return {
      name: "",
      description: "",
      mainImage: "",
      mainImageWasEdit: false,
      mainImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      trailer: "",
      types: [],
      seo: {url: "", title: "", keywords: "", description: ""},
      isRequesting: false,
      init: false,
      langData: null,
      lang: null,
      from: '',
      error: ''
    };
  },
  methods: {
    changeLang() {
      this.getLang()
    },
    async getLang() {
      let lang = await db.collection('Language').doc('FilmEditPage').get()

      let data = lang.data()

      this.lang = data[this.currentLang]

      this.init = true

    },
    removeImage() {
      this.mainImage = "";
    },
    changeImage(file) {
      this.mainImageFile = file;

      let reader = new FileReader();

      reader.onload = () => {
        this.mainImage = reader.result;
        this.mainImageWasEdit = true;
      };

      reader.readAsDataURL(file);
    },
    changeTypes(data) {
      this.types = data;
    },
    changeImages(file, index) {
      this.imagesFiles.push({
        index,
        file
      })

      let reader = new FileReader();

      reader.onload = () => {
        this.images.splice(index, 1, reader.result);
      };

      reader.readAsDataURL(file);
    },
    restore() {
      this.getPageData()
    },
    async removeFilm() {
      let id = this.$route.params.id;
      let from = this.$route.params.from;

      if (id !== 'addToCurrent' && id !== 'addToFuture') {
        await db.collection(from).doc(id).delete()
        await this.$router.push({name: 'films'})
      }
    },
    async saveMainImage(id, from) {

      if (this.mainImageWasEdit) {
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child(`Films/${from}/${id}/${this.currentLang}/mainImage.jpg`);

        await imageRef.put(this.mainImageFile)
        this.mainImage = await imageRef.getDownloadURL()
      }
    },
    async saveImages(id, from) {
      let storageRef = firebase.storage().ref();

      if (this.imagesFiles.length) {

        await Promise.all(
            this.imagesFiles.map(async file => {
              let imageRef = storageRef.child(`Films/${from}/${id}/${this.currentLang}/RowImage/image-${file.index}.jpg`);

              await imageRef.put(file.file)
              this.images.splice(file.index, 1, await imageRef.getDownloadURL())
            })
        )

      }
    },
    async saveToDataBase(id, from) {
      let doc = db.collection('Films').doc(from)
          .collection(this.currentLang).doc(id)

      await doc.set({
        id: id,
        name: this.name,
        description: this.description,
        mainImage: this.mainImage,
        images: this.images,
        trailer: this.trailer,
        types: this.types,
        seo: this.seo,
        from: from
      });

      this.$router.push({name: "films"});
    },
    async savePageData() {
      this.isRequesting = true

      let id
      let from = this.$route.params.from

      if (!from && this.$route.params.id === 'addToCurrent') {
        from = 'currentFilms'
      }
      if (!from && this.$route.params.id === 'addToFuture') {
        from = 'futureFilms'
      }

      if (this.$route.params.id !== 'addToCurrent' && this.$route.params.id !== 'addToFuture') {
        id = this.$route.params.id
      } else {
        let ref = await db.collection('Films').doc(from).collection(this.currentLang).doc()
        id = ref.id
      }

      await this.saveImages(id, from)
      await this.saveMainImage(id, from)

      await this.saveToDataBase(id, from)

      this.isRequesting = false
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
    async getPageData() {

      this.getLang()

      if (
          this.$route.params.id !== "addToCurrent" &&
          this.$route.params.id !== "addToFuture"
      ) {
        let from = this.from || this.$route.params.from

        let dataLink = db.collection('Films').doc(from)
            .collection(this.currentLang)
            .doc(this.$route.params.id);

        let result = await dataLink.get()
        let data = result.data()

        if (data) {
          for (let [key, value] of Object.entries(data)) {
            this[key] = value
          }
        } else {
          this.name = "",
              this.description = '',
              this.mainImage = "",
              this.mainImageWasEdit = false,
              this.mainImageFile = null,
              this.images = ['', '', '', '', ''],
              this.imagesFiles = [],
              this.trailer = "",
              this.types = [],
              this.seo = {url: "", title: "", keywords: "", description: ""},
              from = this.from
        }
      }

      this.init = true;
    }
  },
  computed: mapGetters(['currentLang']),
  watch: {
    currentLang() {
      this.getPageData()
    }
  },
  async mounted() {
    await this.getLang()
    await this.getPageData()
  }
}
</script>

<style>
</style>
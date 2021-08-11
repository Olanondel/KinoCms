<template>
  <Preloader v-if="!init"/>
  <div class="film-edit" v-else>
    <Language @changeLang='changeLang' :currentLang="currentLang" />

    <div class="film-edit__content">
      <InputWithText :text="lang.title" v-model="name" />
      <TextAreaWithText :text="lang.description" v-model="description" />

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
      <YoutubeLink :link="trailer" v-model="trailer" :text="lang.trailer" />
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
          @restore="clearData"
          @save="savePageData"
          :disabled="isRequesting"
          :saveText="lang.save"
          :restoreText="lang.restore"
      />
    </div>
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
import ImagesRow from "@/components/general/imagesRow/ImagesRow.vue";
import ImageWithTwoButton from "../../components/general/ImageWithTwoButton.vue";
import InputWithText from "../../components/general/InputWithText.vue";
import Language from "../../components/general/Language.vue";
import TextAreaWithText from "../../components/general/TextAreaWithText.vue";
import YoutubeLink from "../../components/general/YoutubeLink.vue";
import Seo from "../../components/general/Seo.vue";
import SaveButtonWithRestore from "../../components/general/SaveButtonWithRestore.vue";
import FilmType from "../../components/films/FilmType.vue";
import firebase from "firebase";
import Preloader from "../../components/general/Preloader.vue";

export default {
  components: {
    InputWithText,
    Language,
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
      currentLang: '',
      langData: null,
      lang: null,
      error: ''
    };
  },
  methods: {
    changeLang(value) {
      this.currentLang = value

      this.getLang()
    },
    async getLang() {
      if (!this.langData) {
        let lang = await db.collection('Language').doc('FilmEditPage').get()

        this.langData = lang.data()
      }

      if (!this.currentLang) {
        let userLang = navigator.language || navigator.userLanguage;
        this.lang = this.langData[userLang]
        this.currentLang = userLang
      } else if (this.currentLang === 'ua') {
        this.lang = this.langData['ua']
        this.currentLang = 'ua'
      } else {
        this.lang = this.langData['ru']
        this.currentLang = 'ru'
      }
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
    clearData() {
      this.name = "";
      this.description = "";
      this.mainImage = "";
      this.mainImageFile = null;
      this.mainImageWasEdit = false;
      this.images = ["", "", "", "", ""];
      this.imagesFiles = [];
      this.trailer = "";
      this.types = [];
      this.seo.url = "";
      this.seo.title = "";
      this.seo.keywords = "";
      this.seo.description = "";
      this.isRequesting = false;
    },
    async removeFilm() {
      let id = this.$route.params.id;
      let from = this.$route.params.from;

      if (id !== 'addToCurrent' && id !== 'addToFuture') {
        await db.collection(from).doc(id).delete()
        this.$router.push({name: 'films'})
      }
    },
    async saveMainImage() {

      if (this.mainImageWasEdit) {
        this.isRequesting = true;
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child("Films/mainImage.jpg");

        await imageRef
            .put(this.mainImageFile)
            .then(() => imageRef.getDownloadURL())
            .then(link => {
              this.mainImage = link;
              this.mainImageWasEdit = false;
            });
      }
    },
    async saveImages() {
      let storageRef = firebase.storage().ref();

      if (this.imagesFiles.length) {

        await this.imagesFiles.forEach(file => {
          let imageRef = storageRef.child(`Films/RowImage/image-${file.index}.jpg`);

          imageRef.put(file.file)
              .then(() => imageRef.getDownloadURL())
              .then((link) => {
                this.images.splice(file.index, 1, link)
              })

        })

      }
    },
    async saveToDataBase() {

      this.isRequesting = true;

      let id = this.$route.params.id;
      let from = this.$route.params.from;
      let doc;

      if (id === "addToCurrent") doc = await db.collection("CurrentFilms").doc();
      else if (id === "addToFuture") doc = await db.collection("FutureFilms").doc();
      else doc = await db.collection(from).doc(id);

      await doc.set({
        currentLang: this.currentLang,
        id: doc.id,
        name: this.name,
        description: this.description,
        mainImage: this.mainImage,
        images: this.images,
        trailer: this.trailer,
        types: this.types,
        seo: this.seo,
      });

      this.isRequesting = false;
      await this.$router.push({name: "films"});
    },
    async savePageData() {
      if (this.name && this.description && this.mainImage) {
        this.isRequesting = true
        await this.saveImages()
        await this.saveMainImage()
        setTimeout(() => { this.saveToDataBase() }, 1500)
        this.isRequesting = false
      } else {
        await this.removeFilm()
      }
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
      if (
          this.$route.params.id !== "addToCurrent" &&
          this.$route.params.id !== "addToFuture"
      ) {
        let dataLink = db
            .collection(this.$route.params.from)
            .doc(this.$route.params.id);

        let data;

        await dataLink.get().then((d) => (data = d.data()));

        this.name = data.name;
        this.description = data.description;
        this.mainImage = data.mainImage;
        this.images = data.images;
        this.trailer = data.trailer;
        this.types = data.types;
        this.seo.url = data.seo.url;
        this.seo.title = data.seo.title;
        this.seo.keywords = data.seo.keywords;
        this.seo.description = data.seo.description;
        this.currentLang = data.currentLang
      }
      await this.getLang()
      this.init = true;
    }
  },
  computed: {},
  async created() {
    await this.getPageData();
  }
}
</script>

<style>
</style>
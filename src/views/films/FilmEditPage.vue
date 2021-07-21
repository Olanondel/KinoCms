<template>
  <Preloader v-if="!init" />
  <div class="film-edit" v-else>
    <Language />

    <div class="film-edit__content">
      <InputWithText
        text="Название фильма"
        :value="name"
        @change="changeName"
      />
      <TextAreaWithText
        text="Описание"
        :value="description"
        @change="changeDescription"
      />
      <ImageWithTwoButton
        text="Главная картинка"
        @removeImage="removeImage"
        @changeImage="changeImage"
        :image="mainImage"
      />
      <ImagesRow @change="changeImages" :data="images" />
      <YoutubeLink @change="changeTrailer" :link="trailer" :value="trailer" />
      <FilmType @change="changeTypes" :value="types" />
      <Seo @change="changeSeo" :value="seo" />
      <SaveButtonWithRestore
        @restore="clearData"
        @save="savePageData"
        :disabled="isRequesting"
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
      images: ["", "", "", "", ""],
      imagesFiles: [],
      trailer: "",
      types: [],
      seo: { url: "", title: "", keywords: "", description: "" },
      isRequesting: false,
      init: false,
    };
  },
  methods: {
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
    changeName(value) {
      this.name = value;
    },
    changeDescription(value) {
      this.description = value;
    },
    changeTrailer(value) {
      this.trailer = value;
    },
    changeSeo({ url, title, keywords, description }) {
      this.seo.url = url;
      this.seo.title = title;
      this.seo.keywords = keywords;
      this.seo.description = description;
    },
    changeTypes(data) {
      this.types = data;
    },
    changeImages(file, index) {
      this.imagesFiles[index] = file;

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
    saveMainImage() {
      if (this.mainImageWasEdit) {
        this.isRequesting = true;
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child("Films/mainImage.jpg");

        imageRef
          .put(this.mainImageFile)
          .then(() => imageRef.getDownloadURL())
          .then((link) => {
            console.log(link);
            this.mainImage = link;
            console.log(this.mainImage);
            this.isRequesting = false;
            this.mainImageWasEdit = false;
          });
      }
    },
    saveImages() {
      let storageRef = firebase.storage().ref();

      if (this.imagesFiles.length) {
        this.isRequesting = true;

        this.imagesFiles.forEach((file, index) => {
          let imageRef = storageRef.child(`Films/RowImage/image-${index}.jpg`);

          imageRef
            .put(file)
            .then(() => imageRef.getDownloadURL())
            .then((link) => {
              this.images.splice(index, 1, link)
              console.log(this.images[index]);
            });
        });
      }

      this.isRequesting = false;
    },
    async saveToDataBase() {
      this.isRequesting = true

      let id = this.$route.params.id
      let from = this.$route.params.from
      let doc

      if (id === 'addToCurrent') doc = db.collection('CurrentFilms').doc()
      else if (id === 'addToFuture') doc = db.collection('FutureFilms').doc()
      else doc = db.collection(from).doc(id)

      await doc.set({
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
      this.$router.push({name: 'films'})
    },
    async savePageData() {
      // await this.saveMainImage();
      await this.saveImages();
      // await this.saveToDataBase();
    },
    async getPageData() {
        if (this.$route.params.id !== 'addToCurrent' && this.$route.params.id !== 'addToFuture') {
          let dataLink = db.collection(this.$route.params.from).doc(this.$route.params.id)

          let data

          await dataLink.get()
            .then(d => data = d.data())

          this.name = data.name
          this.description = data.description
          this.mainImage = data.mainImage
          this.images = data.images
          this.trailer = data.trailer
          this.types = data.types
          this.seo.url = data.seo.url
          this.seo.title = data.seo.title
          this.seo.keywords = data.seo.keywords
          this.seo.description = data.seo.description
        }

        this.init = true
    }
  },
  created() {
    this.getPageData()
  },
};
</script>

<style>
</style>
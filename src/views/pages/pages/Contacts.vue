<template>
  <Preloader v-if="!init"/>

  <div v-else>
    <CinemaForm
        v-for="(cinema, index) in cinemas"
        :key="cinema.id"
        :index="index"
        @changeImage="changeMainImage"
        @removeImage="removeMainImage(index, cinema.id)"
        :cinema="cinema"

        @changeTitle="changeTitle"
        @changeAddress="changeAddress"
        @changeCoordinates="changeCoordinates"
        @delete="deleteCinema"
    />

    <PlusButton
        text="Добавить еще кинотеатр"
        @click.native="addCinema"
    />

    <Seo
        :value="seo"
        @url="editSeoUrl"
        @title="editSeoTitle"
        @keywords="editSeoKeywords"
        @description="editSeoDescription"
    />

    <SaveButton
        @saveEvent="save"
        :isFetching="isFetching"
    />
  </div>
</template>

<script>
import CinemaForm from "../../../components/pages/CinemaForm";
import Seo from "../../../components/general/Seo";
import SaveButton from "../../../components/general/SaveButton";
import PlusButton from "../../../components/general/PlusButton";
import server from '../../../requests/pages/contacts'
import Preloader from "../../../components/general/Preloader";
import {mapGetters} from "vuex";

export default {
  name: "Contacts",
  components: {Preloader, PlusButton, SaveButton, Seo, CinemaForm},
  data() {
    return {
      cinemas: [],
      seo: {url: '', title: '', keywords: '', description: ''},
      init: true,
      isFetching: false,
      date: this.getDate(),
      to: 'contacts'
    }
  },
  methods: {
    async save() {
      this.isFetching = true

      await server.saveCinemas(this.seo, this.cinemas, this.date, this.currentLang)

      this.isFetching = false
      await this.$router.push({name: 'pages'})
    },
    async deleteCinema(index) {

      if (this.cinemas[index].id) {
        let id = this.cinemas[index].id

        if (this.cinemas[index].logoImage.length && !this.cinemas[index].logoImageFile) {
          await server.deleteCinemaImage(id, this.currentLang)
        }

        await server.deleteCinemaDb(id, this.currentLang)
      }

      this.cinemas.splice(index, 1)
    },
    async setData() {
      let [seo, cinemas] = await server.getData(this.currentLang)

      if (seo.data()) {
        this.seo = seo.data()
      } else {
        this.seo = {url: '', title: '', keywords: '', description: ''}
      }

      if (cinemas.docs && cinemas.docs.length) {

        this.cinemas = cinemas.docs.map(el => { return el.data() })
      } else {
        this.cinemas = []
      }

      this.init = true
    },
    getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return today = dd + '-' + mm + '-' + yyyy;
    },
    changeTitle(title, index) {
      this.cinemas[index].title = title
    },
    changeAddress(address, index) {
      this.cinemas[index].address = address
    },
    changeCoordinates(coordinates, index) {
      this.cinemas[index].coordinates = coordinates
    },
    addCinema() {
      this.cinemas.push({
        title: '',
        address: '',
        coordinates: '',
        logoImage: '',
        logoImageFile: null,
        id: '',
        state: true
      })
    },
    changeMainImage(file, index) {
      this.cinemas[index].logoImageFile = file

      let reader = new FileReader()

      reader.onload = () => {
        this.cinemas[index].logoImage = reader.result
      }

      reader.readAsDataURL(file)
    },
    async removeMainImage(index, id) {
      if (this.cinemas[index].logoImage.length && !this.cinemas[index].logoImageFile) {
        await server.deleteCinemaImage(id, this.currentLang)

        this.cinemas[index].logoImage = ''
      } else {
        this.cinemas[index].logoImage = ''
        this.cinemas[index].logoImageFile = null
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
  },
  computed: mapGetters(['currentLang']),
  watch: {
    currentLang() {
      this.setData()
    }
  },
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>

</style>
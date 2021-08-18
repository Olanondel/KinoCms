<template>
  <Preloader v-if="!init" />

  <div v-else>
    <CinemaForm
        v-for="(cinema, index) in cinemas"
        :key="index"
        :index="index"
        @changeImage="changeMainImage"
        @removeImage="removeMainImage"
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

export default {
  name: "Contacts",
  components: {Preloader, PlusButton, SaveButton, Seo, CinemaForm},
  data() {
    return {
      cinemas: [],
      seo: {url: '', title: '', keywords: '', description: ''},
      init: false,
      isFetching: false,
      date: this.getDate(),
      to: 'contacts'
    }
  },
  methods: {
    async save() {
      this.isFetching = true

      await server.saveCinemas(this.seo, this.cinemas, this.date)

      this.isFetching = false
      await this.$router.push({name: 'pages'})
    },
    async deleteCinema(index) {

      if (this.cinemas[index].id) {
        let id = this.cinemas[index].id

        if (this.cinemas[index].logoImage.length && !this.cinemas[index].logoImageFile) {
          await server.deleteCinemaImage(id)
        }

        await server.deleteCinemaDb(id)
      }

      this.cinemas.splice(index, 1)

      console.log('rer', index)
    },
    async setData() {
      let [seo, cinemas] = await server.getData()

      this.seo = seo.data()

      cinemas.docs.forEach(el => {
        this.cinemas.push(el.data())
      })

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
    removeMainImage(index) {
      this.cinemas[index].logoImage = ''
      this.cinemas[index].logoImageFile = null
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
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>

</style>
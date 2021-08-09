<template>
  <div class="bannerOnBackground">
    <h2 class="banners-title">Сквозной банер на заднем фоне</h2>

    <div class="banner-content-wrap">

      <div class="size">Размер: 2000х3000</div>

      <div class="banner-content">

        <div class="banner-tabs-nav">
          <div class="radio icheck-nephritis">
            <input v-model="currentTabs" type="radio" id="nephritis1" name="nephritis" :value="1">
            <label for="nephritis1">Фото на фон</label>
          </div>
          <div class="radio icheck-nephritis">
            <input v-model="currentTabs" type="radio" id="nephritis2" name="nephritis" :value="2">
            <label for="nephritis2">Просто фон</label>
          </div>
        </div>

        <div class="banner-tabs-content">
          <div class="tab-1" v-show="currentTabs === 1">
            <img :src="photoOnBackground" class="tab-1__image" alt="tab_image">
            <input type="file" style="display: none" id="photoOnBackground" @change="addPhotoOnBackground">
            <label v-if="!isFetching" for="photoOnBackground" class="btn btn-primary">Добавить</label>
            <label v-else class="btn btn-primary disabled">Добавить</label>
            <button v-if="!isFetching" @click="removePhotoOnBackground" class="btn btn-danger">Удалить</button>
            <button v-else class="btn btn-danger disabled">Удалить</button>
          </div>
          <div class="tab-2" v-show="currentTabs === 2">2</div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      currentTabs: 1,
      photoOnBackground: '',
      Background: '',
      isFetching: false
    }
  },
  methods: {
    async addPhotoOnBackground() {
      this.isFetching = true
      const fileInput = document.querySelector(`#photoOnBackground`)
      const storageRef = firebase.storage().ref();

      let file = fileInput.files[0]

      let ref = storageRef.child(`Banners&Sliders/BannerOnBackground/bannerOnBackground.jpg`)

      await ref.put(file)
      let link = await ref.getDownloadURL()
      this.photoOnBackground = link
      this.isFetching = false
    },
    removePhotoOnBackground() {
      this.photoOnBackground = '../../../assets/image/empty.jpg'
    },
    async getBannerOnBackgroundData() {
      const storageRef = firebase.storage().ref();
      let ref = storageRef.child(`Banners&Sliders/BannerOnBackground/bannerOnBackground.jpg`)

      let link = await ref.getDownloadURL()
      this.photoOnBackground = link
    }
  },
  created() {
    this.getBannerOnBackgroundData()
  }
}
</script>


<style scoped>
.bannerOnBackground {
  margin: 120px 0;
}

.size {
  margin-bottom: 40px;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  min-height: 200px;
}

.radio {
  margin: 20px 0;
}

.banner-tabs-nav {
  border-right: 2px solid #fff;
  padding-right: 60px;
}

.banner-tabs-content {
  width: 85%;
  margin-left: 40px;
}

.tab-1__image {
  width: 240px;
  max-width: 240px;
  height: 180px;
  display: inline-block;
  margin: 0 40px 10px 0;
  object-fit: cover;
}

.btn {
  margin: 0 10px;
}

</style>
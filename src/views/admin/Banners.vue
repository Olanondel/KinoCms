<template>
  <div>
    <TopSliderEdit />
    <BannerOnBackground />
    <BottomNews />
  </div>
</template>

<script>
import TopSliderEdit from '../../components/admin/banners/topSlider/TopSliderEdit'
import BannerOnBackground from '../../components/admin/banners/bannerOnBackground/BannerOnBackground'
import BottomNews from '../../components/admin/banners/bottomNews/BottomNews.vue';

export default {
  name: 'Banners',
  components: {TopSliderEdit, BannerOnBackground, BottomNews },
};
</script>

<style>
.banners-title {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
  border-bottom: 3px solid #fff;
}

.banners-switcher {
  position: absolute !important;
  top: 4px;
  right: 0;
}
</style>
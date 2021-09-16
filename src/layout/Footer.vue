<template>
  <footer class="main-footer">
    <!-- To the right -->
    <div class="float-right d-none d-sm-inline">
      Разработка сайтов: <a target="_blank" href="https://avada-media.ua/">AVADA-MEDIA</a>
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2014-2021 <router-link to="/">Film<span style="color: orangered">Hub</span></router-link>.</strong> All rights reserved.
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

.top-footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  border-bottom: 1px solid black;
  gap: 25px;
  padding-bottom: 24px;
  flex-wrap: wrap;
}

.markets {
  display: flex;
  justify-content: space-between;
}

.footer-nav {
  display: flex;
  justify-content: space-between;
  gap: 40px
}

.social-list {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 30px;
}





.bottom-footer {
  text-align: center;
}
</style>
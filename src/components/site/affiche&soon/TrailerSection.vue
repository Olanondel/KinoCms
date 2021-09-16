<template>
  <iframe width="100%" height="100%" :src="src" title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
</template>

<script>
export default {
  name: "TrailerSection",
  props: ['src']
}
</script>

<style scoped>

</style>
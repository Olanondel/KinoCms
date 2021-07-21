<template>
  <div class="lang-tabs">
    <div class="icheck-success d-inline">
      <input type="radio" name="r3" id="radioSuccess1" checked />
      <label for="radioSuccess1">Русский</label>
    </div>

    <div class="icheck-success d-inline">
      <input type="radio" name="r3" id="radioSuccess2" />
      <label for="radioSuccess2">Українська</label>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.lang-tabs {
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  margin: 0 30% 30px 0;
}
</style>
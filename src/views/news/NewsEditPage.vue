<template>
  <section class="newsEditPage">
    <Language :currentLang="currentLang" @changeLang="changeLang">
      <SwitcherWithText v-model="state" :stateText="stateText" />
    </Language>

    <div class="row-wrap">
      <div>
        <InputWithText text="Название новости" v-model="title" />
      </div>
      <div>

      </div>
    </div>

    <TextAreaWithText v-model="description" />


  </section>
</template>

<script>
import SwitcherWithText from "../../components/general/SwitcherWithText";
import Language from "../../components/general/Language";
import InputWithText from "../../components/general/InputWithText";
import TextAreaWithText from "../../components/general/TextAreaWithText";
export default {
  name: "NewsEditPage",
  components: {TextAreaWithText, InputWithText, Language, SwitcherWithText},
  data() {
    return {
      title: '',
      date: '',
      currentLang: 'ru',
      state: true,
      stateText: 'ВКЛ',
      description: ''
    }
  },
  methods: {
    changeState() {
      if (this.state.length) { this.state = [] }
      else { this.state = ['ВКЛ'] }
    },
    changeLang(lang) {
      this.currentLang = lang
    },
    changeDate(date) {
      this.date = date
    },
  },
  watch: {
    state: function () {
      if (this.state) { this.stateText = 'ВКЛ' }
      else { this.stateText = 'ВЫКЛ' }
    }
  }
}
</script>

<style scoped>
.row-wrap {
  display: flex;
}

.row-wrap > div {
  width: 50%;
}
</style>
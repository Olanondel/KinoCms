<template>
  <div class="row">
    <div class="col-12">
      <!-- Default box -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title tac">SMS</h3>
        </div>
        <div class="card-body">
          <RadioWithButtonAndText
            id1="1"
            id2="2"
            text1="Все пользователи"
            text2="Выборочно"
            value1="all"
            value2="selective"
            name="method1"
            @change="changeForSms"
            to="users"
            from="phone"
          />

          <div class="two-side">
            <div>
              <p style="text-align: right">Символов: {{symbolsCount}}</p>
              <TextAreaWithText
                text="Текст СМС"
                v-model="smsText"
              />
            </div>

            <div>
              <p>Кол-во SMS</p>
              <p>Рассылка выполнена на: 45%</p>
            </div>
          </div>

          <SaveButton
            text="Начать рассылку"
          />
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import RadioWithButtonAndText from "../components/mailing/RadioWithButtonAndText";
import SaveButton from "../components/general/SaveButton";
import TextAreaWithText from "../components/general/TextAreaWithText";
export default {
  components:  {TextAreaWithText, SaveButton, RadioWithButtonAndText},
  name: "mailing",
  data() {
    return {
      sms: 'all',
      smsText: ''
    }
  },
  computed: {
    symbolsCount() {
      return this.smsText.length
    }
  },
  methods: {
    changeForSms(type) { this.sms = type }
  }
}
</script>

<style scoped>
  .tac {
    text-align: center;
  }

  .mailingRadio {
    display: flex;
    align-items: center;
  }

  .card-body {
    padding: 20px 40px 0;
  }

  .two-side {
    display: flex;
  }

  .two-side > div {
    width: 50%;
    padding: 0 25px;
  }
</style>
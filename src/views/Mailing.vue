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
              name="method1"
              @change="changeForSms"
              from="phone"
              :checkMode="true"
              :messageText="smsText"
          />

          <div class="two-side">
            <div>
              <p style="text-align: right">Символов: {{ symbolsCount }}</p>
              <TextAreaWithText
                  text="Текст СМС"
                  v-model="smsText"
              />
            </div>

            <div>
              <p>Кол-во SMS: {{ countOfSms }}</p>
              <p>Рассылка выполнена на: {{ smsProgress }}%</p>
            </div>
          </div>

          <SaveButton
              text="Начать рассылку"
              @saveEvent="startSmsMailing"
          />
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
    <div class="col-12">
      <!-- Default box -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title tac">E-mail</h3>
        </div>
        <div class="card-body">
          <RadioWithButtonAndText
              id1="3"
              id2="4"
              name="method2"
              @change="changeForMail"
              from="email"
              :checkMode="true"
          />

          <div class="two-side general__margin">
            <div>
              <p>
                <span class="general__span">Загрузить HTML-письмо</span>
                <label class="btn btn-warning btn-sm">
                  <input type="file"
                         style="display: none"
                         accept=".html"
                         @change="changeFile"
                  >
                  Загрузить
                </label>
              </p>
              <p><span class="general__span">Загружен файл: </span> {{ fileName }}</p>
              <p><span class="general__span">Шаблон используемый в текущей рассылке:</span> {{ currentTemplateName }}
              </p>
              <div class="two-side gap">
                <p><span>Кол-во писем:</span> {{ countOfEmail }}</p>
                <p><span>Рассылка выполнена на:</span> {{ emailProgress }}%</p>
              </div>
            </div>

            <div>
              <p>Список последних загруженных шаблонов</p>

              <ul class="template-list" v-if="mailTemplates.length">
                <li
                    v-for="(template, index) in mailTemplates"
                    :key="index"
                >
                  <div>
                    <div class="form-check radio-inline">
                      <input
                          class="form-check-input"
                          type="radio"
                          name="mailTemplates"
                          :value="index"
                          @change="changeTemplate"
                      >
                      <label class="form-check-label"></label>
                    </div>
                    <span class="template-name">
                      {{ template }}
                    </span>
                    <button class="btn btn-danger btn-xs" @click="removeTemplate(index)">удалить</button>
                  </div>
                </li>
              </ul>
              <p v-else style="color: red">Список шаблонов пуст, загрузите свой первый шаблон.</p>
            </div>
          </div>

          <SaveButton
              text="Начать рассылку"
              @saveEvent="startMailMailing"
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
import {mapGetters} from 'vuex'
import server from '../requests/mailing'

export default {
  components: {TextAreaWithText, SaveButton, RadioWithButtonAndText},
  name: "mailing",
  data() {
    return {
      sms: 'all',
      email: 'all',
      smsText: '',
      mailTemplates: [],
      currentTemplateIndex: null,
      countOfEmail: 0,
      emailProgress: 45,
      smsProgress: 45,
      countOfSms: 0
    }
  },
  computed: {
    ...mapGetters(['allUsers']),
    symbolsCount() {
      return this.smsText.length
    },
    fileName() {
      if (this.mailTemplates[0]) {
        return this.mailTemplates[0]
      }
      return 'Файл не выбран'
    },
    currentTemplateName() {
      if (!this.currentTemplateIndex || this.currentTemplateIndex >= this.mailTemplates.length) {
        return 'Выберите шаблон!'
      }

      return this.mailTemplates[this.currentTemplateIndex]
    }
  },
  methods: {
    async changeFile(e) {
      let length = this.mailTemplates.length

      if (length >= 5) {
        this.mailTemplates.splice(4, 1)
      }

      this.mailTemplates.unshift(e.target.files[0].name)

      await server.uploadHtmlTemplate(this.mailTemplates)


    },
    changeTemplate(e) {
      this.currentTemplateIndex = e.target.value
    },
    changeForSms(type) {
      this.sms = type
    },
    changeForMail(type) {
      this.email = type
    },
    startSmsMailing() {
      if (this.sms === "all") {
        this.allUsers.forEach(el => {
          console.log(el.firstName + ' ' + el.lastName, ' => ', this.smsText)
        })
      } else {
        alert('Only for all user mode!'
        )
      }
    },
    startMailMailing() {
      if (this.email === "all") {
        console.log('mailing was started!')
      } else {
        alert('Only for all user mode!')
      }
    },
    async removeTemplate(index) {
      if (this.currentTemplateIndex === index) {
        this.currentTemplateIndex = null
      }
      this.mailTemplates.splice(index, 1)

      await server.uploadHtmlTemplate(this.mailTemplates)
    },
    async getData() {
      let data = await server.getHtmlTemplates()

      if (data.data()) {
        this.mailTemplates = data.data().templates
      }
    }
  },
  mounted() {
    this.getData()
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

.gap {
  gap: 40px;
  margin-top: 45px;
}

.general__span {
  max-width: 220px;
  width: 220px;
  display: inline-block;
  margin-right: 20px;
}

.template-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.radio-inline {
  display: inline-block;
}

.template-name {
  padding: 0 25px 10px 10px;
  max-width: 200px;
  width: 200px;
  display: inline-block;
}
</style>
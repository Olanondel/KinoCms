import firebase from "firebase";

let storage = firebase.storage()

export default {
  async uploadHtmlTemplate(template, index) {
    let ref = storage.ref('Mailing/templates/template-' + index + '.html')

    await ref.put(template)
  },
  async getHtmlTemplates() {
    let ref = storage.ref('Mailing/templates')

    console.log(ref.data())
  }
}
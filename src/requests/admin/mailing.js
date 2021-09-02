import db from '../../firebase/firebaseInit'

export default {
  async uploadHtmlTemplate(templates) {
    let ref = db.collection('Mailing').doc('templates')

    await ref.set({'templates': templates})
  },
  async getHtmlTemplates() {
    let data = await db.collection('Mailing').doc('templates').get()

    return data
  }
}
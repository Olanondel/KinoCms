import db from '../../firebase/firebaseInit'

export default {

  async getFilms(lang) {
    let data = await db.collection('Films').doc('currentFilms').collection(lang).get()

    return data.docs.map(el => el.data())
  },

  async getFutureFilms(lang) {
    let data = await db.collection('Films').doc('futureFilms').collection(lang).get()

    return data.docs.map(el => el.data())
  }

}
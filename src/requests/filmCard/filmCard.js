import db from '../../firebase/firebaseInit'

export default {

  async getData(lang, id, from) {
    let res = db.collection('Films').doc(from).collection(lang).doc(id)

    let result = await res.get()

    return result.data()
  }

}
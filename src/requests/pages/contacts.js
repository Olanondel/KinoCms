import db from '@/firebase/firebaseInit'
import firebase from "firebase";
let storageRef = firebase.storage().ref()


export default {
  async saveSeo(seo) {
    let ref = await db.collection('Pages').doc('contacts').collection('seo').doc('seo')

    await ref.set(seo)
  },
  async saveCinemas(seo, cinemas, date) {
    let ref = db.collection('Pages').doc('contacts')

    await ref.collection('seo').doc('seo').set(seo)
    await ref.set({date: date, title: 'Контакты', stateText: 'ВКЛ', notDelete: true, id: 'contacts'})

    await Promise.all(cinemas.map(async el => {
      let id

      if (el.id) { id = el.id }
      else { id = el.id = await ref.collection('cinemas').doc().id }

      if (el.logoImageFile) {
        let fileRef = await storageRef.child(`Pages/contacts/${id}/logo.jpg`)
        await fileRef.put(el.logoImageFile)
        el.logoImage = await fileRef.getDownloadURL()
      }

      if (el.title && el.address) {
        await ref.collection('cinemas').doc(id).set({
          title: el.title,
          address: el.address,
          coordinates: el.coordinates,
          logoImage: el.logoImage,
          id: el.id,
          state: el.state
        })
      }
    }))
  },
  async getData() {
    let ref = db.collection('Pages').doc('contacts')

    let seo = await ref.collection('seo').doc('seo').get()
    let cinemas = await ref.collection('cinemas').get()

    return [ seo, cinemas ]
  },

  async deleteCinemaDb(id) {
    let ref = db.collection('Pages').doc('contacts').collection('cinemas').doc(id)

    await ref.delete()
  },
  async deleteCinemaImage(id) {
    let fileRef = storageRef.child(`Pages/contacts/${id}/logo.jpg`)

    await fileRef.delete()
  }

}
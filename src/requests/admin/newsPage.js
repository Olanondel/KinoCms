import db from '@/firebase/firebaseInit'
import firebase from "firebase";

export default {
  async getLang(lang) {
    let ref = db.collection('Language').doc('News').collection('editPage').doc(lang)

    let langData = await ref.get()

    return langData
  },
  async uploadMainImage(file, id, lang) {
    if (file) {
      let storageRef = firebase.storage().ref()

      let imageRef = storageRef.child(`News/${id}/${lang}/mainImage.jpg`)

      await imageRef.put(file)
      let link = await imageRef.getDownloadURL()
      return link

    }
  },
  async uploadImages(data, lang) {
    if (data.imagesFiles.length) {
      let storageRef = firebase.storage().ref()

      await Promise.all(data.imagesFiles.map(async el => {
        let imageRef = storageRef.child(`News/${data.id}/${lang}/row/image-${el.index}.jpg`)

        await imageRef.put(el.file)
        let link = await imageRef.getDownloadURL()
        data.images[el.index] = link
      }))

      return data.images
    }
  },
  async getId(id) {
    if (!id) {
      let id = await db.collection('News').doc().id
      return id
    }

    return id
  },
  saveToDb(data, lang) {
    db.collection('News').doc('News').collection(lang).doc(data.id).set({
      title: data.title,
      date: data.date,
      state: data.state,
      stateText: data.stateText,
      description: data.description,
      mainImage: data.mainImage,
      images: data.images,
      youtubeLink: data.youtubeLink,
      to: 'newsEdit',
      id: data.id,
      seo: data.seo,
      init: true,
      isFetching: false,
    })
  },
  async save(data, lang) {

    if (data.mainImageFile) {
      data.mainImage = await this.uploadMainImage(data.mainImageFile, data.id, lang)
    }

    if (data.imagesFiles.length) {
      data.images = await this.uploadImages(data, lang)
    }

    await this.saveToDb(data, lang)
  },
  async removeNews(id, image, images, lang) {
    if (id) {
      let storageRef = firebase.storage().ref()

      if (image) {
        let mainImageRef = storageRef.child(`News/${id}/${lang}/mainImage.jpg`)
        await mainImageRef.delete()
      }

      if (images.length) {
        await Promise.all(images.map(async (el, index) => {
          if (el.length) {
            let imageRef = storageRef.child(`News/${id}/${lang}/row/image-${index}.jpg`)

            await imageRef.delete()
          }
        }))
      }

      let ref = db.collection('News').doc('News').collection(lang).doc(id)
      await ref.delete()
    }
  },
  async getNews(lang) {
    let news = await db.collection('News').doc('News').collection(lang).get()

    return news.docs
  },
  async getNewsData(id, lang) {
    let news = await db.collection('News').doc('News').collection(lang).doc(id).get()

    return news.data()
  }
}
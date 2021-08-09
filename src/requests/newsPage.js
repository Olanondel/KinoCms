import db from '@/firebase/firebaseInit'
import firebase from "firebase";

export default {
  async getLang(lang) {
    let ref = db.collection('Language').doc('News').collection('editPage').doc(lang)

    let langData = await ref.get()

    return langData
  },
  async uploadMainImage(file, id) {
    if (file) {
      let storageRef = firebase.storage().ref()

      let imageRef = storageRef.child(`News/${id}/mainImage.jpg`)

      await imageRef.put(file)
      let link = await imageRef.getDownloadURL()
      return link

    }
  },
  async uploadImages(data) {
    if (data.imagesFiles.length) {
      let storageRef = firebase.storage().ref()

      await Promise.all(data.imagesFiles.map(async el => {
        let imageRef = storageRef.child(`News/${data.id}/row/image-${el.index}.jpg`)

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
  saveToDb(data) {
    db.collection('News').doc(data.id).set({
      title: data.title,
      date: data.date,
      currentLang: data.currentLang,
      state: data.state,
      stateText: data.stateText,
      description: data.description,
      mainImage: data.mainImage,
      images: data.images,
      youtubeLink: data.youtubeLink,
      id: data.id,
      seo: data.seo,
      init: true,
      isFetching: false,
    })
  },
  async save(data) {

    if (data.mainImageFile) {
      data.mainImage = await this.uploadMainImage(data.mainImageFile, data.id)
    }

    if (data.imagesFiles.length) {
      data.images = await this.uploadImages(data)
    }

    await this.saveToDb(data)
  },
  async removeNews(id, image, images) {
    if (id) {
      let storageRef = firebase.storage().ref()

      if (image) {
        let mainImageRef = storageRef.child(`News/${id}/mainImage.jpg`)
        await mainImageRef.delete()
      }

      if (images.length) {
        await Promise.all(images.map(async (el, index) => {
          if (el.length) {
            let imageRef = storageRef.child(`News/${id}/row/image-${index}.jpg`)

            await imageRef.delete()
          }
        }))
      }

      let ref = db.collection('News').doc(id)
      await ref.delete()
    }
  },
  async getNews() {
    let news = await db.collection('News').get()

    return news.docs
  },
  async getNewsData(id) {
    let news = await db.collection('News').doc(id).get()

    return news.data()
  }
}
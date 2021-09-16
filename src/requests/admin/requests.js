import db from '@/firebase/firebaseInit'
import firebase from "firebase";

export default {
  async getLang(lang, from) {
    let ref = from

    let langData = await ref.get()

    return langData
  },
  async uploadMainImage(file, id, folder, lang) {
    if (file) {
      let storageRef = firebase.storage().ref()

      let imageRef = storageRef.child(`${folder}/${id}/${lang}/mainImage.jpg`)

      await imageRef.put(file)
      let link = await imageRef.getDownloadURL()
      return link

    }
  },
  async uploadImages(imagesFiles, folder, id, images, lang) {
    if (imagesFiles.length) {
      let storageRef = firebase.storage().ref()

      await Promise.all(imagesFiles.map(async el => {
        let imageRef = storageRef.child(`${folder}/${id}/${lang}/row/image-${el.index}.jpg`)

        await imageRef.put(el.file)
        let link = await imageRef.getDownloadURL()
        images[el.index] = link
      }))

      return images
    }
  },
  async getId(id, folder, lang) {
    if (!id && lang) {
      let id = await db.collection(folder).doc(folder).collection(lang).doc().id
      return id
    } else if (!id && !lang) {
      let id = await db.collection(folder).doc().id
      return id
    }

    return id
  },
  async saveToDb(data, folder, doc, lang) {
    let id

    if (doc && doc !== 'addPage') {
      id = doc
    } else { id = data.id }

    if (lang) {
      await db.collection(folder).doc(folder).collection(lang).doc(id).set(data)
    } else {
      await db.collection(folder).doc(id).set(data)
    }

  },
  async save(data, folder, mainImageFile, images, imagesFiles, doc, lang) {
    if (mainImageFile) {
      data.mainImage = await this.uploadMainImage(mainImageFile, data.id, folder, lang)
    }
    if (imagesFiles && imagesFiles.length) {
      data.images = await this.uploadImages(imagesFiles, folder, data.id, images, lang)
    }
    await this.saveToDb(data, folder, doc, lang)
  },
  async removeImage(id, folder, image, lang) {
    if (id) {
      if (image) {
        let storageRef = firebase.storage().ref()

        let imageRef = storageRef.child(`${folder}/${id}/${lang}/mainImage.jpg`)
        await imageRef.delete()
      }
    }
  },
  async removeImages(id, folder, images, lang) {
    if (images && images.length) {
      let storageRef = firebase.storage().ref()

      await Promise.all(images.map(async (el, index) => {
        if (el.length) {
          let imageRef = storageRef.child(`${folder}/${id}/${lang}/row/image-${index}.jpg`)
          await imageRef.delete()
        }
      }))
    }
  },
  async removeElement(id, image, images, folder, lang) {
    if (id) {
      await this.removeImage(id, folder, image, lang)
      await this.removeImages(id, folder, images, lang)

      let ref = db.collection(folder).doc(folder).collection(lang).doc(id)
      await ref.delete()
    }
  },
  async getData(folder, doc, lang) {
    let ref

    if (doc && lang) {
      ref = await db.collection(folder).doc(folder).collection(lang).doc(doc).get()
      return ref.data()
    } else if (!doc && lang) {
      ref = await db.collection(folder).doc(folder).collection(lang).get()
      return ref.docs
    } else {
      ref = await db.collection(folder).get()
      return ref.docs
    }
  },
  async getCurrentData(id, folder, lang) {
    let news

    if (!lang) {
      news = await db.collection(folder).doc(id).get()
    } else {
      news = await db.collection(folder).doc(folder).collection(lang).doc(id).get()
    }

    return news.data()
  },
  async removeSchedule(lang, doc) {
    let ref = db.collection('Schedule').doc('Schedule').collection(lang).doc(doc)

    await ref.delete()
  }
}
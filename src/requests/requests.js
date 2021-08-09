import db from '@/firebase/firebaseInit'
import firebase from "firebase";

export default {
  async getLang(lang, from) {
    let ref = from

    let langData = await ref.get()

    return langData
  },
  async uploadMainImage(file, id, folder) {
    if (file) {
      let storageRef = firebase.storage().ref()

      let imageRef = storageRef.child(`${folder}/${id}/mainImage.jpg`)

      await imageRef.put(file)
      let link = await imageRef.getDownloadURL()
      return link

    }
  },
  async uploadImages(imagesFiles, folder, id, images) {
    if (imagesFiles.length) {
      let storageRef = firebase.storage().ref()

      await Promise.all(imagesFiles.map(async el => {
        let imageRef = storageRef.child(`${folder}/${id}/row/image-${el.index}.jpg`)

        await imageRef.put(el.file)
        let link = await imageRef.getDownloadURL()
        images[el.index] = link
      }))

      return images
    }
  },
  async getId(id, folder) {
    if (!id) {
      let id = await db.collection(folder).doc().id
      return id
    }

    return id
  },
  saveToDb(data, folder) {
    db.collection(folder).doc(data.id).set(data)
  },
  async save(data, folder, mainImageFile, images, imagesFiles) {
    if (mainImageFile) {
      data.mainImage = await this.uploadMainImage(mainImageFile, data.id, folder)
    }
    if (imagesFiles && imagesFiles.length) {
      data.images = await this.uploadImages(imagesFiles, folder, data.id, images)
    }
    await this.saveToDb(data, folder)
  },
  async removeElement(id, image, images, folder) {
    if (id) {
      let storageRef = firebase.storage().ref()

      if (image) {
        let mainImageRef = storageRef.child(`${folder}/${id}/mainImage.jpg`)
        await mainImageRef.delete()
      }

      if (images && images.length) {
        await Promise.all(images.map(async (el, index) => {
          if (el.length) {
            let imageRef = storageRef.child(`${folder}/${id}/row/image-${index}.jpg`)

            await imageRef.delete()
          }
        }))
      }

      let ref = db.collection(folder).doc(id)
      await ref.delete()
    }
  },
  async getData(folder) {
    let news = await db.collection(folder).get()

    return news.docs
  },
  async getCurrentData(id, folder) {
    let news = await db.collection(folder).doc(id).get()

    return news.data()
  }
}
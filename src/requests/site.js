import db from '../firebase/firebaseInit'

export default {
  async getBannersData(lang) {
    let banners = db.collection('Banners&Sliders')

    let bg = await banners.doc('BannerOnBackground').collection('lang').doc(lang).get()
    let topSlider = await banners.doc('topSlider').collection('lang').doc(lang).get()

    return [bg.data(), topSlider.data()]
  },

  async getBottomBannerData(lang) {
    let banners = db.collection('Banners&Sliders')

    let bottomSlider = await banners.doc('bottomNewsSlider').collection('lang').doc(lang).get()

    return bottomSlider.data()
  },

  async getFilmsData(lang) {
    let currentFilmsData = await db.collection('Films').doc('currentFilms').collection(lang).get()
    let futureFilmsData = await db.collection('Films').doc('futureFilms').collection(lang).get()

    let current = currentFilmsData.docs.map(el => el.data())

    let future = futureFilmsData.docs.map(el => el.data())

    return [current, future]
  },
  async getNewsSliderData(lang) {
    let news = await db.collection('Banners&Sliders').doc('bottomNewsSlider').collection('lang').doc(lang).get()

    return news.data()
  }
}

export async function reserve(uid, cart, reserveSum = 0) {
  let ref = db.collection('Cart').doc(uid)

  await ref.set({cart, reserveSum})
}

export async function getCart(uid) {
  let ref = db.collection('Cart').doc(uid)

  let data = await ref.get()

  return data.data()
}
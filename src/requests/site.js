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

export async function getCinemas(lang) {
  let ref = db.collection('Cinemas').doc('data').collection('editPage').doc(lang).collection(lang)

  let res = await ref.get()

  return  res.docs
}

export async function getCinema(lang, id) {
  let ref = db.collection('Cinemas').doc('data').collection('editPage').doc(lang).collection(lang).doc(id)

  let res = await ref.get()

  return  res.data()
}

export async function getHalls(lang, id) {
  let ref = db.collection('Cinemas').doc('data').collection('halls').doc(id).collection(lang)

  let res = await ref.get()
  let halls = res.docs

  return halls.map(doc => doc.data())
}

export async function getHall(lang, parentId, hallId) {
  let ref = db.collection('Cinemas').doc('data').collection('halls').doc(parentId).collection(lang).doc(hallId)

  let result = await ref.get()

  return result.data()
}

export async function getPromotions(lang) {
  let ref = db.collection('Promotions').doc('Promotions').collection(lang)

  let res = await ref.get()

  return  res.docs
}

export async function getPromotion(lang, id) {
  let ref = db.collection('Promotions').doc('Promotions').collection(lang).doc(id)

  let res = await ref.get()

  return  res.data()
}
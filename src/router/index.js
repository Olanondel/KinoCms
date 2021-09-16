import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import firebase from "firebase";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAdmin = to.matched.some(record => record.meta.admin)

    let currentUserId = currentUser ? currentUser.uid : null

    if (requireAdmin && currentUserId && currentUserId !== 'elTOgrltdSW93B0bCKN45mfnpdl2') {
        next('/')
    } else {
        next()
    }
})

export default router
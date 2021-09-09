export const routes = [
  {
    path: "/admin",
    name: "statistic",
    component: () => import('../../views/admin/Statistic'),
    meta: { admin: true }
  },
  {
    path: "/admin/banners",
    name: "banners",
    component: () => import('../../views/admin/Banners'),
    meta: { admin: true }
  },
  {
    path: "/admin/films",
    name: "films",
    component: () => import('../../views/admin/films/Films'),
    meta: { admin: true }
  },
  {
    path: "/admin/news",
    name: "news",
    component: () => import('../../views/admin/news/News'),
    meta: { admin: true }
  },
  {path: "/admin/newsEdit/:id", name: "newsEdit", component: () => import('../../views/admin/news/NewsEditPage'), meta: { admin: true }},
  {path: "/admin/promotions", name: "promotions", component: () => import('../../views/admin/promotions/Promotions'), meta: { admin: true }},
  {
    path: "/admin/promotionEdit/:id",
    name: "promotionEdit",
    component: () => import('../../views/admin/promotions/PromotionsEditPage'),
    meta: { admin: true }
  },
  {path: "/admin/pages/", name: "pages", component: () => import('../../views/admin/pages/Pages'), meta: { admin: true }},
  {path: "/admin/pages/mainPage", name: "mainEdit", component: () => import('../../views/admin/pages/pages/Main'), meta: { admin: true }},
  {path: "/admin/pages/contacts", name: "contacts", component: () => import('../../views/admin/pages/pages/Contacts'), meta: { admin: true }},
  {path: "/admin/pages/:id", name: "general", component: () => import('../../views/admin/pages/pages/GeneralPage'), meta: { admin: true }},
  {path: "/admin/users", name: "users", component: () => import('../../views/admin/users/Users'), meta: { admin: true }},
  {path: "/admin/userEdit/:id", name: "userEdit", component: () => import('../../views/admin/users/UserEdit'), meta: { admin: true }},
  {path: "/admin/mailing", name: "mailing", component: () => import('../../views/admin/Mailing'), meta: { admin: true }},
  {path: "/admin/films/:id", name: 'filmEdit', component: () => import('../../views/admin/films/FilmEditPage'), meta: { admin: true }},
  {path: "/admin/cinemas", name: "cinemas", component: () => import('../../views/admin/cinemas/Cinemas'), meta: { admin: true }},
  {path: "/register", name: "register", component: () => import('../../views/Register'), meta: {layout: 'Login', admin: true}},
  {path: "/login", name: "login", component: () => import('../../views/Login'), meta: {layout: 'Login', admin: true}},

  {
    path: "/admin/cinemaConfig/:id", component: () => import('../../views/admin/cinemas/CinemaConfig'), meta: { admin: true }, children: [
      {
        path: '',
        component: () => import('../../views/admin/cinemas/CinemaEditPage'),
        name: 'cinemaConfig',
      },
      {
        path: '/:id/hallEdit/',
        component: () => import('../../views/admin/cinemas/halls/HallEditPage'),
        name: 'hallEdit'
      },
    ]
  },
];

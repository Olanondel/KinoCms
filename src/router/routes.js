export const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main'),
    meta: { layout: 'Site' }
  },
  {
    path: '/affiche',
    name: 'affiche',
    component: () => import('../views/affiche&soon/Affiche'),
    meta: { layout: 'Site', from: 'currentFilms' }
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('../views/schedule/Schedule'),
    meta: { layout: 'Site' }
  },
  {
    path: '/reserve/:id',
    name: 'reserve',
    component: () => import('../views/schedule/Reserve'),
    meta: { layout: 'Site' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile'),
    meta: { layout: 'Site' }
  },
  {
    path: '/soon',
    name: 'soon',
    component: () => import('../views/affiche&soon/Soon'),
    meta: { layout: 'Site', from: 'futureFilms' }
  },
  {
    path: '/cinemas',
    name: 'siteCinemas',
    component: () => import('../views/cinemas/SiteCinemas'),
    meta: { layout: 'Site' }
  },
  {
    path: '/cinema/:id',
    name: 'siteCinema',
    component: () => import('../views/cinemas/SiteCinema'),
    meta: { layout: 'Site' }
  },
  {
    path: '/siteCinemaHall/:id',
    name: 'siteCinemaHall',
    component: () => import('../views/cinemas/SiteCinemaHall'),
    meta: { layout: 'Site' }
  },
  {
    path: '/promotions',
    name: 'sitePromotions',
    component: () => import('../views/promotions/SitePromotions'),
    meta: { layout: 'Site' }
  },
  {
    path: '/promotion/:id',
    name: 'sitePromotion',
    component: () => import('../views/promotions/SitePromotion'),
    meta: { layout: 'Site' }
  },

  {
    path: '/aboutCinema',
    name: 'siteAboutCinema',
    component: () => import('../views/pages/SiteAboutCinema'),
    meta: { layout: 'Site' }
  },
  {
    path: '/advertising',
    name: 'siteAdvertising',
    component: () => import('../views/pages/SiteAdvertising'),
    meta: { layout: 'Site' }
  },
  {
    path: '/cafe',
    name: 'siteCafe',
    component: () => import('../views/pages/SiteCafe'),
    meta: { layout: 'Site' }
  },
  {
    path: '/mobileApps',
    name: 'siteMobileApps',
    component: () => import('../views/pages/SiteMobileApps'),
    meta: { layout: 'Site' }
  },
  {
    path: '/contacts',
    name: 'siteContacts',
    component: () => import('../views/pages/SiteContacts'),
    meta: { layout: 'Site' }
  },
  {
    path: '/news',
    name: 'siteNews',
    component: () => import('../views/pages/SiteNews'),
    meta: { layout: 'Site' }
  },

  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search'),
    meta: { layout: 'Site' },
  },


  {
    path: '/filmInfo/:id',
    name: 'filmInfo',
    component: () => import('../views/affiche&soon/FilmInfo'),
    meta: { layout: 'Site' }
  },
  {
    path: "/admin",
    name: "statistic",
    component: () => import('../views/admin/Statistic'),
    meta: { admin: true }
  },
  {
    path: "/admin/banners",
    name: "banners",
    component: () => import('../views/admin/Banners'),
    meta: { admin: true }
  },
  {
    path: '/admin/schedule',
    name: 'scheduleControl',
    component: () => import('../views/admin/Schedule'),
  },
  {
    path: "/admin/films",
    name: "films",
    component: () => import('../views/admin/films/Films'),
    meta: { admin: true }
  },
  {
    path: "/admin/news",
    name: "news",
    component: () => import('../views/admin/news/News'),
    meta: { admin: true }
  },
  {path: "/admin/newsEdit/:id", name: "newsEdit", component: () => import('../views/admin/news/NewsEditPage'), meta: { admin: true }},
  {path: "/admin/promotions", name: "promotions", component: () => import('../views/admin/promotions/Promotions'), meta: { admin: true }},
  {
    path: "/admin/promotionEdit/:id",
    name: "promotionEdit",
    component: () => import('../views/admin/promotions/PromotionsEditPage'),
    meta: { admin: true }
  },
  {path: "/admin/pages/", name: "pages", component: () => import('../views/admin/pages/Pages'), meta: { admin: true }},
  {path: "/admin/pages/mainPage", name: "mainEdit", component: () => import('../views/admin/pages/pages/Main'), meta: { admin: true }},
  {path: "/admin/pages/contacts", name: "contacts", component: () => import('../views/admin/pages/pages/Contacts'), meta: { admin: true }},
  {path: "/admin/pages/:id", name: "general", component: () => import('../views/admin/pages/pages/GeneralPage'), meta: { admin: true }},
  {path: "/admin/users", name: "users", component: () => import('../views/admin/users/Users'), meta: { admin: true }},
  {path: "/admin/userEdit/:id", name: "userEdit", component: () => import('../views/admin/users/UserEdit'), meta: { admin: true }},
  {path: "/admin/mailing", name: "mailing", component: () => import('../views/admin/Mailing'), meta: { admin: true }},
  {path: "/admin/films/:id", name: 'filmEdit', component: () => import('../views/admin/films/FilmEditPage'), meta: { admin: true }},
  {path: "/admin/cinemas", name: "cinemas", component: () => import('../views/admin/cinemas/Cinemas'), meta: { admin: true }},
  {path: "/register", name: "register", component: () => import('../views/auth/Register'), meta: {layout: 'Login', admin: true}},
  {path: "/login", name: "login", component: () => import('../views/auth/Login'), meta: {layout: 'Login', admin: true}},

  {
    path: "/admin/cinemaConfig/:id", component: () => import('../views/admin/cinemas/CinemaConfig'), meta: { admin: true }, children: [
      {
        path: '',
        component: () => import('../views/admin/cinemas/CinemaEditPage'),
        name: 'cinemaConfig',
      },
      {
        path: '/:id/hallEdit/',
        component: () => import('../views/admin/cinemas/halls/HallEditPage'),
        name: 'hallEdit'
      },
    ]
  },
];

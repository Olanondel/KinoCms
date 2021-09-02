import Statistic from "@/views/admin/Statistic";
import Banners from "@/views/admin/Banners";
import Films from "@/views/admin/films/Films";
import Cinemas from "@/views/admin/cinemas/Cinemas";
import News from "@/views/admin/news/News";
import Promotions from "@/views/admin/promotions/Promotions";
import Pages from "@/views/admin/pages/Pages";
import Users from "@/views/admin/users/Users";
import UserEdit from "@/views/admin/users/UserEdit";
import Mailing from "@/views/admin/Mailing";
import FilmEditPage from "@/views/admin/films/FilmEditPage";
import CinemaConfig from "@/views/admin/cinemas/CinemaConfig";
import HallEditPage from "@/views/admin/cinemas/halls/HallEditPage";
import CinemaEditPage from "@/views/admin/cinemas/CinemaEditPage";
import NewsEditPage from "@/views/admin/news/NewsEditPage";
import PromotionsEditPage from "../views/admin/promotions/PromotionsEditPage";
import MainEdit from "../views/admin/pages/pages/Main";
import GeneralPage from "../views/admin/pages/pages/GeneralPage";
import Contacts from "../views/admin/pages/pages/Contacts";
import Register from "../views/admin/Register";
import Login from "../views/admin/Login";

export const routes = [
  {path: "", name: "statistic", component: Statistic},
  {path: "/banners", name: "banners", component: Banners},
  {path: "/films", name: "films", component: Films,},
  {path: "/news", name: "news", component: News},
  {path: "/newsEdit/:id", name: "newsEdit", component: NewsEditPage},
  {path: "/promotions", name: "promotions", component: Promotions},
  {path: "/promotionEdit/:id", name: "promotionEdit", component: PromotionsEditPage},
  {path: "/pages/", name: "pages", component: Pages},
  {path: "/pages/mainPage", name: "mainEdit", component: MainEdit},
  {path: "/pages/contacts", name: "contacts", component: Contacts},
  {path: "/pages/:id", name: "general", component: GeneralPage},
  {path: "/mainPage", name: "mainEdit", component: MainEdit},
  {path: "/users", name: "users", component: Users},
  {path: "/userEdit", name: "userEdit", component: UserEdit},
  {path: "/mailing", name: "mailing", component: Mailing},
  {path: "/films/:id", name: 'filmEdit', component: FilmEditPage},
  {path: "/cinemas", name: "cinemas", component: Cinemas},
  {path: "/register", name: "register", component: Register},
  {path: "/login", name: "login", component: Login},

  {
    path: "/cinemaConfig/:id", component: CinemaConfig, children: [
      {
        path: '',
        component: CinemaEditPage,
        name: 'cinemaConfig',
      },
      {
        path: '/:id/hallEdit/',
        component: HallEditPage,
        name: 'hallEdit'
      },
    ]
  },
];

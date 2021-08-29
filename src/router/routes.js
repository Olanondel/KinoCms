import Statistic from "@/views/Statistic";
import Banners from "@/views/Banners";
import Films from "@/views/films/Films";
import Cinemas from "@/views/cinemas/Cinemas";
import News from "@/views/news/News";
import Promotions from "@/views/promotions/Promotions";
import Pages from "@/views/pages/Pages";
import Users from "@/views/users/Users";
import UserEdit from "@/views/users/UserEdit";
import Mailing from "@/views/Mailing";
import FilmEditPage from "@/views/films/FilmEditPage";
import CinemaConfig from "@/views/cinemas/CinemaConfig";
import HallEditPage from "@/views/cinemas/halls/HallEditPage";
import CinemaEditPage from "@/views/cinemas/CinemaEditPage";
import NewsEditPage from "@/views/news/NewsEditPage";
import PromotionsEditPage from "../views/promotions/PromotionsEditPage";
import MainEdit from "../views/pages/pages/Main";
import GeneralPage from "../views/pages/pages/GeneralPage";
import Contacts from "../views/pages/pages/Contacts";
import Register from "../views/Register";
import Login from "../views/Login";

export const routes = [
  {path: "", name: "statistic", component: Statistic},
  {path: "/banners", name: "banners", component: Banners},
  {path: "/films", name: "films", component: Films,},
  {path: "/news", name: "news", component: News},
  {path: "/newsEdit/:id", name: "newsEdit", component: NewsEditPage},
  {path: "/promotions", name: "promotions", component: Promotions},
  {path: "/promotionEdit/:id", name: "promotionEdit", component: PromotionsEditPage},
  {path: "/pages/", name: "pages", component: Pages},
  {path: "/pages/MainPage", name: "MainEdit", component: MainEdit},
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

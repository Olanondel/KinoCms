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
  {path: "/admin", name: "statistic", component: Statistic},
  {path: "/admin/banners", name: "banners", component: Banners},
  {path: "/admin/films", name: "films", component: Films,},
  {path: "/admin/news", name: "news", component: News},
  {path: "/admin/newsEdit/:id", name: "newsEdit", component: NewsEditPage},
  {path: "/admin/promotions", name: "promotions", component: Promotions},
  {path: "/admin/promotionEdit/:id", name: "promotionEdit", component: PromotionsEditPage},
  {path: "/admin/pages/", name: "pages", component: Pages},
  {path: "/admin/pages/mainPage", name: "mainEdit", component: MainEdit},
  {path: "/admin/pages/contacts", name: "contacts", component: Contacts},
  {path: "/admin/pages/:id", name: "general", component: GeneralPage},
  {path: "/admin/users", name: "users", component: Users},
  {path: "/admin/userEdit/:id", name: "userEdit", component: UserEdit},
  {path: "/admin/mailing", name: "mailing", component: Mailing},
  {path: "/admin/films/:id", name: 'filmEdit', component: FilmEditPage},
  {path: "/admin/cinemas", name: "cinemas", component: Cinemas},
  {path: "/register", name: "register", component: Register},
  {path: "/login", name: "login", component: Login},

  {
    path: "/admin/cinemaConfig/:id", component: CinemaConfig, children: [
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

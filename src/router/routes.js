import Statistic from "@/views/Statistic";
import Banners from "@/views/Banners";
import Films from "@/views/films/Films";
import Cinemas from "@/views/cinemas/Cinemas";
import News from "@/views/News";
import Promotions from "@/views/Promotions";
import Pages from "@/views/Pages";
import Users from "@/views/Users";
import Mailing from "@/views/Mailing";
import FilmEditPage from "@/views/films/FilmEditPage";
import CinemaEditPage from "@/views/cinemas/CinemaEditPage";
import HallEditPage from "@/views/cinemas/halls/HallEditPage";

export const routes = [
  { path: "", name: "statistic", component: Statistic },
  { path: "/banners", name: "banners", component: Banners },
  {path: "/films", name: "films", component: Films, },
  { path: "/cinemas", name: "cinemas", component: Cinemas },
  { path: "/news", name: "news", component: News },
  { path: "/promotions", name: "promotions", component: Promotions },
  { path: "/pages", name: "pages", component: Pages },
  { path: "/users", name: "users", component: Users },
  { path: "/mailing", name: "mailing", component: Mailing },
  { path: "/films/:id", name: 'filmEdit', component: FilmEditPage },
  { path: "/cinemas/:id", name: 'cinemaEdit', component: CinemaEditPage },
  { path: "/halls/:id", name: 'hallEdit', component: HallEditPage },
];

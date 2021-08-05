import Statistic from "@/views/Statistic";
import Banners from "@/views/Banners";
import Films from "@/views/films/Films";
import Cinemas from "@/views/cinemas/Cinemas";
import News from "@/views/news/News";
import Promotions from "@/views/Promotions";
import Pages from "@/views/Pages";
import Users from "@/views/Users";
import Mailing from "@/views/Mailing";
import FilmEditPage from "@/views/films/FilmEditPage";
import CinemaConfig from "@/views/cinemas/CinemaConfig";
import HallEditPage from "@/views/cinemas/halls/HallEditPage";
import CinemaEditPage from "@/views/cinemas/CinemaEditPage";
import NewsEditPage from "@/views/news/NewsEditPage";

export const routes = [
    {path: "", name: "statistic", component: Statistic},
    {path: "/banners", name: "banners", component: Banners},
    {path: "/films", name: "films", component: Films,},
    {path: "/news", name: "news", component: News},
    {path: "/newsEdit/:id", name: "newsEdit", component: NewsEditPage},
    {path: "/promotions", name: "promotions", component: Promotions},
    {path: "/pages", name: "pages", component: Pages},
    {path: "/users", name: "users", component: Users},
    {path: "/mailing", name: "mailing", component: Mailing},
    {path: "/films/:id", name: 'filmEdit', component: FilmEditPage},
    {path: "/cinemas", name: "cinemas", component: Cinemas},

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

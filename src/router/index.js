import VueRouter from "vue-router";
import store from "../store/index";

import MainPage from "../pages/MainPage";
import AllFilmsPage from "../pages/AllFilmsPage";
import FilmPage from "../pages/FilmPage";
import FilmsLayout from "../pages/FilmsLayout";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/films",
      name: "filmsLayout",
      component: FilmsLayout,
      children: [
        {
          path: "",
          name: "films",
          component: AllFilmsPage,
        },
        {
          path: ":id",
          name: "filmPage",
          component: FilmPage,
          // beforeEnter: (to, from, next) => {
          //   if(localStorage.getItem('auth')) {
          //     next()
          //   } else {
          //     next({ name: 'films' })
          //   }
          // }
        },
        {
          path: "*/*",
          redirect: { name: "films" },
        },
      ],
    },
    {
      path: "/administrator.auth",
      name: "AdminLogin",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/adminLogin"),
    },
    {
      path: "/admin",
      name: "Admin",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
      beforeEnter(to, from, next) {
        store.getters.checkUser ? next() : next("*");
      },
      redirect: "/admin/catalog",
      children: [
        {
          path: "/admin/films",
          name: "AdminFilms",
          component: () =>
            import(/* webpackChunkName: "email" */ "../views/Films.vue"),
          props: true,
        },
        {
          path: "/admin/add",
          name: "AddFilm",
          component: () =>
            import(/* webpackChunkName: "email" */ "../views/AddFilm.vue"),
          props: true,
        },
        {
          path: "/admin/edit",
          name: "EditFilm",
          component: () =>
            import(/* webpackChunkName: "email" */ "../views/EditFilm.vue"),
          props: true,
        },
      ],
    },
    {
      path: "*",
      name: "notFound",
      //  component: () => import(/* webpackChunkName: "email" */ "../pages/404"),
      redirect: { path: "/" },
    },
  ],
});

import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";

Vue.use(VueRouter);

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/messaging";
import "firebase/analytics";

import FormModel from "ant-design-vue/lib/form-model";
import Input from "ant-design-vue/lib/input";
import Button from "ant-design-vue/lib/button";
import Icon from "ant-design-vue/lib/icon";
import Layout from "ant-design-vue/lib/layout";
import Menu from "ant-design-vue/lib/menu";
import Divider from "ant-design-vue/lib/divider";
import Switch from "ant-design-vue/lib/switch";
import Select from "ant-design-vue/lib/select";
import Upload from "ant-design-vue/lib/upload";
import Tag from "ant-design-vue/lib/tag";
import Avatar from "ant-design-vue/lib/avatar";
import Pagination from "ant-design-vue/lib/pagination";
import Modal from "ant-design-vue/lib/modal";
import Empty from "ant-design-vue/lib/empty";
import Spin from "ant-design-vue/lib/spin";
import Collapse from "ant-design-vue/lib/collapse";
import Result from "ant-design-vue/lib/result";
import Datepicker from "ant-design-vue/lib/date-picker";

Vue.use(FormModel);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Divider);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Tag);
Vue.use(Avatar);
Vue.use(Pagination);
Vue.use(Modal);
Vue.use(Empty);
Vue.use(Spin);
Vue.use(Collapse);
Vue.use(Result);
Vue.use(Datepicker);

import "@/assets/styles/main.less";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyDYbjz2kWRXBTE3Ba2coob1LYTr5dITKII",
      authDomain: "films-app-d980d.firebaseapp.com",
      databaseURL:
        "https://films-app-d980d-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "films-app-d980d",
      storageBucket: "films-app-d980d.appspot.com",
      messagingSenderId: "978720441990",
      appId: "1:978720441990:web:ad24d26285278f52f9b307",
      measurementId: "G-HF0YB6TN53",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("loggedUser", user);
      }

      this.$store.dispatch("loadProducts");
    });
  },
  render: (h) => h(App),
}).$mount("#app");

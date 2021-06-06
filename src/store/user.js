import firebase from "firebase/app";
import User from "./user-help";

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    loggedUser({ commit }, payload) {
      commit("setUser", new User(payload.uid));
    },
    async logoutUser({ commit }) {
      commit("setLoading", true);
      await firebase.auth().signOut();
      commit("setUser", null);
      commit("setLoading", false);
      //this.router on main
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user !== null;
    },
  },
};

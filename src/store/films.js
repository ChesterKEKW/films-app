import Film from "./films-help";
import firebase from "firebase/app";

export default {
  state: {
    // products: [
    //   {
    //     image: "1.png",
    //     name: "Iphone 7",
    //     price: 400,
    //     article: "T2",
    //     available: true,
    //     category: "phone",
    //   },
    //   {
    //     image: "2.png",
    //     name: "Iphone 7 Plus",
    //     price: 450,
    //     article: "T3",
    //     available: false,
    //     category: "phone",
    //   },
    //   {
    //     image: "3.png",
    //     name: "Iphone 8",
    //     price: 600,
    //     article: "T4",
    //     available: true,
    //     category: "phone",
    //   },
    //   {
    //     image: "4.png",
    //     name: "Iphone 8 Plus",
    //     price: 700,
    //     article: "T5",
    //     available: false,
    //     category: "phone",
    //   },
    //   {
    //     image: "5.png",
    //     name: "Iphone X",
    //     price: 850,
    //     article: "T6",
    //     available: true,
    //     category: "phone",
    //   },
    //   {
    //     image: "6.png",
    //     name: "Iphone 11",
    //     price: 990,
    //     article: "T7",
    //     available: false,
    //     category: "phone",
    //   },
    //   {
    //     image: "7.png",
    //     name: "Iphone 11 Pro",
    //     price: 1100,
    //     article: "T8",
    //     available: false,
    //     category: "phone",
    //   },
    // ],
    products: [],
  },
  mutations: {
    loadProducts(state, payload) {
      if (payload) state.products = payload;
      else state.products = [];
    },
    newProduct(state, payload) {
      state.products.push(payload);
    },
    editProduct(state, { id, ...fields }) {
      let currentIndex;

      state.products.find((item, index) => {
        if (item.id === id) {
          currentIndex = index;
        }
      });
      state.products[currentIndex] = { id, ...fields };
    },
    deleteImage(state, id) {
      state.products.map((n) => {
        if (n.id == id) {
          n.image.shift();
        }
      });
    },
  },
  actions: {
    async loadProducts({ commit }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const product = await firebase.database().ref("products").once("value");

        if (product.val()) {
          const products = product.val();
          const productsArray = [];

          Object.keys(products).map((key) => {
            const currentProduct = products[key];

            productsArray.push(
              new Film(
                currentProduct.image,
                currentProduct.name,
                currentProduct.desc,
                currentProduct.actors,
                currentProduct.director,
                currentProduct.genre,
                currentProduct.rating,
                currentProduct.calendar,
                currentProduct.user.id,
                key
              )
            );
          });

          commit("loadProducts", productsArray);
        }
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e.message);
        throw e;
      }
    },
    async newProduct({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      console.log(payload);
      try {
        const newProduct = new Film(
          payload.image,
          payload.name,
          payload.desc,
          payload.actors,
          payload.director,
          payload.genre,
          payload.rating,
          payload.calendar,
          getters.user.id
        );

        console.log(newProduct);
        const product = await firebase
          .database()
          .ref("products")
          .push(newProduct);

        console.log(product);
        commit("newProduct", {
          ...newProduct,
          id: product.key,
        });
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e.message);
        throw e;
      }
    },
    async editProduct({ commit }, { id, ...fields }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        await firebase
          .database()
          .ref("products")
          .child(id)
          .update({ ...fields });
        console.log("OK");
        commit("editProduct", { id, ...fields });
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e.message);
        throw e;
      }
    },
    async deleteProduct({ commit }, { id, imageUrl }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        await firebase
          .storage()
          .refFromURL(imageUrl)
          .delete()
          .then((data) => {
            console.log(data);
            console.log("File delete");
          })
          .catch((error) => {
            console.log(error);
          });
        await firebase.database().ref("products").child(id).remove();
        commit("deleteImage", id);
        commit("loadProducts");
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e.message);
        throw e;
      }
    },
    async deleteImage({ commit }, { id, imageUrl }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        await firebase
          .storage()
          .refFromURL(imageUrl)
          .delete()
          .then((data) => {
            console.log(data);
            console.log("File delete");
          })
          .catch((error) => {
            console.log(error);
          });
        await firebase
          .database()
          .ref("products")
          .child(id)
          .update({ image: "" });
        commit("deleteImage", id);
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e.message);
        throw e;
      }
    },
  },
  getters: {
    PRODUCTS: (state) => {
      return state.products;
    },
  },
};

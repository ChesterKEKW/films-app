<template>
  <header>
    <div class="container">
      <router-link :to="{ name: 'main' }" class="logo"> Кинотеатр </router-link>
      <div class="links">
        <router-link :to="{ name: 'films' }"> Фильмы </router-link>
        <router-link
          :to="{ name: 'AdminFilms' }"
          style="margin-left: 40px"
          v-if="checkUser"
        >
          Admin
        </router-link>
        <button
          v-if="checkUser"
          type="button"
          class="btn btn-outline-light btn-lg"
          @click="LogOut"
        >
          Выйти
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      auth: false,
    };
  },
  computed: {
    ...mapGetters(["checkUser"]),
  },
  methods: {
    async LogOut() {
      await this.logoutUser();
      this.$router.push({ path: "/" });
    },
    ...mapActions(["logoutUser"]),
  },
};
</script>

<style lang="less" scoped>
header {
  background-color: #0c0c0c;
  .container {
    margin-top: 0;
    display: flex;
    align-items: baseline;
  }
  padding: 20px 0;
  a {
    text-decoration: none;
    font-weight: 700;
    color: #ffffff;
    font-size: 25px;
  }
  .logo {
    color: #eb5804;
    font-size: 30px;
  }
  .links {
    margin-left: 75px;
    display: flex;
    flex-grow: 1;
  }
  button {
    margin-left: auto;
  }
}
</style>

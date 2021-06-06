<template>
  <div class="films-page container">
    <h2>Выбери фильм на свой вкус</h2>
    <films-list :films="PRODUCTS" />
  </div>
</template>

<script>
import FilmsList from "../components/FilmsList";
import { mapGetters } from "vuex";

export default {
  components: { FilmsList },
  data() {
    return {
      films: [],
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS"]),
  },
  created() {
    this.films = this.PRODUCTS;
    console.log(this.films);
  },
};
</script>

<style lang="less" scoped>
h2 {
  font-size: 40px;
  color: #ffffff;
  margin-bottom: 30px;
}
</style>

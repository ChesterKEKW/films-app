<template>
  <div class="film-page">
    <div class="container" v-if="film">
      <h1>{{ film.name }}</h1>
      <div class="line" />
      <img :src="film.image" :alt="film.name" />
      <div class="section">
        <p class="section__title">Жанр:</p>
        <p class="section__description">{{ film.genre }}</p>
      </div>
      <div class="section">
        <p class="section__title">Немного о сюжете:</p>
        <p class="section__description">{{ film.desc }}</p>
      </div>
      <div class="section">
        <p class="section__title">Рейтинг:</p>
        <p class="section__description">{{ film.rating }}</p>
      </div>
      <div class="section">
        <p class="section__title">Актерский состав:</p>
        <p class="section__description">{{ film.actors }}</p>
      </div>
      <div class="section">
        <p class="section__title">Режисеры:</p>
        <p class="section__description">{{ film.director }}</p>
      </div>
      <div class="section">
        <p class="section__title">Дата выхода:</p>
        <p class="section__description">{{ film.calendar }}</p>
      </div>
      <div class="line" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      film: null,
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS"]),
  },
  created() {
    const film = this.PRODUCTS.find((film) => film.id == this.$route.params.id);
    if (film) {
      this.film = film;
    }
  },
};
</script>

<style lang="less" scoped>
.film-page {
  padding-bottom: 100px;
  .back {
    color: #ffffff;
    margin-left: 30px;
    margin-top: 30px;
  }
  h1 {
    color: #ffffff;
    padding-bottom: 15px;
    position: relative;
  }
  .line {
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #eb5804 0%, rgba(0, 0, 0, 0) 90%);
    margin-bottom: 45px;
  }
  img {
    object-fit: cover;
    border-radius: 10px;
    width: 1160px;
    height: 600px;
    margin-bottom: 30px;
  }
  .section {
    &__title {
      color: #eb5804;
      font-weight: 700;
      font-size: 25px;
      margin-bottom: 10px;
    }
    &__description {
      color: #ffffff;
      font-size: 18px;
      line-height: 30px;
    }
  }
  .review {
    h3 {
      color: #ffffff;
    }
    p {
      font-weight: 600;
      font-size: 18px;
      color: #eb5804;
    }
    ul {
      padding-left: 0;
      list-style: none;
      display: flex;
      li {
        margin-right: 15px;
      }
    }
  }
}
</style>

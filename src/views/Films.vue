<template>
  <div class="wrap">
    <a-button type="dashed" class="product__add" block @click="AddFilm">
      Добавить фильм
      <a-icon
        type="plus"
        :style="{
          fontSize: '30px',
          color: 'rgba(0, 0, 0, 0.65);',
          display: 'block',
        }"
      />
    </a-button>
    <a-divider />
    <h1>Фильмы</h1>
    <div class="catalog__content">
      <div class="catalog__body">
        <div class="catalog__titles">
          <div class="catalog__item_block">
            <p></p>
          </div>
          <div class="catalog__item_block">
            <p>Название</p>
          </div>
          <div class="catalog__item_block">
            <p>Рейтинг</p>
          </div>
          <div class="catalog__item_block">
            <p>Режиссер</p>
          </div>
          <div class="catalog__item_block">
            <p>Дата выхода</p>
          </div>
          <div class="catalog__item_block">
            <p>Действия</p>
          </div>
        </div>
        <a-divider />
        <div v-if="PRODUCTS.length">
          <div
            v-for="(item, index) of PRODUCTS"
            :key="index"
            class="catalog__item"
          >
            <div class="catalog__item_block">
              <a-avatar
                shape="square"
                :size="48"
                icon="user"
                :src="item.image[0]"
              />
            </div>
            <div class="catalog__item_block">
              <p>{{ item.name }}</p>
            </div>
            <div class="catalog__item_block">
              <p>{{ item.rating }}</p>
            </div>
            <div class="catalog__item_block">
              <p>{{ item.director }}</p>
            </div>
            <div class="catalog__item_block">
              <p>{{ item.calendar }}</p>
            </div>
            <div class="catalog__item_block">
              <a @click="editProduct(item)">Edit</a>
              <a-divider type="vertical" />
              <a @click="removeProduct(item.id, item.image[0])">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <a-empty v-if="!PRODUCTS.length" :description="false" />
      <!-- <a-pagination
        v-model="current"
        class="catalog-pagination"
        :total="total"
        show-less-items
        @change="onChange"
      /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      arrToShow: [],
      current: 1,
      numOfElements: 5,
    };
  },
  computed: {
    // total() {
    //   let number = this.PRODUCTS.length;

    //   return (number * 10) / this.numOfElements;
    // },
    ...mapGetters(["PRODUCTS"]),
  },
  methods: {
    AddFilm() {
      this.$router.push({ name: "AddFilm" }).catch(() => {});
    },
    editProduct(item) {
      delete item.user;
      this.$router
        .push({ name: "EditFilm", params: { ...item } })
        .catch(() => {});
    },
    async removeProduct(id, imageUrl) {
      console.log(id);
      await this.deleteProduct({ id, imageUrl });
      this.$store.dispatch("loadProducts");
    },
    onChange(pageNumber) {
      this.arrToShow = this.PRODUCTS.slice(
        pageNumber * this.numOfElements - this.numOfElements,
        pageNumber * this.numOfElements
      );
    },
    ...mapActions(["deleteProduct", "loadProducts"]),
  },
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 24px;
}
.product__add {
  width: 330px;
  padding: 60px 0 60px;
  border-radius: 6px;
  height: auto;
  &-icon {
  }
}
.catalog {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 24px;
    padding: 24px;
    background: #fff;
    min-height: 620px;
  }
  &__titles {
    padding: 12px 24px 0;
    height: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    flex: 0 1 100%;
  }
  &__item {
    background: #fafafa;
    &:nth-child(2n - 1) {
      background: #f0f0f0;
    }
    margin: 16px 0;
    padding: 12px 24px 0;
    height: 72px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    flex: 0 1 100%;
    &_block {
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      align-items: center;
      p {
        color: #000;
        margin-bottom: 0;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>

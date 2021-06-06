<template>
  <div class="add">
    <h1>Добавить фильм</h1>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="image" label="Изображение" prop="image">
        <base-upload @getLinkImage="getLinkImage"></base-upload>
      </a-form-model-item>
      <a-form-model-item ref="title" label="Название" prop="title">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item ref="desc" label="Описание" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item ref="actors" label="Актёры" prop="actors">
        <a-input v-model="form.actors" type="textarea" />
      </a-form-model-item>
      <a-form-model-item ref="director" label="Режиссер" prop="director">
        <a-input v-model="form.director" />
      </a-form-model-item>
      <a-form-model-item ref="genre" label="Жанр" prop="genre">
        <a-select v-model="form.genre" placeholder="Choose genre">
          <a-select-option value="Фантастика"> Фантастика </a-select-option>
          <a-select-option value="Детектив"> Детектив </a-select-option>
          <a-select-option value="Криминал"> Криминал </a-select-option>
          <a-select-option value="Боевик"> Боевик </a-select-option>
          <a-select-option value="Комедия"> Комедия </a-select-option>
          <a-select-option value="Драма"> Драма </a-select-option>
          <a-select-option value="Мелодрама"> Мелодрама </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="rating" label="Рейтинг" prop="rating">
        <a-input v-model="form.rating" type="number"
          ><a-icon slot="prefix" type="star"
        /></a-input>
      </a-form-model-item>
      <a-form-model-item ref="calendar" label="Дата выхода" prop="calendar">
        <a-date-picker
          style="width: 100%"
          placeholder=""
          @change="onChange"
          v-model="form.calendar"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> Добавить </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import BaseUpload from "../components/UploadAdd.vue";
import { mapActions } from "vuex";

export default {
  components: { BaseUpload },
  data() {
    let checkPrcie = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the price"));
      }
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        image: "",
        name: "",
        desc: "",
        actors: "",
        director: "",
        genre: "",
        rating: "",
        calendar: "",
      },
      rules: {
        title: [
          {
            required: false,
            message: "Please input title",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: false,
            message: "Please input description",
            trigger: "blur",
          },
        ],
        actors: [
          {
            required: false,
            message: "Please input category",
            trigger: "blur",
          },
        ],
        director: [
          {
            required: false,
            message: "Please input category",
            trigger: "blur",
          },
        ],
        genre: [
          {
            required: false,
            message: "Please input category",
            trigger: "blur",
          },
        ],
        rating: [{ required: false, validator: checkPrcie, trigger: "change" }],
        calendar: [
          {
            required: false,
            message: "Please input category",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.newProduct({ ...this.form });
      // this.$refs.ruleForm.validate((valid) => {
      //   if (valid) {
      //     console.log("submit!");
      //     // this.newProduct(this.form)
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    getLinkImage(url) {
      this.form.image = url;
      console.log(this.form.image);
    },
    onChange(date, dateString) {
      this.form.calendar = dateString;
    },
    ...mapActions(["newProduct"]),
  },
};
</script>

<style lang="less">
.add {
  padding: 24px;
}
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 45px;
}
</style>

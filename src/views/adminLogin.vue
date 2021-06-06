<template>
  <div class="admin-login">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="form"
    >
      <a-form-model-item ref="email" label="Email" prop="email">
        <a-input v-model="form.email"
          ><a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)"
        /></a-input>
      </a-form-model-item>
      <a-form-model-item ref="password" label="Password" prop="password">
        <a-input v-model="form.password"
          ><a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)"
        /></a-input>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 8, offset: 9 }">
        <base-button
          type="primary"
          padding="0 36px"
          :loading="loading"
          @click="onSubmit"
        >
          Login
        </base-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 8, offset: 9 }">
        <p>{{ submitStatus }}</p>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import BaseButton from "../components/Button";
import { mapActions } from "vuex";

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      labelCol: { span: 9 },
      wrapperCol: { span: 8 },
      submitStatus: "",
      loading: false,
      form: {
        name: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input your E-mail!",
            trigger: "change",
          },
          {
            type: "email",
            message: "Email incorrect",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password!",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const user = {
            email: this.form.email,
            password: this.form.password,
          };

          this.submitStatus = "";
          this.loginUser(user)
            .then(() => {
              console.log("Login");
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch((err) => {
              this.loading = false;
              this.submitStatus = err.message;
            });
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    ...mapActions(["loginUser"]),
  },
};
</script>

<style lang="less" scoped>
.admin-login {
  height: calc(100vh - 64px);
  background: rgb(216, 216, 216);
  padding: 200px 0;
  height: 100vh;
}
.form {
}
</style>

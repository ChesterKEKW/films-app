<template>
  <a-button
    :html-type="htype"
    :type="type"
    :loading="loading"
    :style="{
      border: border,
      color: color,
      width: width,
      height: height,
      padding: padding,
      margin: margin,
      display: 'flex',
      'align-items': 'center',
    }"
    :size="size"
    @click="click"
  >
    <slot>{{ title }}</slot>
  </a-button>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  name: "VBtn",
  props: {
    title: {
      type: String,
      default: "Continue",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "default",
    },
    padding: {
      type: String,
      default: "0",
    },
    margin: {
      type: String,
      default: "0",
    },
    width: {
      type: String,
    },
    height: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "primary",
    },
    border: {
      type: String,
      default: "none",
    },
    color: {
      type: String,
      // default: "#fff",
    },
    htype: {
      type: String,
      default: "button",
    },
  },
  data() {
    return {
      small: "152px",
      big: "374px",
    };
  },
  computed: {
    className() {
      return {
        disabled: this.disabled,
      };
    },
  },
  methods: {
    async click() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="less" scoped></style>

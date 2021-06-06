<template>
  <div>
    <FimsHeader></FimsHeader>
    <a-layout :style="{ height: 'calc(100vh - 64px)', overflow: 'hidden' }">
      <a-layout-sider :style="{ background: '#fff', height: '100vh' }">
        <a-menu
          mode="inline"
          :default-selected-keys="['films']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
          @click="handleClick"
        >
          <a-menu-item key="films">
            <a-icon type="profile" />
            <span>Фильмы</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FimsHeader from "../components/MainHeader";

export default {
  components: {
    FimsHeader,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    async LogOut() {
      await this.logoutUser();
      this.$router.push({ path: "/" });
    },
    ...mapActions(["logoutUser"]),
    handleClick(e) {
      switch (e.key) {
        case "films":
          this.$router.push({ path: "/admin/films" }).catch(() => {});
          break;
      }
    },
  },
};
</script>

<style lang="less">
#components-layout-demo-basic .ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
</style>

<template>
  <el-config-provider :locale="locale">
    <el-container class="app-container">
      <el-header height="45px">
        <Header></Header>
      </el-header>
      <el-container>
        <!-- <Menu></Menu> -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// import Menu from "./views/layout/Menu.vue";
import Header from "./views/layout/Header.vue";
@Options({
  components: {
    // Menu,
    Header,
  },
})
export default class Home extends Vue {
  private locale: any = zhCn;
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background-color: #f3f5f9;
}
html,
body,
#app,
.app-container {
  margin: 0;
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 45px;
}
</style>

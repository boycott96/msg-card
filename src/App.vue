<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
@Options({})
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
</style>

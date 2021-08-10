<template>
  <el-aside width="200px" style="background-color: #f3f5f9">
    <el-menu class="menu" :default-active="1" background-color="#f3f5f9">
      <el-menu-item index="1">
        <div class="menu-item-active">
          <i class="el-icon-message"></i>
          <span>首页</span>
        </div>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
export default class Menu extends Vue {}
</script>
<style lang="scss" scoped>
.el-aside {
  color: #333;
}
.el-menu {
  background: #f3f5f9;
  border: 0;
}
.el-icon-message {
  height: 19px;
  line-height: 19px;
}
</style>

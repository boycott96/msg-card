<template>
  <div class="header">
    <div class="logo"><img src="@/assets/logo.png" /></div>
    <div class="name">
      <el-avatar size="small" class="avatar" :src="avatar"></el-avatar>
      <span>{{ username }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["username", "avatar"],
})
export default class Header extends Vue {}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  .logo {
    img {
      vertical-align: middle;
      height: 25px;
    }
  }
  .name {
    width: 100%;
    text-align: right;
    .avatar {
      vertical-align: middle;
      margin-right: 15px;
    }
  }
}
</style>

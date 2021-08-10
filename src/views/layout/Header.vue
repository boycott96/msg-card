<template>
  <div class="header">
    <div class="logo"><img src="@/assets/logo.png" /></div>
    <div class="name">
      <span>王小虎</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
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
  }
}
</style>

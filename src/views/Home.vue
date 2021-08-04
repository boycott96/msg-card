<template>
  <div class="home">
    <div class="header">消息发送</div>
    <FrameworkData class="framework" />
    <SelectPeople />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FrameworkData from "@/components/FrameworkData.vue"; // @ is an alias to /src
import SelectPeople from "@/components/SelectPeople.vue";

@Options({
  components: {
    FrameworkData,
    SelectPeople,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  transition: margin 0.4s ease-out;
  max-width: 790px;
  min-width: 470px;
  margin: 0 auto;
  padding: 12px 40px 18px 20px;
  .header {
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 20px;
  }

  .framework {
  }
}
</style>

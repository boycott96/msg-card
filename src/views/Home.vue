<template>
  <div class="home">
    <el-card class="function-card" shadow="hover">
      <div>
        <el-icon class="icon"><ChatDotRound /></el-icon>
      </div>
    </el-card>
    <!-- <FrameworkData class="framework" /> -->
    <!-- <SelectPeople /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ChatDotRound } from "@element-plus/icons";
// import FrameworkData from "@/components/FrameworkData.vue"; // @ is an alias to /src
// import SelectPeople from "@/components/SelectPeople.vue";

@Options({
  components: {
    // FrameworkData,
    // SelectPeople,
    ChatDotRound,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  transition: margin 0.4s ease-out;
  max-width: 1024px;
  min-width: 320px;
  padding: 12px 40px 18px 20px;
  background: #f3f5f9;

  .function-card {
    border: 0;
    width: 160px;
    height: 150px;
    position: relative;
    .icon {
      font-size: 30px;
      color: #fbd873;
    }
  }
  .function-card:hover {
    top: -10px;
    animation-name: example;
    animation-duration: 0.5s;
    @keyframes example {
      0% {
        top: 0px;
      }
      100% {
        top: -10px;
      }
    }
  }

  .framework {
  }
}
</style>

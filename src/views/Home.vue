<template>
  <div class="home">
    <div
      class="home-card"
      v-on:mouseover="hoverActive()"
      v-on:mouseout="hoverRemove()"
    >
      <el-card
        id="function-card-1"
        class="function-card"
        shadow="hover"
        @click="frameworkVisible = true"
      >
        <div>
          <el-icon class="icon"><ChatDotRound /></el-icon>
        </div>
        <div class="title">消耗模板信息发送</div>
        <div class="subtitle">
          快捷消息
          <el-icon>
            <Promotion />
          </el-icon>
        </div>
      </el-card>
    </div>
    <FrameworkData
      ref="frameworkData"
      :dialog-visible="frameworkVisible"
      @closeDialog="closeDialog"
      @changePeopleShow="changePeopleShow"
    />
    <SelectPeople
      :dialog-visible="peopleVisible"
      @changePeopleShow="changePeopleShow"
      @sendMessage="sendMessage"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ChatDotRound, Promotion } from "@element-plus/icons";
import FrameworkData from "@/components/FrameworkData.vue"; // @ is an alias to /src
import SelectPeople from "@/components/SelectPeople.vue";

@Options({
  components: {
    FrameworkData,
    SelectPeople,
    ChatDotRound,
    Promotion,
  },
})
export default class Home extends Vue {
  private frameworkVisible = false;
  private peopleVisible = false;

  private hoverActive() {
    const card = document.getElementById("function-card-1");
    if (card) {
      card.className = "el-card is-hover-shadow function-card card-hover";
    }
  }

  private hoverRemove() {
    const card = document.getElementById("function-card-1");
    if (card) {
      card.className = "el-card is-hover-shadow function-card card-hover-out";
    }
  }

  private closeDialog() {
    this.frameworkVisible = false;
  }

  private changePeopleShow(value: boolean) {
    this.peopleVisible = value;
  }

  private sendMessage(ids: string[]) {
    (this.$refs as any).frameworkData.sendMessage(ids);
  }
}
</script>
<style lang="scss" scoped>
.home {
  transition: margin 0.4s ease-out;
  max-width: 1024px;
  min-width: 320px;
  padding: 12px 40px 18px 20px;
  background: #f3f5f9;
  .home-card {
    width: 160px;
    height: 150px;
    .function-card {
      border-radius: 10px;
      border: 0;
      position: relative;
      width: 160px;
      height: 150px;
      position: relative;
      .icon {
        font-size: 30px;
        color: #fbd873;
        margin-top: 15px;
        margin-bottom: 20px;
      }
      .title {
        font-size: 15px;
        font-weight: 700;
      }
      .subtitle {
        margin-top: 5px;
        font-size: 12px;
      }
    }
    .function-card:hover {
      cursor: pointer;
    }
    .card-hover-out {
      animation-name: card-hover-out;
      animation-duration: 0.5s;
      @keyframes card-hover-out {
        0% {
          top: -5px;
        }
        100% {
          top: 0px;
        }
      }
    }
    .card-hover {
      top: -5px;
      animation-name: card-hover;
      animation-duration: 0.5s;
      @keyframes card-hover {
        0% {
          top: 0;
        }
        100% {
          top: -5px;
        }
      }
    }
  }
}
</style>

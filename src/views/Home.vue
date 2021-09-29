<template>
  <div class="home">
    <div class="home-row">
      <template v-for="(item, index) in cardList" :key="index">
        <div
          class="home-card"
          v-on:mouseover="hoverActive(item.id)"
          v-on:mouseout="hoverRemove(item.id)"
        >
          <el-card
            :id="item.id"
            class="function-card"
            shadow="hover"
            @click="frameworkVisible[item.id] = true"
          >
            <div>
              <el-icon class="icon"><i :class="item.icon1" /></el-icon>
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="subtitle">
              {{ item.subtitle }}
              <el-icon>
                <i :class="item.icon2" />
              </el-icon>
            </div>
          </el-card>
        </div>
      </template>
    </div>
    <FirstFrameworkData
      ref="firstFrameworkData"
      :dialog-visible="frameworkVisible.card_1"
      @closeDialog="closeFirstDialog"
      @changePeopleShow="changePeopleShow"
    />
    <SecondFrameworkData
      ref="secondFrameworkData"
      :dialog-visible="frameworkVisible.card_2"
      @closeDialog="closeSecondDialog"
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
import FirstFrameworkData from "@/components/FirstFrameworkData.vue"; // @ is an alias to /src
import SecondFrameworkData from "@/components/SecondFrameworkData.vue";
import SelectPeople from "@/components/SelectPeople.vue";

@Options({
  components: {
    FirstFrameworkData,
    SecondFrameworkData,
    SelectPeople,
    ChatDotRound,
    Promotion,
  },
})
export default class Home extends Vue {
  private firstFrameworkVisible = false;
  private secondFrameworkVisible = false;
  private peopleVisible = false;

  private cardList: any = [
    {
      id: "card_1",
      title: "消耗模板信息发送",
      subtitle: "快捷消息",
      icon1: "el-icon-s-data",
      icon2: "el-icon-message-solid",
    },
    {
      id: "card_2",
      title: "通用模板信息发送",
      subtitle: "标题，正文，尾链",
      icon1: "el-icon-s-order",
      icon2: "el-icon-message-solid",
    },
  ];

  private frameworkVisible: any = {
    card_1: false,
    card_2: false,
  };

  private hoverActive(id: any) {
    const card = document.getElementById(id);
    if (card) {
      card.className = "el-card is-hover-shadow function-card card-hover";
    }
  }

  private hoverRemove(id: any) {
    const card = document.getElementById(id);
    if (card) {
      card.className = "el-card is-hover-shadow function-card card-hover-out";
    }
  }

  private closeFirstDialog() {
    this.frameworkVisible.card_1 = false;
  }

  private closeSecondDialog() {
    this.frameworkVisible.card_2 = false;
  }

  private changePeopleShow(value: boolean) {
    this.peopleVisible = value;
  }

  private sendMessage(ids: string[]) {
    if (this.frameworkVisible.card_1) {
      (this.$refs as any).firstFrameworkData.sendMessage(ids);
    } else if (this.frameworkVisible.card_2) {
      (this.$refs as any).secondFrameworkData.sendMessage(ids);
    }
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
  .home-row {
    display: flex;
  }
  .home-card {
    width: 160px;
    height: 150px;
    margin: 10px;
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

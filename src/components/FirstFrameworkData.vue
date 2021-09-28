<template>
  <el-dialog
    title="提示"
    :model-value="dialogVisible"
    width="800px"
    custom-class="framework-data"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #title>
      <div class="title">
        <div class="action" @click="editTitle">
          <el-button
            size="small"
            :icon="editTitleShow ? 'el-icon-finished' : 'el-icon-edit'"
          ></el-button>
        </div>

        <div v-if="!editTitleShow" class="text">
          {{ formateSelectDate }}{{ title }}
          <div class="color-picker">
            <div class="color-text" :style="{ backgroundColor: colorValue }">
              标题颜色
            </div>
          </div>
        </div>
        <template v-else>
          <div class="edit-row">
            <el-date-picker
              class="date-picker"
              size="small"
              v-model="selectDate"
              type="date"
              placeholder="选择日期"
              format="YYYY 年 MM 月 DD 日"
            >
            </el-date-picker>
            <el-input
              class="text-input"
              size="small"
              v-model="title"
              clearable
              placeholder="请输入标题内容"
            ></el-input>
            <el-select
              class="text-input"
              size="small"
              v-model="color"
              placeholder="请选择"
            >
              <el-option
                v-for="item in colorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div class="option-row">
                  <div class="color-div">
                    <div
                      class="color-option"
                      :style="{ backgroundColor: item.color }"
                    ></div>
                  </div>
                  <div>{{ item.label }}</div>
                </div>
              </el-option>
            </el-select>
          </div>
        </template>
      </div>
    </template>
    <form-data ref="formData"></form-data>
    <template #footer>
      <div class="dialog-footer">
        <a
          style="float: left; font-size: 14px; color: #3164dd"
          target="_blank"
          href="https://apps.timwhitlock.info/emoji/tables/unicode#emoji-modal"
          >查询emoji图标</a
        >
        <el-button size="small" type="primary" @click="addFomData"
          >追 加</el-button
        >
        <el-button size="small" type="danger" @click="resetForm"
          >重置表单并关闭</el-button
        >
        <el-button size="small" type="warning" @click="sendMsgForMe"
          >向我发送预览</el-button
        >
        <el-button size="small" type="success" @click="selectPeople"
          >选择人员/部门发送</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import moment from "moment";
import FormData from "./FormData.vue";
import { Options, Vue } from "vue-class-component";
import * as consumption from "../assets/json/consumption.json";
import * as divField from "../assets/json/divField.json";
import * as tagDiv from "../assets/json/tagDiv.json";
import * as tagNote from "../assets/json/tagNote.json";
import { sendMessage } from "@/api/lark";

@Options({
  props: {
    dialogVisible: Boolean,
  },
  components: {
    FormData,
  },
  emits: ["closeDialog", "changePeopleShow"],
})
export default class FrameworkData extends Vue {
  /**
   * 定义
   */
  private selectDate: Date = new Date();
  private title = "消耗日报";
  private color = "blue";
  private colorOptions = [
    {
      value: "blue",
      label: "蓝色",
      color: "#4C7EF5",
    },
    {
      value: "wathet",
      label: "天空蓝",
      color: "#48A4D9",
    },
    {
      value: "turquoise",
      label: "绿松色",
      color: "#53B7A1",
    },
    {
      value: "green",
      label: "绿色",
      color: "#6CC64C",
    },
    {
      value: "yellow",
      label: "黄色",
      color: "#DAA539",
    },
    {
      value: "orange",
      label: "橙色",
      color: "#F19339",
    },
    {
      value: "red",
      label: "红色",
      color: "#E25A50",
    },
    {
      value: "carmine",
      label: "胭脂红",
      color: "#DE4093",
    },
    {
      value: "violet",
      label: "偏蓝紫色",
      color: "#C352CD",
    },
    {
      value: "purple",
      label: "偏红紫色",
      color: "#7A4FED",
    },
    {
      value: "indigo",
      label: "靛青",
      color: "#4F60DD",
    },
    {
      value: "grey",
      label: "灰色",
      color: "#6E737A",
    },
  ];

  // 界面
  private editTitleShow = false;

  /**
   * compute
   */
  get formateSelectDate(): string {
    return moment(this.selectDate).format("YYYY年MM月DD日");
  }

  get colorValue(): string {
    const option: any = this.colorOptions.find(
      (item) => item.value === this.color
    );
    return option.color;
  }

  /**
   * 方法
   */
  private handleClose() {
    this.$emit("closeDialog");
  }

  private editTitle() {
    this.editTitleShow = !this.editTitleShow;
  }

  private resetForm() {
    this.handleClose();
  }

  private addFomData() {
    (this.$refs.formData as any).addForm();
  }

  /**
   * 向个人发送消息预览
   */
  private sendMsgForMe() {
    const app_access_token = localStorage.getItem("app_access_token");
    let header: any = (this as any).getHeaders;
    header = {
      Authorization: "Bearer " + app_access_token,
      ...header,
    };
    const params: any = {
      receive_id: localStorage.getItem("open_id"),
      content: JSON.stringify(this.tidyDataJson()),
      msg_type: "interactive",
    };
    sendMessage(params, header).then((res: any) => {
      console.log(res);
    });
  }

  private sendMessage(ids: string[]) {
    // const app_access_token = localStorage.getItem("app_access_token");
    // let header: any = (this as any).getHeaders;
    // header = {
    //   Authorization: "Bearer " + app_access_token,
    //   ...header,
    // };
    // const params: any = {
    //   open_ids: ids,
    //   content: this.tidyDataJson(),
    //   msg_type: "interactive",
    // };
    // batchSendMessage(params, header).then((res: any) => {
    //   console.log(res);
    // });
    ids.forEach((item: string) => {
      const app_access_token = localStorage.getItem("app_access_token");
      let header: any = (this as any).getHeaders;
      header = {
        Authorization: "Bearer " + app_access_token,
        ...header,
      };
      const params: any = {
        receive_id: item,
        content: JSON.stringify(this.tidyDataJson()),
        msg_type: "interactive",
      };
      sendMessage(params, header).then((res: any) => {
        console.log(res);
      });
    });
  }

  private selectPeople() {
    this.$emit("changePeopleShow", true);
  }

  private tidyDataJson() {
    const cardMain: any = JSON.parse(
      JSON.stringify((consumption as any).default)
    );
    const cardFooter: any = JSON.parse(
      JSON.stringify((tagNote as any).default)
    );
    // 设置头部信颜色
    cardMain.header.template = this.color;
    // 设置头部内容
    cardMain.header.title.content = this.formateSelectDate + this.title;

    // 获取总消耗
    const allData = (this.$refs.formData as any).getAllData();
    const allDataField: any = JSON.parse(
      JSON.stringify((divField as any).default)
    );
    allDataField.text.content =
      "**" +
      allData.subtitle +
      "：**" +
      allData.consumption +
      " " +
      (allData.liftRate < 0 ? "📉" : "📈") +
      " " +
      allData.liftRate +
      "%，" +
      allData.boostValue;
    const divBody: any = JSON.parse(JSON.stringify((tagDiv as any).default));
    divBody.fields.push(allDataField);
    cardMain.elements.push(divBody);

    // 获取中间部分信息
    const formData = (this.$refs.formData as any).getForm();
    let formDivBody: any;
    formData.forEach((item: any, index: number) => {
      if (item.sortType === "1") {
        const field: any = JSON.parse(
          JSON.stringify((divField as any).default)
        );
        field.text.content =
          "**" +
          item.subtitle +
          "：**" +
          item.consumption +
          "\n" +
          (item.liftRate < 0 ? "📉" : "📈") +
          " " +
          item.liftRate +
          "%，" +
          item.boostValue;
        formDivBody = JSON.parse(JSON.stringify((tagDiv as any).default));
        formDivBody.fields.push(field);
        cardMain.elements.push(JSON.parse(JSON.stringify(formDivBody)));
      } else {
        if (index % 2 === 0) {
          // 如果是首位，则创建body json
          formDivBody = JSON.parse(JSON.stringify((tagDiv as any).default));
        }
        const field: any = JSON.parse(
          JSON.stringify((divField as any).default)
        );
        field.text.content =
          "**" +
          item.subtitle +
          "：**" +
          item.consumption +
          "\n" +
          (item.liftRate < 0 ? "📉" : "📈") +
          " " +
          item.liftRate +
          "%，" +
          item.boostValue;
        formDivBody.fields.push(field);
        if (index % 2 !== 0) {
          cardMain.elements.push(JSON.parse(JSON.stringify(formDivBody)));
        }
      }
    });

    // 设置分割线
    cardMain.elements.push({ tag: "hr" });

    // 设置尾巴
    const footerData = (this.$refs.formData as any).getFooterData();
    const footerFiled: any = JSON.parse(
      JSON.stringify((divField as any).default)
    );
    footerFiled.text.content =
      footerData.icon +
      "  " +
      footerData.title +
      "：[" +
      footerData.link +
      "](" +
      footerData.link +
      ")";
    const footerDivBody: any = JSON.parse(
      JSON.stringify((tagDiv as any).default)
    );
    footerDivBody.fields.push(footerFiled);
    cardMain.elements.push(footerDivBody);

    // 设置尾部
    cardMain.elements.push(cardFooter);
    return cardMain;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.option-row {
  display: flex;
  justify-content: space-between;
  .color-div {
    padding: 7px 0;
    width: 50px;
    height: 34px;
    .color-option {
      width: 50px;
      height: 20px;
      border-radius: 5px;
    }
  }
}
.el-dialog {
  border-radius: 10px;
}
.el-dialog__headerbtn .el-dialog__close {
  font-size: 20px;
}
</style>
<style scoped lang="scss">
.framework-data {
  // ::v-deep .el-card__header {
  //   background: #3a75ff;
  // }
  .title {
    display: flex;
    height: 32px;
    line-height: 32px;
    .color-picker {
      display: flex;
      margin-left: 10px;
      .color-text {
        color: #ffffff;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 14px;
      }
    }
    .text {
      font-family: LarkEmojiFont, LarkChineseQuote, -apple-system,
        BlinkMacSystemFont, Helvetica Neue, Tahoma, PingFang SC, Microsoft Yahei,
        Arial, Hiragino Sans GB, sans-serif, Apple Color Emoji, Segoe UI Emoji,
        Segoe UI Symbol, Noto Color Emoji;
      display: flex;
    }
    .edit-row {
      .text-input {
        width: 180px;
        margin-left: 10px;
      }
    }
    .action {
      padding-right: 10px;
      .el-button {
        border-radius: 50%;
        height: 32px;
        width: 32px;
        padding: 0;
        font-size: 14px;
      }
    }
  }
}
</style>

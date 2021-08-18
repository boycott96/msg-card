<template>
  <div class="form-data">
    <div class="data-row" style="margin-bottom: 10px">
      <!-- 总消耗 -->
      <div class="action" @click="editAll()">
        <el-button
          size="small"
          :icon="allData.editShow ? 'el-icon-finished' : 'el-icon-edit'"
        ></el-button>
      </div>
      <template v-if="!allData.editShow">
        <div class="text-row">
          <div class="title">{{ allData.subtitle }}：</div>
          <div class="title-value">{{ allData.consumption }}</div>
          <div class="title-img">
            <img
              :src="
                allData.liftRate < 0
                  ? require('@/assets/fall.png')
                  : require('@/assets/upward.png')
              "
            />
          </div>
          <div class="upward">{{ allData.liftRate }}%</div>
          <div class="upward-value">{{ allData.boostValue }}</div>
        </div>
      </template>
      <div v-else style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              size="small"
              v-model="allData.subtitle"
              placeholder="输入小标题"
            ></el-input>
          </el-col>
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="allData.consumption"
              placeholder="输入消耗量"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="allData.liftRate"
              placeholder="输入提升率"
            >
              <template #append>%</template>
            </el-input>
          </el-col>
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="allData.boostValue"
              placeholder="输入提升值"
            ></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 分消耗 -->
    <div class="data-row" v-for="(row, index) in form" :key="index">
      <div class="action" @click="editRow(row)">
        <el-button
          size="small"
          :icon="row.editShow ? 'el-icon-finished' : 'el-icon-edit'"
        ></el-button>
      </div>
      <div v-if="!row.editShow">
        <div class="text-row">
          <div class="type">{{ getType(row.sortType) }}</div>
          <div class="title">{{ row.subtitle }}：</div>
          <div class="title-value">{{ row.consumption }}</div>
        </div>
        <div class="text-row">
          <div class="title-img">
            <img
              :src="
                row.liftRate < 0
                  ? require('@/assets/fall.png')
                  : require('@/assets/upward.png')
              "
            />
          </div>
          <div class="upward">{{ row.liftRate }}%</div>
          <div class="upward-value">{{ row.boostValue }}</div>
        </div>
      </div>
      <div v-else>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-select
              size="small"
              v-model="row.sortType"
              placeholder="选择排列方式"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input
              size="small"
              v-model="row.subtitle"
              placeholder="输入小标题"
            ></el-input>
          </el-col>
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="row.consumption"
              placeholder="输入消耗量"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="row.liftRate"
              placeholder="输入提升率"
            >
              <template #append>%</template>
            </el-input>
          </el-col>
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="row.boostValue"
              placeholder="输入提升值"
            ></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 尾巴识别 -->
    <div class="data-row" style="margin-bottom: 10px">
      <div class="action" @click="editFooter()">
        <el-button
          size="small"
          :icon="footerData.editShow ? 'el-icon-finished' : 'el-icon-edit'"
        ></el-button>
      </div>
      <template v-if="!footerData.editShow">
        <div class="text-footer">
          <div class="footer-icon">{{ footerData.icon }}</div>
          <div class="footer">{{ footerData.title }}：</div>
          <a target="_blank" :href="footerData.link" class="footer-link">{{
            footerData.link
          }}</a>
        </div>
      </template>
      <div v-else style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              size="small"
              v-model="footerData.icon"
              placeholder="输入图标"
            ></el-input>
          </el-col>
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="footerData.title"
              placeholder="输入标题"
            ></el-input>
          </el-col>
          <el-col :sm="8">
            <el-input
              size="small"
              v-model="footerData.link"
              placeholder="输入链接"
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
interface sortType {
  editShow: boolean;
  sortType: string;
  subtitle: string;
  consumption: string;
  liftRate: number;
  boostValue: string;
}

interface footer {
  editShow: boolean;
  icon: string;
  title: string;
  link: string;
}

@Options({})
export default class FrameworkData extends Vue {
  private title = "";
  private value = "";
  private allValue = "";

  private allData: sortType = {
    editShow: false,
    sortType: "1",
    subtitle: "XX",
    consumption: "1w",
    liftRate: 1,
    boostValue: "1w",
  };
  private footerData: footer = {
    editShow: false,
    icon: "📊",
    title: "更多数据看板",
    link: "https://www.baidu.com/",
  };
  private form: sortType[] = [
    {
      editShow: false,
      sortType: "1",
      subtitle: "XX",
      consumption: "1w",
      liftRate: 1,
      boostValue: "1w",
    },
  ];
  private options: any = [
    {
      value: "1",
      label: "一行一列",
    },
    {
      value: "2",
      label: "一行两列",
    },
  ];

  /**
   * 方法
   */
  private addRowClick() {
    this.form.push({
      editShow: false,
      sortType: "1",
      subtitle: "",
      consumption: "",
      liftRate: 0,
      boostValue: "",
    });
  }

  private editAll() {
    this.allData.editShow = !this.allData.editShow;
  }

  private editFooter() {
    this.footerData.editShow = !this.footerData.editShow;
  }

  private editRow(rowData: any) {
    if (rowData.editShow) {
      rowData.editShow = false;
    } else {
      rowData.editShow = true;
    }
  }

  private addForm() {
    this.form.push({
      editShow: false,
      sortType: "1",
      subtitle: "XX",
      consumption: "1w",
      liftRate: 1,
      boostValue: "1w",
    });
  }

  private getType(type: string) {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].value === type) {
        return this.options[i].label;
      }
    }
    return "";
  }

  private getForm() {
    return this.form;
  }

  private getAllData() {
    return this.allData;
  }

  private getFooterData() {
    return this.footerData;
  }
}
</script>
<style lang="scss" scoped>
.form-data {
  .data-row {
    display: flex;
    line-height: 32px;
    margin-bottom: 10px;
    .action {
      padding-right: 10px;
      .el-button {
        border-radius: 50%;
        height: 32px;
        width: 32px;
        font-size: 14px;
        padding: 0;
      }
    }
    .text-row {
      display: flex;
      font-size: 16px;
      .type {
        font-size: 14px;
        font-family: LarkEmojiFont, LarkChineseQuote, -apple-system,
          BlinkMacSystemFont, Helvetica Neue, Tahoma, PingFang SC,
          Microsoft Yahei, Arial, Hiragino Sans GB, sans-serif,
          Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        margin-right: 10px;
      }
      .title {
        font-family: LarkEmojiFont, LarkChineseQuote, -apple-system,
          BlinkMacSystemFont, Helvetica Neue, Tahoma, PingFang SC,
          Microsoft Yahei, Arial, Hiragino Sans GB, sans-serif,
          Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        font-weight: 600;
      }
      .title-value {
        margin-right: 10px;
      }
      .title-img {
        padding-top: 1px;
        padding-right: 5px;
        img {
          height: 20px;
        }
      }
      .upward {
        font-style: Italic;
      }
      .upward-value {
        margin-left: 10px;
      }
    }
    .text-footer {
      display: flex;
      font-size: 16px;
      .footer-icon {
        margin-right: 10px;
      }
      .footer-title {
        font-weight: normal;
      }
      .footer-link {
        color: #3164dd;
      }
    }
    .el-row {
      margin-bottom: 10px;
    }
    .el-row:last-child {
      margin-bottom: 0;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-select {
  width: 100%;
}
</style>

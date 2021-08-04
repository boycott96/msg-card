<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-date-picker
          class="date-picker"
          v-model="selectDate"
          type="date"
          placeholder="选择日期"
          format="YYYY 年 MM 月 DD 日"
          value-format="YYYY/MM/DD"
        >
        </el-date-picker>
        <el-input
          class="title"
          v-model="title"
          placeholder="请输入标题内容"
        ></el-input>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "列表内容 " + o }}
    </div>
  </el-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    msg: String,
  },
})
export default class FrameworkData extends Vue {
  msg!: string;
  private selectDate: any = "";
  private title = "";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-card {
  border-radius: 10px;
  ::v-deep .el-card__header {
    background: #3a75ff;
  }
  .card-header {
    display: flex;
    align-items: center;
    .title {
      margin-left: 20px;
      max-width: 220px;
    }
  }
}
</style>

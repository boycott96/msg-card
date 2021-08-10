<template>
  <div>
    <el-row>
      <el-col :xs="4" :sm="2" :md="2" :lg="2">
        <el-button icon="el-icon-plus" circle @click="addRowClick"></el-button>
      </el-col>
      <el-col :xs="20" :sm="22" :md="22" :lg="22">
        <el-row :gutter="20" v-for="(row, index) in form" :key="index">
          <el-col :sm="8" :md="6" :lg="4">
            <el-select v-model="row.sortType" placeholder="选择排列方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :sm="8" :md="6" :lg="4">
            <el-input
              v-model="row.subTitle"
              placeholder="输入小标题"
            ></el-input>
          </el-col>
          <el-col :sm="8" :md="6" :lg="4">
            <el-input
              v-model="row.consumption"
              placeholder="输入消耗量"
            ></el-input>
          </el-col>
          <el-col :sm="8" :md="6" :lg="4">
            <el-input
              v-model="row.liftRate"
              placeholder="输入提升率"
            ></el-input>
          </el-col>
          <el-col :sm="8" :md="6" :lg="4">
            <el-input
              v-model="row.boostValue"
              placeholder="输入提升值"
            ></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
interface sortType {
  sortType: string;
  subTitle: string;
  consumption: number;
  liftRate: number;
  boostValue: number;
}

@Options({})
export default class FrameworkData extends Vue {
  private title: any = "";
  private value: any = "";
  private form: sortType[] = [
    {
      sortType: "1",
      subTitle: "",
      consumption: 0,
      liftRate: 0,
      boostValue: 0,
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

  private addRowClick() {
    this.form.push({
      sortType: "1",
      subTitle: "",
      consumption: 0,
      liftRate: 0,
      boostValue: 0,
    });
  }
}
</script>
<style lang="scss" scoped>
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

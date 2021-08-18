<template>
  <el-dialog
    title="选择发送人员"
    :model-value="dialogVisible"
    width="600px"
    custom-class="people-data"
    :before-close="handleClose"
  >
    <div class="main">
      <el-select
        style="width: 100%"
        v-model="peopleValue"
        multiple
        filterable
        remote
        reserve-keyword
        size="small"
        placeholder="搜索用户"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.open_id"
          :label="item.name"
          :value="item.open_id"
        >
          <div class="select-option-row">
            <el-avatar
              class="avatar"
              size="small"
              :src="item.avatar.avatar_72"
            ></el-avatar>
            <span>{{ item.name }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="sendMessage"
          >发 送</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { searchPeople } from "@/api/lark";

@Options({
  props: {
    dialogVisible: Boolean,
  },
  emits: ["changePeopleShow", "sendMessage"],
})
export default class SelectPeople extends Vue {
  private peopleValue = "";
  private options: any[] = [];
  private loading = false;

  private handleClose() {
    this.peopleValue = "";
    this.options = [];
    this.$emit("changePeopleShow", false);
  }

  private sendMessage() {
    this.$emit("sendMessage", this.peopleValue);
  }

  private remoteMethod(query: string) {
    if (query !== "") {
      this.loading = true;
      const app_access_token = localStorage.getItem("user_access_token");
      let header: any = (this as any).getHeaders;
      header = {
        Authorization: "Bearer " + app_access_token,
        ...header,
      };
      const param: any = {
        query: query,
        page_size: 20,
      };
      searchPeople(param, header).then((res: any) => {
        this.loading = false;
        if (res.status === 200 && res.data.code === 0) {
          this.options = res.data.data.users;
        }
      });
    } else {
      this.options = [];
    }
  }
}
</script>
<style lang="scss">
.el-select-dropdown__item {
  height: 47px;
  line-height: 47px;
}
</style>
<style lang="scss" scoped>
.people-data {
  .main {
    min-height: 350px;
  }
}
.avatar {
  vertical-align: middle;
  margin-right: 12px;
}
</style>

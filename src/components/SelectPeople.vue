<template>
  <el-dialog
    title="选择发送人员"
    :model-value="dialogVisible"
    width="750px"
    custom-class="people-data"
    :before-close="handleClose"
    destroy-on-close
  >
    <div class="main">
      <div class="left">
        <div class="search">
          <el-input
            v-model="peopleValue"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            @input="search"
          />
          <div class="radio">
            <el-radio-group v-model="radioType">
              <el-radio label="1">搜索部门</el-radio>
              <el-radio label="2">搜索人员</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="search-data">
          <template v-if="radioType === '1'">
            <div
              class="data-row"
              v-for="item in deptList"
              :key="item.department_id"
              @click="selectDept(item)"
            >
              <el-checkbox
                style="margin-left: 10px"
                v-model="item.checked"
              ></el-checkbox>
              <div class="data-img">
                <img src="@/assets/department.svg" />
              </div>
              <div>{{ item.name }}</div>
            </div>
          </template>
          <template v-else>
            <div
              class="data-row"
              v-for="item in peopleList"
              :key="item.user_id"
              @click="selectPeople(item)"
            >
              <el-checkbox
                style="margin-left: 10px"
                v-model="item.checked"
              ></el-checkbox>
              <div class="data-img">
                <img
                  style="height: 28px; border-radius: 50%"
                  :src="item.avatar.avatar_72"
                />
              </div>
              <div>{{ item.name }}</div>
            </div>
          </template>
        </div>
      </div>
      <div class="right">
        <div class="title">已选：{{ selectList.length }}</div>
        <div class="select-data">
          <div class="data-row" v-for="item in selectList" :key="item.id">
            <div class="data-img">
              <img v-if="item.type === '1'" src="@/assets/department.svg" />
              <img
                v-else
                style="height: 28px; border-radius: 50%"
                :src="item.avatar"
              />
            </div>
            <div class="append">
              <div>{{ item.name }}</div>
              <div class="append-close">
                <el-button
                  type="primary"
                  icon="el-icon-close"
                  @click="deletePeople(item)"
                ></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="sendMessage"
          :loading="loading"
          >{{ loading ? "正在发送，请稍候" : "发送" }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  searchPeople,
  searchDept,
  getDeptForPeople,
  getSubDepartment,
} from "@/api/lark";

@Options({
  props: {
    dialogVisible: Boolean,
  },
  emits: ["changePeopleShow", "sendMessage"],
})
export default class SelectPeople extends Vue {
  private peopleValue = "";
  private radioType = "1";

  private deptList: any = [];
  private peopleList: any = [];

  private selectList: any = [];
  private loading: any = false;

  // 待发送得人员清单
  private ids: any = [];

  private handleClose() {
    this.peopleValue = "";
    this.deptList = [];
    this.peopleList = [];
    this.selectList = [];
    this.ids = [];
    this.$emit("changePeopleShow", false);
  }

  /**
   * 获取子部门
   */
  private async getSubDepartment(id: any) {
    const app_access_token = localStorage.getItem("user_access_token");
    let header: any = (this as any).getHeaders;
    header = {
      Authorization: "Bearer " + app_access_token,
      ...header,
    };
    const param: any = {
      department_id_type: "department_id",
      department_id: id,
      fetch_child: true,
      page_size: 50,
    };
    // 获取子部门的数据
    await getSubDepartment(param, header).then((res: any) => {
      if (res.data.data.items) {
        res.data.data.items.forEach((item: any) => {
          // 循环获取对应部门的人员，然后添加到待发送的队列中
          if (item.department_id != 0) {
            this.getDeptPeople(item.department_id);
          }
        });
      }
    });
  }

  private sendMessage() {
    this.loading = true;
    this.ids = [];
    // 统计所有的人员
    Promise.all(
      this.selectList.map((item: any) => {
        return new Promise((resolve) => {
          if (item.type === "1") {
            this.getSubDepartment(item.id);
            this.getDeptPeople(item.id);
          } else {
            this.ids.push(item.id);
          }
          resolve("resolved");
        });
      })
    ).then(() => {
      setTimeout(() => {
        this.$emit("sendMessage", this.ids);
        this.loading = false;
        this.handleClose();
      }, 3000);
    });
  }

  private async getDeptPeople(id: any) {
    const app_access_token = localStorage.getItem("user_access_token");
    let header: any = (this as any).getHeaders;
    header = {
      Authorization: "Bearer " + app_access_token,
      ...header,
    };
    const param: any = {
      department_id_type: "department_id",
      department_id: id,
      page_size: 50,
    };
    return getDeptForPeople(param, header).then((res: any) => {
      if (res.data.data.items) {
        res.data.data.items.forEach((item: any) => this.ids.push(item.open_id));
      }
    });
  }

  private search() {
    if (this.radioType === "1") {
      this.searchDept();
    } else {
      this.searchPeople();
    }
  }

  private deletePeople(item: any) {
    this.selectList.splice(
      this.selectList.findIndex((i: any) => i.id === item.id),
      1
    );
    // 同时检测部门和人员列表的check
    this.deptList.forEach((i: any) => {
      if (i.department_id === item.id) {
        i.checked = false;
      }
    });
    this.peopleList.forEach((i: any) => {
      if (i.open_id === item.id) {
        i.checked = false;
      }
    });
  }

  private selectDept(item: any) {
    if (item.checked) {
      this.selectList.splice(
        this.selectList.findIndex((i: any) => i.id === item.department_id),
        1
      );
      item.checked = false;
    } else {
      this.selectList.push({
        id: item.department_id,
        name: item.name,
        type: "1",
      });
      item.checked = true;
    }
  }

  private selectPeople(item: any) {
    if (item.checked) {
      this.selectList.splice(
        this.selectList.findIndex((i: any) => i.id === item.open_id),
        1
      );
      item.checked = false;
    } else {
      this.selectList.push({
        id: item.open_id,
        avatar: item.avatar.avatar_72,
        name: item.name,
        type: "2",
      });
      item.checked = true;
    }
  }

  private searchDept() {
    const app_access_token = localStorage.getItem("user_access_token");
    let header: any = (this as any).getHeaders;
    header = {
      Authorization: "Bearer " + app_access_token,
      ...header,
    };
    const param: any = {
      query: this.peopleValue,
      page_size: 50,
    };
    searchDept(param, header).then((res: any) => {
      if (res.data.data.items == undefined) {
        this.deptList = [];
      } else {
        this.deptList = res.data.data.items;
      }
    });
  }

  private searchPeople() {
    const app_access_token = localStorage.getItem("user_access_token");
    let header: any = (this as any).getHeaders;
    header = {
      Authorization: "Bearer " + app_access_token,
      ...header,
    };
    const param: any = {
      query: this.peopleValue,
      page_size: 50,
    };
    searchPeople(param, header).then((res: any) => {
      if (res.data.data.users == undefined) {
        this.peopleList = [];
      } else {
        this.peopleList = res.data.data.users;
      }
    });
  }
}
</script>
<style lang="scss">
.el-select-dropdown__item {
  height: 47px;
  font-size: 18px;
  line-height: 47px;
}
.append {
  .el-button {
    padding: 0;
    min-height: 30px;
    width: 30px;
    font-size: 18px;
  }
  .el-button--primary {
    color: #8f959e;
    background: none;
    border: none;
  }
}
.append-close:hover {
  .el-button--primary {
    color: #8f959e;
    background: #d8dada;
    border-color: #d8dada;
  }
}
</style>
<style lang="scss" scoped>
.people-data {
  .main {
    border: 1px solid #bbbfc4;
    border-radius: 5px;
    display: flex;
    .left {
      width: 350px;
      height: 465px;
      border-right: 1px solid #bbbfc4;
      .search {
        padding: 22px 22px 22px 25px;
        .radio {
          margin-top: 10px;
          margin-left: 8px;
        }
      }
      .search-data {
        padding: 0 25px;
        overflow: auto;
        max-height: 354px;
        .data-row:hover {
          background: #eff0f1;
          border-radius: 5px;
        }
        .data-row {
          cursor: pointer;
          display: flex;
          height: 48px;
          line-height: 48px;
          .data-img {
            margin: 0 10px;
          }
          img {
            vertical-align: middle;
          }
        }
      }
    }
    .right {
      width: 350px;
      height: 465px;
      padding-left: 25px;
      .title {
        font-size: 18px;
        margin: 15px -8px;
      }
      .select-data {
        overflow: auto;
        max-height: 410px;
        .data-row:hover {
          background: #eff0f1;
          border-radius: 5px;
        }
        .data-row {
          cursor: pointer;
          display: flex;
          height: 48px;
          line-height: 48px;
          .data-img {
            margin: 0 10px;
          }
          img {
            vertical-align: middle;
          }
          .append {
            display: flex;
            width: 100%;
            padding-right: 20px;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
.avatar {
  vertical-align: middle;
  margin-right: 12px;
}
</style>

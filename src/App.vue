<template>
  <el-config-provider :locale="locale">
    <el-container class="app-container">
      <el-header height="45px">
        <Header :avatar="avatar" :username="username"></Header>
      </el-header>
      <el-container>
        <!-- <Menu></Menu> -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// import Menu from "./views/layout/Menu.vue";
import Header from "./views/layout/Header.vue";
import { ElLoading } from "element-plus";
import { getAccessToken, getLoginData } from "@/api/lark";
import { mapGetters } from "vuex";

@Options({
  components: {
    // Menu,
    Header,
  },
  computed: {
    ...mapGetters(["getApp", "getHeaders"]),
  },
})
export default class Home extends Vue {
  private locale: any = zhCn;
  private loading: any;

  private avatar = "";
  private username = "";

  created() {
    this.loading = ElLoading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
    });
    const url = window.location.href; //拿到当前页面url,vue编译完成的页面会有'#/'
    if (url.indexOf("?") != -1) {
      this.init(url);
    } else {
      // 需要重新授权登录
      this.login();
    }
  }

  private getPersonData(code: string) {
    const app_access_token = localStorage.getItem("app_access_token");
    let header: any = (this as any).getHeaders;
    header = {
      Authorization: "Bearer " + app_access_token,
      ...header,
    };
    const params: any = {
      grant_type: "authorization_code",
      code,
    };
    getLoginData(params, header).then((res: any) => {
      if (res.status === 200 && res.data.code === 0) {
        this.loading.close();
        this.avatar = res.data.data.avatar_url;
        this.username = res.data.data.name;
        localStorage.setItem("open_id", res.data.data.open_id);
        localStorage.setItem("user_access_token", res.data.data.access_token);
      } else {
        this.login();
      }
    });
  }

  private init(url: string) {
    const time = localStorage.getItem("expire_time");
    if (time && new Date().getTime() < parseInt(time)) {
      // 直接通过访问appAccessToken
      // 进行code保存
      this.getUrlCode(url);
    } else {
      // 否则刷新appAccessToken
      this.accessToken();
    }
  }

  // 登录飞书用户
  private login() {
    this.loading.close();
    window.location.href =
      "https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=" +
      (this as any).getApp.redirect_uri +
      "&app_id=" +
      (this as any).getApp.app_id;
  }

  private accessToken() {
    const param: any = {
      app_id: (this as any).getApp.app_id,
      app_secret: (this as any).getApp.app_secret,
    };
    getAccessToken(param, (this as any).getHeaders).then((res: any) => {
      if (res.status === 200 && res.data.code === 0) {
        localStorage.setItem("app_access_token", res.data.app_access_token);
        // 提前计算十五分钟后过期token
        const time = new Date().getTime() + 6300000 + parseInt(res.data.expire);
        localStorage.setItem("expire_time", time.toString());
      }
    });
  }

  /**
   * 消费code
   */
  private getUrlCode(url: string) {
    //例如http://c.baidu.com/mark?setId=64#/
    const cs = url.split("?")[1]; //?后面的参数字符串
    const cs_arr = cs.split("&"); //将参数字符串分割为包含多个参数的数组
    let arr: any = {}; //声明一个容器
    for (var i = 0; i < cs_arr.length; i++) {
      //将下标为0123的数组字符串，转化为    {key1:value1;key2:value2;}  格式的json
      arr[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
    }
    this.getPersonData(arr.code);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background-color: #f3f5f9;
}
html,
body,
#app,
.app-container {
  margin: 0;
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 45px;
}
</style>

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/packages/theme-chalk/src/base.scss";

import {
  ElConfigProvider,
  ElCard,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElButton,
  ElDatePicker,
  ElInput,
  ElRow,
  ElCol,
  ElIcon,
  ElContainer,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMain,
  ElTable,
  ElTableColumn,
  ElCollapseTransition,
  ElAvatar,
} from "element-plus";

const components = [
  ElConfigProvider,
  ElCard,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElButton,
  ElDatePicker,
  ElInput,
  ElRow,
  ElCol,
  ElIcon,
  ElContainer,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMain,
  ElTable,
  ElTableColumn,
  ElCollapseTransition,
  ElAvatar,
];

const app = createApp(App);

app.use(store).use(router);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");

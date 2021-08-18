import { createStore } from "vuex";

export default createStore({
  state: {
    app: {
      app_id: "cli_a19e3c9cbff8500b",
      redirect_uri: "http%3A%2F%2Fahgqrobotreport.vaiwan.com",
      app_secret: "JZgH71pufYYlqkBojGqFBeZgGcl8ko2l",
    },
    request: {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getApp: (state) => {
      return state.app;
    },
    getHeaders: (state) => {
      return state.request.headers;
    },
  },
});

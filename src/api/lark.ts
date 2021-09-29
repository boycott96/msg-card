import Axios from "axios";

interface param {
  app_id: string;
  app_secret: string;
  grant_type: string;
  code: string;
}
interface header {
  "Content-Type": string;
}

// 获取访问凭证
export const getAccessToken = (params: param, headers: header): any => {
  return Axios.get("/open-apis/auth/v3/app_access_token/internal/", {
    params,
    headers,
  });
};

// 获取登录用户身份
export const getLoginData = (params: param, headers: header): any => {
  return Axios.post("/open-apis/authen/v1/access_token", params, { headers });
};

// 发送消息
export const sendMessage = (params: param, headers: header): any => {
  return Axios.post(
    "/open-apis/im/v1/messages?receive_id_type=open_id",
    params,
    {
      headers,
    }
  );
};

// 批量发送消息
export const batchSendMessage = (params: param, headers: header): any => {
  return Axios.post("/open-apis/message/v4/batch_send/", params, { headers });
};

// 搜索用户数据
export const searchPeople = (params: param, headers: header): any => {
  return Axios.get("/open-apis/search/v1/user", {
    params,
    headers,
  });
};

// 搜索部门数据
export const searchDept = (params: param, headers: header): any => {
  return Axios.post("/open-apis/contact/v3/departments/search", params, {
    headers,
  });
};

// 获取部门下的所有用户
export const getDeptForPeople = (params: param, headers: header): any => {
  return Axios.get("/open-apis/contact/v3/users", {
    params,
    headers,
  });
};

// 获取部门的子部门
export const getSubDepartment = (params: param, headers: header): any => {
  return Axios.get("/open-apis/contact/v3/departments", {
    params,
    headers,
  });
};

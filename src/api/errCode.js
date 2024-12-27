import { ElNotification } from "element-plus";
const errorCodeMap = new Map([
  [400, "请求错误(400)"],
  [401, "登陆失效,请重新登录(401)"],
  [403, "无权限,拒绝访问(403)"],
  [404, "资源不存在(404)"],
  [405, "请求方式错误(405)"],
  [408, "请求超时,请稍后重试(408)"],
  [500, "服务异常(500)"],
  [502, "网络错误(502)"],
  [503, "服务不可用(503)"],
  [504, "网络超时(504)"],
  [505, "HTTP版本不受支持(505)"],
  [-1, "请求失败,请稍后重试"]
]);
/**
 * @description: 错误码映射
 * @param {Number} code 错误码
 */
export const checkStatus = code => {
  const msg = errorCodeMap.get(code) || errorCodeMap.get(-1);
  return ElNotification.error({
    title: "Error",
    message: `${msg}`
  });
};

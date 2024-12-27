import path from "path";

/**
 * 判断是否为开发环境
 * @param {string} mode - 环境模式
 * @returns {boolean} 是否为开发环境
 */
export function isDevFn(mode) {
  return mode === "development";
}

/**
 * 判断是否为生产环境
 * @param {string} mode - 环境模式
 * @returns {boolean} 是否为生产环境
 */
export function isProdFn(mode) {
  return mode === "production";
}

/**
 * 判断是否为测试环境
 * @param {string} mode - 环境模式
 * @returns {boolean} 是否为测试环境
 */
export function isTestFn(mode) {
  return mode === "test";
}

/**
 * 判断是否生成包预览
 * @returns {boolean} 是否生成包预览
 */
export function isReportMode() {
  return process.env.VITE_REPORT === "true";
}

/**
 * 读取所有环境变量配置文件到process.env
 * @param {Record<string, any>} envConf - 环境变量配置对象
 * @returns {Record<string, any>} 处理后的环境变量对象
 */
export function wrapperEnv(envConf) {
  const ret = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    ret[envName] = realName;
  }
  return ret;
}

/**
 * 获取用户根目录
 * @param {...string} dir - 文件路径
 * @returns {string} 用户根目录路径
 */
export function getRootPath(...dir) {
  return path.resolve(process.cwd(), ...dir);
}

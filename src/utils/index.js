/**
 * 检查值是否为 null、undefined、空字符串或 NaN
 * @param {*} value - 需要检查的值
 * @param {string} [message='Invalid value'] - 抛出错误时的提示信息
 * @throws {Error} 如果值为 null、undefined、空字符串或 NaN，则抛出错误
 */
export const validateValue = (value, message = "Invalid value") => {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) {
    throw new Error(message);
  }
  return true;
};

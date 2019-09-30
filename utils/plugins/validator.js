/*
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-19 18:45:51
 */
/***
 * @file:
 * @author: linkun.he
 * @Date: 2019-07-03 10:00:19
 */
// 正则匹配
const Pattern = {
  isNum: /^\d+(\.\d+)?$/,
  isEmpty: /^[ ]+$/g,
  isMobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
  isCnAndEn: /^[\u4E00-\u9FA5]+$/,
  isCnAndEnAndNum: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,
  isUserName: /^[(\u4e00-\u9fa5)a-zA-Z]+$/,
  isPassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  isAuthCode: /^[0-9]{6}$/,
  isTelAndMobile: /^(1[3|4|5|7|8|9][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})$/,
  isEmail: /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
};

// 错误信息
let ERROR_TIPS = {
  commonError: '此项不能为空！',
  telAndMobileError: '号码不正确，请重新输入！',
  emailError: '邮箱格式错误，请重新输入！',
  numberError: '此项只能为数字类型',
  typeError: '格式不正确，请重新输入'
};

export default {
  /**
   * 执行正则表达式
   * @param pattern 校验的正则表达式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  executeExp: function(pattern, strValue) {
    return pattern.test(strValue);
  },
  /**
   * 判断字符串是否为空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isEmpty: function(strValue) {
    strValue = strValue.replace(Pattern.isEmpty, '');
    return strValue.length === 0;
  },
  /**
   * 判断字符串是否非空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isNotEmpty: function(strValue) {
    return !this.isEmpty(strValue);
  },

  /**
   * 判断是否为中文
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEn: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isCnAndEn, strValue);
  },
  /**
   * 判断是否为中英文、数字及'-'
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEnAndNum: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isCnAndEnAndNum, strValue);
  },
  /**
   * 判断是否为用户名
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isUserName: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isUserName, strValue);
  },
  /**
   * 判断验证码格式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isAuthCode: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isAuthCode, strValue);
  },
  /**
   * 判断是否为手机号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isMobile: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isMobile, strValue);
  },
  /**
   * 判断是否为手机或电话号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isTelAndMobile: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isTelAndMobile, strValue);
  },
  /**
   * 判断是否符合密码规则
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isPassword: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isPassword, strValue);
  },
  /**
   * 对象是否为空
   * @param obj 检验对象
   * @returns {boolean}
   */
  isEmptyObj: obj => {
    return Object.keys(obj).length === 0;
  },
  /**
   * 是否在范围长度内
   * @param 范围数组 [1, 10] 长度在1-10内
   * @returns {boolean}
   */
  isLenRange: (strValue, lenArr) => {
    return strValue.length >= lenArr[0] && strValue.length <= lenArr[1];
  },
  /**
   * 是否在数值范围内
   * @param 范围数组 [1, 10] 数值在1-10内
   * @returns {boolean}
   */
  isNumRange: (numValue, numArr) => {
    return numValue >= numArr[0] && numValue <= numArr[1];
  },
  /**
   * 是否在数值范围内
   * @param 范围数组 [1, 10] 数值在1-10内
   * @returns {boolean}
   */
  isEmail: function(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    return this.executeExp(Pattern.isEmail, strValue);
  },
  /**
   * 判断是否是数字
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isNum: function(strValue) {
    return this.executeExp(Pattern.isNum, strValue);
  },

  isFourNum: function(strValue) {
    return this.executeExp(Pattern.isFourDecimalPlaces, strValue);
  },

  ...ERROR_TIPS,
  ...Pattern
};

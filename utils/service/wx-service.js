/***
 * @FileName: wx.登录时处理的功能的服务
 * @Date: 2019-10-16 13:44:25
 * @author: manyao.zhu
 */

/***
 * @@description:  微信登录的封装
 * @@param: {url、param}
 * @@method:
 * @@return:
 */

const wxLogin = (url, param) => {
  const app = getApp();
  return new Promise((resolve, reject) => {
    // 1. 微信账号登录，获取code码到后端，校验是否为已注册用户
    wx.login({
      success: res => {
        console.log('微信账号自动登录', res);
        // 2. 从后端获取用户信息：已注册或未注册
        let params = {
          code: res.code,
          ...param
        };
        app.http.post(url, params).then(res => {
          if (res.status) {
            resolve(res);
          }
        });
      }
    });
  });
};

module.exports = {
  wxLogin
};

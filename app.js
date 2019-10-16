/***
 * @FileName:
 * @Author: manyao.zhu
 * @Date: 2019-09-27 11:45:18
 * @fileName:
 * @file:
 * @author: manyao.zhu
 */
/*
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-16 15:47:10
 */
//app.js
import ZMY from './utils/index';
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    this.globalData.wxLogin = this.wxLogin;

    // 登录操作
    // this.wxLogin();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  wxLogin() {
    console.log('denglu');
    return new Promise((resolve, reject) => {
      // 1. 微信账号登录，获取code码到后端，校验是否为已注册用户
      wx.login({
        success: res => {
          console.log('微信账号自动登录', res);
          // 2. 从后端获取用户信息：已注册或未注册
          let param = {
            code: res.code,
            tenantId: this.globalData.tenantId
          };
          this.http.post('url', param).then(res => {
            if (res.status) {
              // 这里还缺少相应的操作
              // if ('成功') {
              this.getUserInfo();
              // } else {
              // 去注册或者登录
              // }
              resolve();
            }
          });
        }
      });
    });
  },

  // 获取用户信息
  getUserInfo() {
    console.log('保存信息');
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    wxLogin: null
  },
  ...ZMY
});

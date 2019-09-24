/*
 * @FileName: 
 * @Author: 朱满要
 * @Date: 2019-08-19 17:27:51
 */
import CONFIG from './config'

const http = ({url = '', param = {}, header = {}, showLoading = true, ...config} = {}) => {
  toggleLoading(true, showLoading);
  return new Promise( (resolve, reject) => {
    function requestApi () {
      const app = getApp();
      if (app && app.globalData.accessToken) {
        header.Authorization = `Bearer ${app.globalData.accessToken}`;
      }
      wx.request({
        url: getUrl(url),
        data: app.util.deleteEmptyObj(data),
        header,
        ...config,
        complate: (res) => {
          toggleLoading(false, showLoading);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            if (res.data.status) {
              // 这里是当 accessToken 失效时重新获取
              if (Number(res.data.code) === 1002) {
                app.globalData.accessToken = null;
                app.globalData.wxLogin().then((res) => {
                  requestApi();
                });
              }
              // 这里是响应的拦截，统一处理
              resolve(res.data);
              // 错误统一处理
            } else {
              wx.showToast({
                title: res.data.messages,
                duration: 2000,
                icon: 'none',
              });
              console.log('出现错误了', res);
              resolve(res.data);
            }
          } else {
            reject(res);
          }
        }
      });
    }
    requestApi();
  })
};

const toggleLoading = (toggle, showLoading) => {
  if (!showLoading) return;
  if (toggle) {
    wx.showLoading({
      title: '正在请求中..',
    })
  } else {
    wx.hideLoading();
  }
};

const getUrl = (url) => {
  if (url.toLowerCase().indexOf('://') === -1) {
    url = CONFIG.BASE_API + url;
  } else {
    url = url;
  }
  return url;
};

const get = (url, param= {}, showLoading = true) => {
  return http({
    url,
    param,
    method: 'get',
    header: {},
    showLoading: showLoading
  })
};

const post = (url, param={}, showLoading = true) => {
  return http({
    url,
    param,
    method: 'post',
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    showLoading: showLoading,
  })
};

const postJson = (url, param = {}, showLoading = true) => {
  return http({
    url,
    param,
    method: 'post',
    header: {},
    dataType: 'json',
    showLoading: showLoading
  })
};

const put = (url, param = {}, showLoading = true) => {
  return http({
    url,
    param,
    method: 'put',
    header: {},
    showLoading: showLoading,
  });
};

module.exports = {
  get,
  post,
  postJson,
  put,
}
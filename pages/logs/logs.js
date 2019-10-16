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
//logs.js
const util = require('../../utils/plugins/util');

Page({
  data: {
    logs: []
  },
  onLoad: function() {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  },
  remove(evt) {
    console.log(evt);
  },
  like(evt) {
    console.log(evt);
  },
  unlike(evt) {
    console.log(evt);
  }
});

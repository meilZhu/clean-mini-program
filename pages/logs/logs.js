/*
 * @FileName: 
 * @Author: 朱满要
 * @Date: 2019-08-16 15:47:10
 */
//logs.js
const util = require('../../utils/plugins/util')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})

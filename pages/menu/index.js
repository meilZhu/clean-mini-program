/***
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-16 15:49:09
 * @file:
 * @author: linkun.he
 */
/*
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-16 15:49:09
 */
// pages/menu/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    fn: null,
    fn1: null,
    fn2: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      fn: app.util.debounceNotNow(this.handle, 1000),
      fn1: app.util.debounceNow(this.handle, 1000),
      fn2: app.util.throttle(this.handle, 1500)
    });
  },

  jumpSupplierAdd() {
    wx.reLaunch({
      url: '/pages/supplier/supplier-add/index'
    });
  },

  debounce() {
    this.data.fn();
  },

  debouncenow() {
    this.data.fn1();
  },

  throttle() {
    this.data.fn2();
  },

  handle() {
    console.log('12143464');
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});

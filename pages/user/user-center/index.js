/***
 * @fileName:
 * @file:
 * @Date: 2019-09-24 23:21:46
 * @author: manyao.zhu
 */
// pages/user/user-center/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 时间
    time: null
  },

  //
  confirmDate(evt) {
    this.setData({
      time: evt.detail.date
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {}
});

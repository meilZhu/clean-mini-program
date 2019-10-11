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
    time: null,
    // 理由
    reason: null,
    serachText: '',
    tabs: [
      {
        typeName: '详情',
        index: 0
      },
      {
        typeName: '待处理',
        index: 1
      }
    ],
    isFixed: false
  },

  //
  confirmDate(evt) {
    this.setData({
      time: evt.detail.date
    });
  },

  inputTextarea(evt) {
    this.setData({
      reason: evt.detail
    });
  },

  tabEvent(evt) {
    console.log(evt);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  //
  onPageScroll: function(ev) {
    if (ev.scrollTop > 54) {
      this.setData({
        isFixed: true
      });
    } else {
      this.setData({
        isFixed: false
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {}
});

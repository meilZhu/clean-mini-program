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
    isFixed: false,
    // 右侧滑块的宽
    rightWidth: 65,
    // 左侧滑块的宽
    leftWidth: 0
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
    if (ev.scrollTop > 0) {
      this.setData({
        isFixed: true
      });
    } else {
      this.setData({
        isFixed: false
      });
    }
  },

  show() {
    this.hhh('要笑');
  },

  close() {
    console.log(11111);
  },

  hhh(title, succ, fail) {
    wx.showModal({
      title: '提示信息',
      content: `确定${title}吗？`,
      confirmColor: '#5F9EFD',
      success: function(evt) {
        if (evt.confirm && succ) {
          succ();
        } else if (evt.cancel && fail) {
          fail();
        }
      }
    });
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

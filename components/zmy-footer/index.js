/***
 * @FileName: 页面底部组件
 * @Author: manyao.zhu
 * @Date: 2019-10-12 16:26:22
 */
// components/dt-footer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 底部按钮的数据
    propBtn: {
      type: Array,
      default: [],
    },
  },

  observers: {
    propBtn: function(arr) {
      this.setData({
        btns: arr,
      });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // btn数据
    btns: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnEvent(evt) {
      evt;
      let code = evt.currentTarget.dataset.code;
      if (code === 'cancel') {
        this.goBack();
      } else if (code === 'sure') {
        this.triggerEvent('sureEvent');
      } else {
        this.triggerEvent('otherEvent');
      }
    },

    // 返回上一页的操作
    goBack() {
      wx.navigateBack({
        delta: 1,
      });
    },
  },
});

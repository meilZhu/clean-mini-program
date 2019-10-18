/***
 * @fileName: 富文本组件的封装
 * @file:
 * @Date: 2019-10-10 14:52:50
 * @author: manyao.zhu
 */
// components/zmy-rich-text/index.js

const app = getApp();
var WxParse = require('../../../miniprogram_npm/wxParse/wxParse.js');

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持(以及具名插槽)
  },
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 获取数据的路径
     */
    url: {
      type: String,
      value: ''
    },
    /**
     * 获取数据的参数
     */
    param: {
      type: Object,
      value: {}
    }
  },

  // 数据监听
  observers: {},

  /**
   * 组件的初始数据
   */
  data: {},

  // 组件被刚刚创建时触发
  ready: function() {
    this.initData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initData() {
      app.http.post(this.data.path, this.data.param).then(res => {
        console.log('------获取富文本数据-----');
        console.log(res);
        if (res.status) {
          WxParse.wxParse('notice', 'html', res.data.content, this, 0);
        }
      });
    }
  }
});

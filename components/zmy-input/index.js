/***
 * @FileName:
 * @Author: manyao.zhu
 * @Date: 2019-09-29 13:26:09
 * @fileName:
 * @file:
 * @author: manyao.zhu
 */
// components/zmy-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 输入框标题 （必传）
     */
    propTitle: {
      type: String,
      value: ''
    },
    /**
     * 错误的提示信息 （选传）
     */
    propErrTips: {
      type: String,
      value: ''
    },
    /**
     * 输入框的内容  （必传）
     */
    propText: {
      type: String,
      value: ''
    },
    /**
     * 是否只读  （选传 默认： false）
     */
    propReadonly: {
      type: Boolean,
      value: false
    },
    /**
     * 输入框最大长度  （选传， 默认： 15）
     */
    propMaxlength: {
      type: Number,
      value: 15
    },
    /**
     * 输入框的占位符  （选传， 默认： 请输入）
     */
    propPlaceholder: {
      type: String,
      value: '请输入'
    },
    /**
     * 输入框要校验的类型 （选传， 默认： default）
     */
    propType: {
      type: String,
      value: 'default'
    }
    /**
     * 输入框所在列表的索引  （选传， 默认： 0）
     */
  },

  // 数据监听
  observers: {
    propTitle: function(str) {
      this.setData({
        label: str
      });
    },
    propErrTips: function(str) {
      this.setData({
        errTips: str
      });
    },
    propText: function(str) {
      this.setData({
        text: str
      });
    },
    propReadonly: function(bool) {
      this.setData({
        readonly: bool
      });
    },
    propIndex: function(num) {
      this.setData({
        index: num
      });
    },
    propType: function(str) {
      this.setData({
        type: str
      });
    },
    propMaxlength: function(num) {
      this.setData({
        maxlength: num
      });
    },
    propPlaceholder: function(str) {
      this.setData({
        placeholder: str
      });
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * 传递过来的属性
     */
    // 标题
    label: '测试输入框',
    // 错误提示信息
    errTips: '',
    // 输入框内容
    text: null,
    // 是否只读
    readonly: false,
    // 所在的索引
    index: 0,
    // 输入框的所处理的类型
    type: 'default',
    // 最大长度
    maxlength: 200,
    // 占位符
    placeholder: '请输入'
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});

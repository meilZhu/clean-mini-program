/***
 * @FileName: 文本域输入框组件（主要解决其层级过高的问题）
 * @Author: manyao.zhu
 * @Date: 2019-09-29 09:08:24
 * @fileName:
 * @file:
 * @author: manyao.zhu
 */
// components/zmy-textarea/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 接受的文本内容 （必传）
     */
    propText: {
      type: String,
      value: null
    },
    /**
     * 定义文本域的高度 （选传： 默认： 200）
     */
    propHeight: {
      type: Number,
      value: 200
    },
    /**
     * 是否只读 （选传: 默认 false）
     */
    propReadonly: {
      type: Boolean,
      value: false
    },
    /**
     * 文本域的最大长度 ( 选传： 默认 200)
     */
    propMaxlength: {
      type: Number,
      value: 200
    },
    /**
     * 当文本为空时的提示内容 （选传;  默认： 请输入）
     */
    propPlaceholder: {
      type: String,
      value: '请输入'
    }
  },

  observers: {
    propText: function(str) {
      this.setData({
        textarea: str
      });
    },
    propHeight: function(num) {
      console.log(num);
      this.setData({
        height: num
      });
    },
    propMaxlength: function(num) {
      this.setData({
        maxlength: num
      });
    },
    propReadonly: function(bool) {
      this.setData({
        readonly: bool
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
    // 当可以操作时控制输入框隐现
    showTextarea: false,
    // 是否聚焦
    onFocus: false,
    /**
     * 传递的属性
     */
    // 文本域的高度
    height: 200,
    // 提示信息
    placeholder: '请输入',
    // 文本域内容
    textarea: null,
    // 最大长度
    maxlength: 200,
    // 是否只读
    readonly: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示文案的点击事件以及输入框的失焦事件
    triggerTextarea() {
      this.setData({
        showTextarea: !this.data.showTextarea,
        onFocus: !this.data.onFocus
      });
    },

    // 文本域的输入事件
    textareaInput(evt) {
      let text = evt.detail.value;
      this.triggerEvent('inputTextarea', text);
    }
  }
});

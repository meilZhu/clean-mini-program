/***
 * @fileName:
 * @file:
 * @Date: 2019-09-24 23:52:07
 * @author: manyao.zhu
 */
// components/zmy-date-picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 传递过来的索引，这个是在父组件中列表中可能用到 （选填）
     */
    propIndex: {
      type: Number,
      value: 0
    },
    /**
     * 选择时间组件的标题 （必填）
     */
    propTitle: {
      type: String,
      value: ''
    },
    /**
     * 传递过来的时间 （必填【回显时要用到】）
     */
    propDate: {
      type: String,
      value: null
    },
    /**
     * 传递过来的选择时间的类型 （选填；默认是date【年月日】 datetime 【年月日时分】 year-month 【年月】, time 【时分】）
     */
    propType: {
      type: String,
      value: 'datetime'
    },
    /**
     * 是否是可以编辑的状态 （选填； 默认是false）
     */
    propReadonly: {
      type: Boolean,
      value: false
    },
    /**
     * 取值范围 （选填； 默认不传为空， 用去判定时取一天的开始点 pre: 0：00:00  还是去最晚点 next： 23:59:59）
     */
    propRange: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前时间
    currentDate: new Date().getTime(),
    // 最小时间
    minDate: null, // 这里不做限制
    // 时间
    date: null,
    // 标题
    title: null,
    // 是否自读
    readonly: false,
    // 事件类型
    type: 'date',
    // 所在的索引
    index: 0,
    // 控制事件选择器隐现
    showPicker: false,
    // 时间的取值点
    range: ''
  },

  observers: {
    propIndex: function(index) {
      this.setData({
        index
      });
    },
    propTitle: function(str) {
      this.setData({
        title: str
      });
    },
    propReadonly: function(bool) {
      this.setData({
        readonly: bool
      });
    },
    propDate: function(date) {
      this.setData({
        date
      });
    },
    propType: function(str) {
      this.setData({
        type: str
      });
      // 这里是由于有赞的时间选择器在类型是time时给的不是时间戳，而是一个时间点，不能用new Date() 赋值当前时间
      if (str === 'time') {
        this.setData({
          currentDate: null
        });
      }
    },
    propRange: function(str) {
      this.setData({
        range: str
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择时间(展现事件)
    showDatePicker() {
      this.setData({
        showPicker: true
      });
    },
    // 确定
    confirmDate(evt) {
      // console.log('选择的时间', evt.detail);
      this.setData({
        showPicker: false
      });
      let obj = {
        date: this.handleTime(evt.detail),
        index: this.data.index
      };
      this.triggerEvent('confirmDate', obj);
    },
    // 取消事件
    cancelDate(evt) {
      this.setData({
        showPicker: false
      });
    },

    // 对选择时间范围的处理
    handleTime(time) {
      let range = this.data.range;
      switch (range) {
        case 'pre':
          time = new Date(time).setHours(0, 0, 0, 0);
          break;
        case 'next':
          time = new Date(time).setHours(23, 59, 59, 999);
          break;
        case !range:
          time = time;
          break;
        default:
      }
      return time;
    }
  }
});

/***
 * @fileName: 时间选择器组件
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
    index: {
      type: Number,
      value: 0
    },
    /**
     * 选择时间组件的标题 （必填）
     */
    title: {
      type: String,
      value: ''
    },
    /**
     * 传递过来的时间 （必填【回显时要用到】）
     */
    date: {
      type: String,
      value: null
    },
    /**
     * 传递过来的选择时间的类型 （选填；默认是date【年月日】 datetime 【年月日时分】 year-month 【年月】, time 【时分】）
     */
    type: {
      type: String,
      value: 'date'
    },
    /**
     * 是否是可以编辑的状态 （选填； 默认是false）
     */
    readonly: {
      type: Boolean,
      value: false
    },
    /**
     * 取值范围 （选填； 默认不传为空， 用去判定时取一天的开始点 pre: 0：00:00  还是去最晚点 next： 23:59:59）
     */
    range: {
      type: String,
      value: ''
    },
    /**
     * 时间的最大取值
     */
    maxDate: {
      type: Number,
      value: new Date().getTime() + 315619200000
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
    // 控制事件选择器隐现
    showPicker: false,
    // 类型：
    types: 'date'
  },

  observers: {
    type: function(str) {
      this.setData({
        types: str
      });
      // 这里是由于有赞的时间选择器在类型是time时给的不是时间戳，而是一个时间点，不能用new Date() 赋值当前时间
      if (str === 'time') {
        this.setData({
          currentDate: null
        });
      }
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
      console.log(time);
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

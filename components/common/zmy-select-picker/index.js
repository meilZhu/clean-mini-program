/***
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-23 10:47:48
 * @file:
 * @author: manyao.zhu
 */
// components/zmy-select-picker/index.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接受是否展示后面的箭头的属性
    readonly: {
      type: Boolean,
      value: false
    },
    // 左方的标题
    title: {
      type: String,
      value: null
    },
    // 展示的数据
    data: {
      type: String,
      value: null
    },
    // 请求的接口
    url: {
      type: String,
      value: null
    },
    // 请求的参数
    param: {
      type: Object,
      value: {}
    },
    // 请求结果处理那个展示的属性值
    showProperty: {
      type: String,
      value: null
    },
    // 请求结果操作的属性值
    oprProperty: {
      type: String,
      value: null
    },
    // 接受的的数据list [不调接口时用]
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否展示内容
    pickerShow: false,
    // 弹框数据
    pickerList: [],
    // 储存中数据
    pickerAllList: []
  },

  observers: {},

  /**
   * 组件的方法列表
   */
  methods: {
    changeInfo() {
      // 这里的抛出事件是用于参数的处理、
      this.setData({
        pickerShow: true
      });
      if (this.properties.url) {
        this.triggerEvent('change');
        app.http.post(this.properties.url, this.properties.param).then(res => {
          console.log('-----------选择器组件调取接口成功----------');
          console.log(res);
          if (res.status) {
            this.handleData(res.data);
          }
        });
      } else {
        this.handleData(this.properties.list);
      }
    },

    // 数据的处理
    handleData(data) {
      let arr = [];
      let array = [];
      data.forEach(t => {
        let obj = {};
        obj[this.properties.showProperty] = t[this.properties.showProperty];
        obj[this.properties.oprProperty] = t[this.properties.oprProperty];
        arr.push(obj);
        array.push(t[this.properties.showProperty]);
      });
      this.setData({
        pickerAllList: arr,
        pickerList: array
      });
    },

    // 取消事件
    cancel() {
      this.setData({
        pickerShow: false
      });
    },

    confirm(event) {
      let value = event.detail.value;
      let arr = this.data.pickerAllList;
      arr.forEach(t => {
        if (t[this.properties.showProperty] === value) {
          let obj = {};
          obj.opr = t[this.properties.oprProperty];
          obj.show = t[this.properties.showProperty];
          this.triggerEvent('confirm', obj);
          this.setData({
            pickerShow: false
          });
        }
      });
    }
  }
});

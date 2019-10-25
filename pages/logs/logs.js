/***
 * @FileName:
 * @Author: manyao.zhu
 * @Date: 2019-09-27 11:45:18
 * @fileName:
 * @file:
 * @author: manyao.zhu
 */
/*
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-16 15:47:10
 */
//logs.js
const util = require('../../utils/plugins/util');

Page({
  data: {
    logs: [],
    btns: [
      {
        typeName: '取消',
        type: 'cancel',
        codeType: 'cancel',
        btnType: 'normal'
      },
      {
        typeName: '确定',
        type: 'sure',
        codeType: 'sure',
        btnType: 'lineWarning'
      }
    ],
    date: null,
    dateId: null,
    list: [
      {
        label: '1',
        value: '张三'
      },
      {
        label: '2',
        value: '李四'
      }
    ]
  },
  onLoad: function() {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  },
  remove(evt) {
    console.log(evt);
    let date = new Date('2000-01-01').getTime();
    console.log(date);
    let time = new Date('2010-01-01').getTime();
    console.log(time);
    let t = time - date;
    console.log(t);
  },
  like(evt) {
    console.log(evt);
  },
  unlike(evt) {
    console.log(evt);
  },
  handleContact(e) {
    console.log(e.detail.path);
    console.log(e.detail.query);
  },

  sure(evt) {
    this.setData({
      date: evt.detail.show,
      dateId: evt.detail.opr
    });
  }
});

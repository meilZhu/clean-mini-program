/***
 * @FileName: 带有左右滑块的块组件的封装
 * @Author: manyao.zhu
 * @Date: 2019-10-15 17:37:43
 * @fileName:
 * @file:
 * @author: manyao.zhu
 */
// components/zmy-sliding-block/index.js
import Confirm from '../../../pages/shared/service/confirm-service';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 右侧操作是否需要异步（二次确认）
     */
    propRightAsync: {
      type: Boolean,
      value: false
    },
    /**
     * 右侧滑块的宽度
     */
    propRightWidth: {
      type: Number,
      value: 65
    },
    /**
     * 右侧滑块的文案
     */
    propRightText: {
      type: String,
      value: '删除'
    },
    /**
     * 右侧滑块的背景
     */
    propRightBgColor: {
      type: String,
      value: '#e64340'
    },
    /**
     * 右侧滑块的字体颜色
     */
    propRightColor: {
      type: String,
      value: '#fff'
    },

    /**
     * 左侧操作是否需要异步 （二次确认）
     */
    propLeftAsync: {
      type: Boolean,
      value: false
    },
    /**
     * 左侧滑块的宽度
     */
    propLeftWidth: {
      type: Number,
      value: 65
    },
    /**
     * 左侧滑块的文案
     */
    propLeftText: {
      type: String,
      value: '删除'
    },
    /**
     * 右侧滑块的背景
     */
    propLeftBgColor: {
      type: String,
      value: '#e64340'
    },
    /**
     * 右侧滑块的字体颜色
     */
    propLeftColor: {
      type: String,
      value: '#fff'
    },

    // 左右滑块的公共属性
    propFontSize: {
      type: Number,
      value: 28
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 右侧滑块的宽
    rightWidth: 65,
    // 右侧滑块的提示文案
    rightText: '删除',
    // 右侧滑块否异步处理数据
    rightAsync: false,
    // 右侧滑块的背景
    rightBgColor: '#e64340',
    // 右侧滑块的字体颜色
    rightColor: '#fff',
    // 左侧滑块的宽
    leftWidth: 65,
    // 左侧滑块的提示文案
    leftText: '收藏',
    // 左侧滑块是否异步处理数据
    leftAsync: false,
    // 左侧滑块的背景
    leftBgColor: '#09bb07',
    // 左侧滑块的字体颜色
    leftColor: '#fff',

    /**
     * 公共属性
     */
    // 左右滑块的字体大小
    fontSize: 28
  },

  // 数据监听
  observers: {
    // 右侧滑块属性监听
    propRightWidth: function(num) {
      this.setData({
        rightWidth: num
      });
    },
    propRightText: function(str) {
      this.setData({
        rightText: str
      });
    },
    propRightAsync: function(bool) {
      this.setData({
        rightAsync: bool
      });
    },
    propRightBgColor: function(str) {
      this.setData({
        rightBgColor: str
      });
    },
    propRightColor: function(str) {
      this.setData({
        rightColor: str
      });
    },
    // 左侧滑块属性监听
    propLeftWidth: function(num) {
      this.setData({
        leftWidth: num
      });
    },
    propLeftText: function(str) {
      this.setData({
        leftText: str
      });
    },
    propLeftAsync: function(bool) {
      this.setData({
        leftAsync: bool
      });
    },
    propLeftBgColor: function(str) {
      this.setData({
        leftBgColor: str
      });
    },
    propLeftColor: function(str) {
      this.setData({
        leftColor: str
      });
    },
    // 左右共同属性监听
    propFontSize: function(num) {
      this.setData({
        fontSize: num
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRemove(event) {
      const { position, instance } = event.detail;
      switch (position) {
        case 'left':
          if (this.data.leftAsync) {
            // 这里需要二次确认
            Confirm.confirm(this.data.leftText, this.exportLeftEvent, this);
          } else {
            // 这里不需要二次确认，
            this.triggerEvent('leftUnAsyncEvent');
          }
          instance.close();
          break;
        case 'cell':
          instance.close();
          break;
        case 'right':
          if (this.data.rightAsync) {
            Confirm.confirm(this.data.rightText, this.exportRightEvent, this);
          } else {
            this.triggerEvent('rightUnAsyncEvent');
          }
          instance.close();
          break;
        default:
      }
    },

    // 右侧抛出事件（异步）
    exportRightEvent(fns) {
      let self = fns[0];
      self.triggerEvent('rightAsyncEvent');
    },

    // 左侧的抛出事件（异步）
    exportLeftEvent(fns) {
      let self = fns[0];
      self.triggerEvent('leftAsyncEvent');
    }
  }
});

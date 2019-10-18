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
    rightAsync: {
      type: Boolean,
      value: false
    },
    /**
     * 右侧滑块的宽度
     */
    rightWidth: {
      type: Number,
      value: 65
    },
    /**
     * 右侧滑块的文案
     */
    rightText: {
      type: String,
      value: '删除'
    },
    /**
     * 右侧滑块的背景
     */
    rightBgColor: {
      type: String,
      value: '#e64340'
    },
    /**
     * 右侧滑块的字体颜色
     */
    rightColor: {
      type: String,
      value: '#fff'
    },

    /**
     * 左侧操作是否需要异步 （二次确认）
     */
    leftAsync: {
      type: Boolean,
      value: false
    },
    /**
     * 左侧滑块的宽度
     */
    leftWidth: {
      type: Number,
      value: 0
    },
    /**
     * 左侧滑块的文案
     */
    leftText: {
      type: String,
      value: '删除'
    },
    /**
     * 右侧滑块的背景
     */
    leftBgColor: {
      type: String,
      value: '#e64340'
    },
    /**
     * 右侧滑块的字体颜色
     */
    leftColor: {
      type: String,
      value: '#fff'
    },

    // 左右滑块的公共属性
    lontSize: {
      type: Number,
      value: 28
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  // 数据监听
  observers: {},

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
            this.triggerEvent('leftUnAsyncConfirm');
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
            this.triggerEvent('rightUnAsyncConfirm');
          }
          instance.close();
          break;
        default:
      }
    },

    // 右侧抛出事件（异步）
    exportRightEvent(fns) {
      let self = fns[0];
      self.triggerEvent('rightAsyncConfirm');
    },

    // 左侧的抛出事件（异步）
    exportLeftEvent(fns) {
      let self = fns[0];
      self.triggerEvent('leftAsyncConfirm');
    }
  }
});

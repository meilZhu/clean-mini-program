/***
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-20 10:49:47
 * @file:
 * @author: linkun.he
 */
// pages/procure/component/common/header/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持(以及具名插槽)
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 头部是否需要固定定位 (选传，默认false、)
     */
    status: {
      type: Boolean,
      value: false
    },
    /**
     * 接收的头部tab键的数据 （选传， 默认[]）
     */
    tab: {
      type: Array,
      vlaue: []
    },
    /**
     * 搜索框的内容  （必传）
     */
    text: {
      type: String,
      value: null
    },
    /**
     * 搜索框的占位符 （必传）
     */
    placeholder: {
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 搜索内容
    searchText: null,
    // 控制状态
    isFixed: false,
    // tab 键的内容
    notifyTypes: [],
    // 滑动时的索引
    activeIndex: 0
  },

  // 监听
  observers: {
    status: function(bool) {
      this.setData({
        isFixed: bool
      });
    },
    tab: function(data) {
      console.log(data);
      this.setData({
        notifyTypes: data
      });
    },
    text: function(str) {
      this.setData({
        searchText: str
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch(event) {
      this.triggerEvent('onSearch', event.detail);
    },

    changeType(event) {
      this.setData({
        activeIndex: event.detail.index
      });
      this.triggerEvent('toggleTab', event.detail.index);
    }
  }
});

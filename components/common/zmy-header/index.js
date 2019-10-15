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
    propStatus: {
      type: Boolean,
      value: false
    },
    /**
     * 接收的头部tab键的数据 （选传， 默认[]）
     */
    propTab: {
      type: Array,
      vlaue: []
    },
    /**
     * 搜索框的内容  （必传）
     */
    propText: {
      type: String,
      value: null
    },
    /**
     * 搜索框的占位符 （必传）
     */
    propPlaceholder: {
      type: String,
      value: null
    },
    /**
     * 接收判断是否需要tab键（【选传，默认true】若不需要，tab就可以不传了）
     */
    propHasTab: {
      type: Boolean,
      value: true
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
    // 提示语
    placeholder: null,
    // 是否需要tab键
    hasTab: true
  },

  // 监听
  observers: {
    propStatus: function(bool) {
      this.setData({
        isFixed: bool
      });
    },
    propTab: function(data) {
      this.setData({
        notifyTypes: data
      });
    },
    propText: function(str) {
      this.setData({
        searchText: str
      });
    },
    propPlaceholder: function(str) {
      this.setData({
        placeholder: str
      });
    },
    propHasTab: function(bool) {
      this.setData({
        hasTab: bool
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch(event) {
      this.triggerEvent('searchEvent', event.detail);
    },

    changeType(event) {
      this.triggerEvent('tabEvent', event.detail.index);
    }
  }
});

/***
 * @FileName: 图片预览组件
 * @Author: manyao.zhu
 * @Date: 2019-10-15 11:27:17
 */
// components/dt-picture-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 这里是只接受图片的路径 (选传)
     * */
    propImgSrc: {
      type: String,
      value: ''
    },
    /**
     * 接受包含图片路径的数组 （选传）
     */
    propImages: {
      type: Array,
      value: []
    },
    /**
     * 是否展示删除按钮
     */
    propRemove: {
      type: Boolean,
      value: true
    }
  },

  // 数据监听
  observers: {
    propImgSrc: function(str) {
      if (!str) {
        this.setData({
          single: false
        });
      } else {
        this.setData({
          imgSrc: str,
          single: true
        });
      }
    },
    propImages: function(arr) {
      if (arr.length === 0) {
        this.setData({
          single: true
        });
      } else {
        this.setData({
          single: false,
          images: arr
        });
      }
    },
    propRemove: function(bool) {
      this.setData({
        showRemoveBtn: bool
      });
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 包含多张图片路径的数组（内部为对象）
    images: [],
    // 图片的路径
    imgSrc: '',
    // 是否为一张图片
    single: true,
    // 尺寸的盒子
    imgSize: {},
    // 是否展示删除按钮
    showRemoveBtn: true
  },

  ready: function() {},

  /**
   * 组件的方法列表
   */
  methods: {
    closeImgContain() {
      this.triggerEvent('closeEvent');
    },

    // 单独一张图片的加载
    singleImgLoad(evt) {
      var $width = evt.detail.width, //获取图片真实宽度
        $height = evt.detail.height,
        ratio = $width / $height; //图片的真实宽高比例
      var viewWidth = 718, //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 718 / ratio; //计算的高度值
      var image = this.data.imgSize;
      //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
      image = {
        width: viewWidth,
        height: viewHeight
      };
      this.setData({
        imgSize: image
      });
    },

    // 多张图片的加载
    manyImgLoad(evt) {
      let index = evt.currentTarget.dataset.index;
      var $width = evt.detail.width, //获取图片真实宽度
        $height = evt.detail.height,
        ratio = $width / $height; //图片的真实宽高比例
      var viewWidth = 718, //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 718 / ratio; //计算的高度值
      var image = this.data.imgSize;
      //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
      image[index] = {
        width: viewWidth,
        height: viewHeight
      };
      this.setData({
        imgSize: image
      });
    },

    // 底部的删除事件
    remove() {
      this.triggerEvent('removeEvent');
    }
  }
});

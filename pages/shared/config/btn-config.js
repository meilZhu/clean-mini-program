/***
 * @FileName: 底部按钮的所有配置
 * @Author: manyao.zhu
 * @Date: 2019-10-12 16:47:42
 */

/**
 * 包含取消和确定按钮的配置
 */
const cancelAndSureConf = [
  {
    typeName: '取消',
    type: 'cancel',
    code: 'cancel',
    bgColor: '#fff',
    color: '#5e9dfd'
  },
  {
    typeName: '确认',
    type: 'sure',
    code: 'sure',
    bgColor: '#5e9dfd',
    color: '#fff'
  }
];

// 这里是配置需要加权限的按钮
/**
 * 包含废弃和确定按钮的配置
 */
const abandonAndSureConf = [
  {
    typeName: '废弃',
    type: 'disused',
    code: 'other',
    permission: false,
    bgColor: '#fff',
    color: '#5e9dfd'
  },
  {
    typeName: '新增',
    type: 'add',
    code: 'sure',
    permission: false,
    bgColor: '#5e9dfd',
    color: '#fff'
  }
];

module.exports = {
  // 不需要加权限
  cancelAndSureConf,
  // 要加权限
  abandonAndSureConf
};

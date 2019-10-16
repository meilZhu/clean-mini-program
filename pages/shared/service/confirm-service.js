/***
 * @file: 二次确认服务
 * @author: manyao.zhu
 * @Date: 2019-09-23 11:27:01
 */

/***
 * @param title {string} 提示信息标题，传入关键词
 * @param succ  {function} 确认回调
 * @patam fail {function} 取消回调
 * @param arr {string||array||obj} 确认回调函数的形参
 * */
const confirm = (title, succ, ...param) => {
  wx.showModal({
    title: '提示信息',
    content: `确定${title}吗？`,
    confirmColor: '#5F9EFD',
    success: function(evt) {
      if (evt.confirm && succ) {
        succ(param);
      }
    }
  });
};

module.exports = {
  confirm
};

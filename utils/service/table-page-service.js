/***
 * @FileName: 处理页面列表数据的服务
 * @Author: manyao.zhu
 * @Date: 2019-09-23 17:30:50
 * @file:
 * @author: manyao.zhu
 */

/**
 * 处理列表接口数据的统一方法
 * @param {this} self  该方法所绑定的上下文
 * @param {arr} arr 接口返回的列表的数据
 * @param {toatl} total  列表的总数
 * @param {bool} bool 是否需要添加处理去是否都选属性(选填) 复选为Boolean  单选为String
 *
 * 使用他有个前提： 每页数量pageSize/页码pageNum/是否还有更多数据hasMoreData
 */
const handleTableData = (self, arr, total, bool = false) => {
  wx.stopPullDownRefresh();
  let num = Math.ceil(total / self.data.pageSize);
  let newArr = [];
  // 这里处理页面是否需要进行勾选操作
  if (bool && bool !== 'true') {
    arr.map(t => {
      t.checked = false;
    });
  } else if (bool === 'true') {
    arr.map(t => {
      t.checked = 'false';
    });
  }
  // 处理第一页和其他页的不同
  if (self.data.pageNum === 1) {
    newArr = [];
  } else {
    newArr = self.data.tableData;
  }
  newArr = [...newArr, ...arr];
  if (
    arr.length < self.data.pageSize ||
    (arr.length === self.data.pageSize && num <= self.data.pageNum)
  ) {
    self.setData({
      hasMoreData: false,
      tableData: newArr
    });
  } else {
    self.setData({
      hasMoreData: true,
      pageNum: self.data.pageNum + 1,
      tableData: newArr
    });
  }
};

/***
 * @description: 处理列表一进页面就调取接口的数据 （在 onLoad 里面调用）
 * @param {self, fn}  self 是上下文 ， fn 就是调用数据的方法
 * @method: loadTable
 * @return:
 */
const loadTable = (self, fn, obj = {}) => {
  self.setData({
    tableData: [],
    searchText: null,
    pageNum: 1,
    ...obj
  });
  fn();
};

/***
 * @description: 搜索事件调用接口的方法
 * @param {self, evt, fn} self 是上下文 ， evt 为搜索事件返回的搜索框的内容 ， fn 就是调用数据的方法, bool 为当没有tab键时要调用滚动
 * @method: searchTable
 * @return:
 */
const searchTable = (self, evt, fn, bool = false) => {
  let text = evt.detail;
  self.setData({
    searchText: text,
    pageNum: 1
  });
  if (bool) {
    wx.pageScrollTo({
      scrollTop: 0
    });
  }
  fn();
};

/***
 * @description: 有tab键时的点击事件
 * @param {type}  self 是上下文 ， evt 为tab键点击事件返回的所在的索引的内容 ， fn 就是调用数据的方法, obj 在切换tab是需要重置的数据
 * @method：tabTable
 * @return:
 */
const tabTable = (self, evt, fn, obj = {}) => {
  let index = evt.detail;
  self.setData({
    pageNum: 1,
    searchText: null,
    activeIndex: index,
    tableData: [],
    ...obj
  });
  wx.pageScrollTo({
    scrollTop: 0
  });
  // 请求接口的方法
  fn();
};

/***
 * @description: 列表页面的下拉刷新
 * @param {self, fn} self 是上下文, fn 就是调用数据的方法,
 * @method: tablePagePullDown
 * @return:
 */
const tablePagePullDown = (self, fn) => {
  self.setData({
    pageNum: 1,
    tableData: [],
    searchText: null
  });
  fn();
};

/***
 * @description: 页面上拉加载的方法
 * @param {self, fn}  self 是上下文, fn 就是调用数据的方法,
 * @method: tableReachBottom
 * @return:
 */
const tablePageReachBottom = (self, fn) => {
  if (self.data.hasMoreData) {
    fn();
  } else {
    wx.showToast({
      title: '没有更多数据',
      icon: 'none'
    });
  }
};

/***
 * @description: 列表页面滚动是确定头部定位时机的方法
 * @param {self, num} self 是上下文, evt 为页面滚动时的事件会参， num 为固定定位触发的时机,
 * @method: tablePageScroll
 * @return:
 */
const tablePageScroll = (self, evt, num) => {
  if (evt.scrollTop > num) {
    self.setData({
      isFixed: true
    });
  } else {
    self.setData({
      isFixed: false
    });
  }
};

module.exports = {
  handleTableData,
  loadTable,
  searchTable,
  tabTable,
  tablePagePullDown,
  tablePageReachBottom,
  tablePageScroll
};

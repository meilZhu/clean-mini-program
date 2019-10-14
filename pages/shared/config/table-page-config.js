/***
 * @FileName: 台账页面相关数据的配置 tablePageConfig
 * @Author: manyao.zhu
 * @Date: 2019-10-12 10:45:13
 */

/**
 * 获取列表时的配置
 */
const tableSearchConfig = {
  // 调接口时，判断是否还有更多值
  hasMoreData: true,
  // 当前页码
  pageNum: 1,
  // 每页展示的条数
  pageSize: 5,
  // 列表数据
  tableData: [],
};

const headerConfig = {
  // 头部是否固定
  isFixed: false,
  // 头部的搜索条件
  searchText: null,
  // tab键目前所在的索引
  activeIndex: 0,
};

const tablePageConfig = {
  tableSearchConfig,
  headerConfig,
};

export default tablePageConfig;

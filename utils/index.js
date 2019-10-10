/***
 * @FileName:
 * @Author: manyao.zhu
 * @Date: 2019-09-27 11:45:18
 * @author: manyao.zhu
 */

import http from './fetch/http';
import util from './plugins/util';
import validator from './plugins/validator';
import fileSrv from './service/file-service';

const zmy = {
  http,
  util,
  validator,
  fileSrv
};

export default zmy;

/***
 * @FileName: 对上传图片（文件）和下载文件的封装
 * @Author: 朱满要
 * @Date: 2019-09-19 09:17:04
 * @file:
 * @author: manyao.zhu
 */

import CONFIG from '../fetch/config';

/**
 * @description:  上传图片的封装方法
 * @param {url}  上传图片的路径
 * @return:  返回的是上传的图片
 */
const uploadImage = (url = '') => {
  return new Promise((resolve, reject) => {
    // 这里封装请求方法，用于返回请求后的数据，用于处理后续操作
    function uploadRequestApi() {
      const app = getApp();
      wx.chooseImage({
        count: 4,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: result => {
          console.log('-------选择文件接口-------');
          console.log(result);
          let imgs = result.tempFilePaths;
          for (let i = 0; i < imgs.length; i++) {
            wx.uploadFile({
              url: `${CONFIG.BASE_API}${url}`,
              filePath: imgs[i],
              name: 'fileInput',
              header: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${app.globalData.accessToken}`
              },
              // 这里根据不同公司定义传递的内容而定
              formData: {
                fileInputName: 'fileInput'
              },
              success: res => {
                let data = JSON.parse(res.data);
                console.log('-------上传文件接口--------');
                console.log(data);
                if (data.status) {
                  resolve(data);
                } else {
                  resolve(data);
                  if (String(data.code) === '1002') {
                    wx.showToast({
                      title: '账号过期，正在重新登录。',
                      duration: 1000,
                      icon: 'none'
                    });
                    app.globalData.accessToken = null;
                    app.globalData.wxLogin().then(() => {
                      uploadRequestApi();
                    });
                    return;
                  }
                  wx.showToast({
                    title: res.data.messages,
                    duration: 2000,
                    icon: 'none'
                  });
                  console.log('出现错误了', res);
                }
              }
            });
          }
        }
      });
    }
    uploadRequestApi();
  });
};

/**
 * @description: 这里封装的是下载文件的方法
 * @param {url, type}  url: 下载的路径、 type 下载文件的格式
 * @return: 返回的是调取下载接口后的地址
 */
const downloadFile = (url = '', type = 'png') => {
  return new Promise((resolve, reject) => {
    function downloadRequestApi() {
      const app = getApp();
      wx.downloadFile({
        url: `${CONFIG.BASE_API}${url}`,
        header: {
          Authorization: `Bearer ${app.globalData.accessToken}`
        },
        fileType: type,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          }
        }
      });
    }
    downloadRequestApi();
  });
};

/**
 * @description: 保存图片到本地相册的方法
 * @param {param,type} param: 保存图片的路径， type:要保存的图片的格式
 * @return: 没有返回值，成功将数据保存到相册
 */

const saveImageToAlbum = (param = '', type = 'png') => {
  wx.saveImageToPhotosAlbum({
    filePath: param,
    flieType: type,
    success(result) {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000
      });
    },
    fail: function(result) {
      if (result.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
        console.log('用户一开始拒绝了，我们想再次发起授权');
        console.log('打开设置窗口');
        wx.openSetting({
          success(settingdata) {
            if (settingdata.authSetting['scope.writePhotosAlbum']) {
              console.log('获取权限成功，给出再次点击图片保存到相册的提示。');
            } else {
              console.log('获取权限失败，给出不给权限就无法正常使用的提示');
            }
          }
        });
      }
    }
  });
};

/***
 * @@description: 这里封装的是文件预览方法
 * @@param: {evt, path} evt: 这个是我们在元素中用data存储的数据（这里主要是文件名和文件Id）、 path: 预览图片的地址
 * @@method: preview
 * @@return:  无返回值，这里是对图片和文件的预览
 */
const preview = (evt, path = '') => {
  console.log('evt', evt.currentTarget.dataset);
  const { name, id } = evt.currentTarget.dataset;
  const suffixName = getSuffixName(name);

  if (!suffixName) {
    return;
  }

  if (previewImg(suffixName, id, path)) {
    return;
  }

  if (previewFile(suffixName, id, path)) {
    return;
  }
};

function getSuffixName(name) {
  const idx = name.lastIndexOf('.');
  const suffixName = name.substring(idx + 1, name.length); //后缀名
  if (
    suffixName === undefined ||
    suffixName === null ||
    suffixName.length <= 0
  ) {
    wx.showToast({
      title: '文件格式有误！'
    });
    return;
  }
  return suffixName.toLowerCase();
}

function previewImg(suffixName, id, path) {
  const imageSuffixArr = ['bmp', 'jpg', 'jpeg', 'png', 'gif'];
  let isImg = false;
  for (var i = 0; i < imageSuffixArr.length; i++) {
    if (suffixName == imageSuffixArr[i]) {
      isImg = true;
      doPreviewImg(path, id);
    }
  }
  return isImg;
}

function doPreviewImg(path, id) {
  wx.previewImage({
    urls: [`${CONFIG.BASE_API}${path}${id}`]
  });
}

function previewFile(suffixName, id, path) {
  const fileSufixArr = [
    'doc',
    'xls',
    'ppt',
    'pdf',
    'docx',
    'xlsx',
    'pptx',
    'txt'
  ];
  let isFile = false;
  for (var i = 0; i < fileSufixArr.length; i++) {
    if (suffixName == fileSufixArr[i]) {
      isFile = true;
      doPreviewFile(suffixName, id, path);
    }
  }
  return isFile;
}

function doPreviewFile(suffixName, id, path) {
  wx.downloadFile({
    url: `${CONFIG.BASE_API}${path}${id}`,
    fileType: suffixName,
    success: function(res) {
      var Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
      wx.openDocument({
        filePath: Path,
        fileType: suffixName,
        success: function(res) {
          console.log('打开成功');
        },
        fail: function(res) {
          console.log('打开失败', res);
          wx.saveFile({
            tempFilePath: Path,
            success: function(res) {
              console.log('打开失败存储路径', res);
              var savedFilePath = res.savedFilePath;
            }
          });
        }
      });
    },
    fail: function(res) {
      console.log('fail', res);
      wx.showToast({
        icon: 'none',
        title: '文件打开失败！'
      });
    }
  });
}

module.exports = {
  uploadImage,
  downloadFile,
  saveImageToAlbum,
  preview
};

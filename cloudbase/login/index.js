// 云函数入口文件
const cloud = require('wx-server-sdk');
const rp = require('request-promise');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const code = event.code;
  const appid = 'wx369e31cef12fa0e5';
  const screct = '3c16b79463c36ddf8e54512ecb01af53';
  let resp;
  const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + screct + '&js_code=' + code + '&grant_type=authorization_code';
  return await rp(url);
}
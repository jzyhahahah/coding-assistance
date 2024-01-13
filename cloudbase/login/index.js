// 云函数入口文件
const cloud = require('wx-server-sdk');
const rp = require('request-promise');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const code = event.code;
  const rawUserData = event.userRawData;
  const appid = 'wx369e31cef12fa0e5';
  const screct = '3c16b79463c36ddf8e54512ecb01af53';
  const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + screct + '&js_code=' + code + '&grant_type=authorization_code';
  const {
    session_key,
    openid
  } = JSON.parse(await rp(url));
  const userData = JSON.parse(rawUserData);
  console.log(userData);
  console.log(openid)
  const existUser = await db.collection('userInfo').where({
    _openid: openid,
  }).get({
    success: function (res) {
      console.log(res.data)
    }
  });
  if (existUser.data.length === 0) {
    //未注册用户，返回用户标识openid
    try {
      const upData = {
        _openid: openid,
        ...userData,
        state: "registered"
      };
      await db.collection("userInfo").add({
        data: upData
      }).then(res => {
        return {
          user: upData
        };
      })
    } catch {
      return {
        user: {
          openid,
          state: "noRegistered"
        }
      };
    }
  } else {
    //已注册用户返回用户信息
    return {
      user: {
        ...existUser.data[0],
        state: "registered"
      }
    }
  }
}
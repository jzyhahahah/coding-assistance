// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = event._openid;
  const existUser = await db.collection('userInfo').where({
    _openid: openid,
  }).get({
    success: function (res) {
      console.log(res.data)
    }
  });
  return {
    user: {
      ...existUser.data[0],
      state: "registered"
    }
  }
}
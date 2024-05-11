const cloud = require('wx-server-sdk');
const jwt = require('jsonwebtoken');

const secretKey = 'zstu_jzy_2020329621244';

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  const {
    username,
    password
  } = event;

  const user = await db.collection('userInfo').where({
    username,
    password
  }).get();
  if (user.data) {
    return {
      code: 200,
      msg: "ok",
      data: jwt.sign({
        data: user.data.openid
      }, secretKey, {
        expiresIn: '24h'
      })
    }
  }
  return {
    code: 404,
    msg: "Wrong User",
    data: null
  }
}
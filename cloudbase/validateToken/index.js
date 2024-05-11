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
  // }\
  const {
    token
  } = event;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return {
        code: 500,
        msg: "validate token error"
      }
    } else {
      return {
        code: 200,
        msg: "ok",
        data: decoded
      }
    }
  });
}
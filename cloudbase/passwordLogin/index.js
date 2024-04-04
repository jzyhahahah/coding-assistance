// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    username,
    password
  } = event;
  const res = await db
    .collection('userInfo')
    .where({
      username,
      password
    })
    .get();
  if (res.data.length === 0) {
    return {
      code: 404,
      message: '用户名或密码错误'
    };
  }
  const isAdmin = await cloud.callFunction({
    name: 'validatePrivilege',
    data: {
      openid: res.data[0]._openid,
      expect: 2
    }
  });
  if (isAdmin.result.code !== 0) {
    return {
      code: 403,
      message: '权限不足'
    };
  }
  return {
    code: 200,
    message: '登录成功',
    data: {
      token: res.data[0]._openid
    }
  };
};
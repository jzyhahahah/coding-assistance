const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const { username } = event;
  //  更新用户信息，如果用户名已存在则返回错误
  const user = await db
    .collection('userInfo')
    .where({
      username: username
    })
    .get();
  if (user.data.length > 0) {
    return {
      code: 1,
      message: '用户名已存在'
    };
  }
  await db
    .collection('userInfo')
    .where({
      _openid: OPENID
    })
    .update({
      data: {
        username: username
      }
    });
  return {
    code: 0,
    message: '更新成功'
  };
};

// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 将题目添加到试卷中
exports.main = async (event, context) => {
  const { id, privilege, openid } = event;

  const isAdmin = await cloud.callFunction({
    name: 'validatePrivilege',
    data: {
      openid,
      expect: 1
    }
  });
  if (isAdmin.result.code !== 0) {
    return {
      code: 1,
      message: '权限不足'
    };
  }
  return await db
    .collection('userInfo')
    .doc(id)
    .update({
      data: {
        isAdmin: privilege
      }
    });
};

// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const { openid, expect } = event;
  const db = cloud.database();
  //  获取用户信息
  const user = await db
    .collection('userInfo')
    .where({
      _openid: openid
    })
    .get();
  if (user.data.length === 0) {
    return {
      code: 1,
      message: '用户不存在'
    };
  }
  if (user.data[0].isAdmin !== expect) {
    return {
      code: 1,
      message: '权限不足'
    };
  }
  return {
    code: 0,
    message: '权限验证成功'
  };
};

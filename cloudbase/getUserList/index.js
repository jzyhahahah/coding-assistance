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
  const { openid, username, current = 1, pageSize = 10, role } = event;
  const requester = await db
    .collection('userInfo')
    .where({
      _openid: openid
    })
    .get();
  if (requester.data.length === 0 || requester.data[0].isAdmin !== 1) {
    return {
      code: 403,
      message: '无权限'
    };
  }
  const res = await db
    .collection('userInfo')
    .aggregate()
    .match({
      username: username
        ? db.RegExp({
            regexp: username,
            options: 'i'
          })
        : undefined,
      isAdmin: Array.isArray(role) && role.length > 0 ? _.in(role) : _.exists(true)
    })
    .skip((current - 1) * pageSize)
    .limit(pageSize)
    .project({
      password: 0,
    })
    .end();

  let total;
  if (username) {
    total = await db
      .collection('userInfo')
      .where({
        username: db.RegExp({
          regexp: username,
          options: 'i'
        }),
        isAdmin: Array.isArray(role) && role.length > 0 ? _.in(role) : _.exists(true)
      })
      .count();
  } else {
    total = await db
      .collection('userInfo')
      .where({
        isAdmin: Array.isArray(role) && role.length > 0 ? _.in(role) : _.exists(true)
      })
      .count();
  }

  return {
    code: 200,
    message: '获取成功',
    data: {
      list: res.list,
      total: total.total
    }
  };
};

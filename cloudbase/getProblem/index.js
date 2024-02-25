const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, problemId, problemStatement, current, pageSize } = event;
  const skip = (current - 1) * pageSize;
  const limit = pageSize;
  const match = {
    type: type?.indexOf('all') !== -1 ? undefined : _.in(type),
    problemId: problemId ?? undefined,
    problemStatement: problemStatement
      ? db.RegExp({
          regexp: problemStatement,
          options: 'i'
        })
      : undefined
  };
  const total = await db.collection('problem').aggregate().match(match).count('total').end();
  const res = await db.collection('problem').aggregate().match(match).skip(skip).limit(limit).end();
  return { ...res, total: total?.list?.[0]?.total || 0 };
};

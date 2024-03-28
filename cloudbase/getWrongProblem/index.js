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
  const { data } = await db
    .collection('wrongAnswer')
    .where({
      userId: OPENID
    })
    .get();
  const wrongAnswer = data?.[0];
  const wrongProblemIds = wrongAnswer?.wrongAnswerProblemId || [];
  const { data: problems } = await db
    .collection('problem')
    .where({
      _id: _.in(wrongProblemIds)
    })
    .get();

  return problems;
};

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
  const { OPENID } = cloud.getWXContext();
  const { problemStatement, type } = event;

  const EQ = [$.in(['$_id', '$$likeProblems'])];
  if (type) {
    EQ.push($.in(['$type', type]));
  }
  const inAndEq = $.and(EQ);

  return await db
    .collection('like')
    .aggregate()
    .match({ userId: OPENID })
    .lookup({
      from: 'problem',
      let: {
        likeProblems: '$likeProblems'
      },
      pipeline: $.pipeline()
        .match(_.expr(inAndEq))
        .done(),
      as: 'likeProblems'
    })
    .match({
      'likeProblems.problemStatement': problemStatement
        ? db.RegExp({
            regexp: problemStatement,
            options: 'i'
          })
        : _.neq(null)
    })
    .project({
      likeProblems: 1
    })
    .end();
};

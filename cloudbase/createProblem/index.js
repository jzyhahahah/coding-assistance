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
    answer,
    option,
    problemStatement,
    solution,
    type,
  } = event;

  return await db
    .collection("problem")
    .add({
      data: {
        problemStatement,
        solution,
        option,
        answer,
        type,
        createAt: new Date().getTime(),
        answerNum: Array.isArray(answer) ? answer.length : 1
      }
    })
}
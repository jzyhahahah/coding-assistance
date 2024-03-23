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
  const { reportId } = event;
  const {
    data: { userAnswerSheet, paperId, ...data }
  } = await db.collection('userAnswerSheet').doc(reportId).get();
  const accRate =
    userAnswerSheet.filter((item) => item.isCorrect === 1).length / userAnswerSheet.length;
  const {
    data: { problems, totalScore, name }
  } = await db
    .collection('paper')
    .doc(paperId)
    .field({
      problems: true,
      totalScore: true,
      name: true
    })
    .get();
  const problemSeqMap = {};
  problems?.forEach((item) => {
    problemSeqMap[item.pid] = item?.seq;
  });
  return {
    ...data,
    paperId,
    paperName: name,
    userAnswerSheet: userAnswerSheet.map((item) => ({
      ...item,
      seq: problemSeqMap[item.problemId]
    })),
    accRate,
    totalScore
  };
};

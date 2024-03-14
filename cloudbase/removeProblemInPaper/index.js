const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
exports.main = async (event, context) => {
  // 删除试卷中的题目
  const {
    paperId,
    problemId
  } = event;
  const paper = await db.collection('paper').doc(paperId).get();
  const problems = paper.data.problems || [];
  const newProblems = problems.filter(p => p.pid !== problemId);
  return await db.collection('paper').doc(paperId).update({
    data: {
      problems: newProblems
    }
  });
}
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  const { paperId, problemId, mark } = event;

  // 1. 更新试卷的分数
  const paper = await db.collection('paper').doc(paperId).get();
  const paperData = paper.data;
  const problems = paperData.problems;
  let totalScore = 0;
  for (let i = 0; i < problems.length; i++) {
    if (problems[i].pid === problemId) {
      problems[i].mark = mark;
    }
    totalScore += problems[i].mark;
  }
  return await db.collection('paper').doc(paperId).update({
    data: {
      totalScore,
      problems
    }
  });
};

//0601950565f19375022337d6575514a6
//538e32fb65d98fa000a64495224069d5
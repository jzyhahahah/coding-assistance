const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 将题目添加到试卷中
exports.main = async (event, context) => {
  const { paperId, problemId } = event;
  const paper = await db.collection('paper').doc(paperId).get();
  if (paper.data.problems.some((p) => p.pid === problemId)) {
    return {
      code: 1,
      message: '题目已存在'
    };
  }
  const problems = paper.data.problems || [];
  let maxSeq = 0;
  problems.forEach((p) => {
    if (p.seq > maxSeq) {
      maxSeq = p.seq;
    }
  });
  return await db
    .collection('paper')
    .doc(paperId)
    .update({
      data: {
        problems: _.push([
          {
            pid: problemId,
            mark: 0,
            seq: maxSeq + 1
          }
        ])
      }
    });
};

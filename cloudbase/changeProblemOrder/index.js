const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 传入problemId的数组，按照数组的顺序更新数据库中的问题顺序, 修改sequence字段
  const { problemIds, paperId } = event;
  const paper = await db
    .collection('paper')
    .where({
      _id: paperId
    })
    .get();
  const problemList = paper.data[0].problems;
  const newProblemList = problemList?.map((item) => {
    if (problemIds.includes(item.pid)) {
      item.seq = problemIds.indexOf(item.pid);
    }
    return item;
  });
  return await db
    .collection('paper')
    .doc(paperId)
    .update({
      data: {
        problems: newProblemList
      }
    });
};

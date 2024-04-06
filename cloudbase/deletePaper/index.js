const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  const { paperId } = event;
  //查询
  const { list } = await db
    .collection('paper')
    .aggregate()
    .match({ _id: paperId })
    .lookup({
      from: 'courseFragment',
      localField: '_id',
      foreignField: 'paperId',
      as: 'refered'
    })
    .project({
      refered: 1
    })
    .end();
  const { refered } = list[0];
  if (refered.length > 0) {
    return {
      code: 403,
      message: '该试卷已被引用，无法删除'
    };
  }
  await db.collection('paper').doc(paperId).remove();
  return {
    code: 200,
    message: '删除成功'
  };
};

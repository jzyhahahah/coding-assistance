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
  const { paperId, fragmentId, title } = event;
  const updateData = {};
  if (paperId) {
    updateData.paperId = paperId;
  }
  if (title) {
    updateData.fragmentTitle = title;
  }
  return await db
    .collection('courseFragment')
    .doc(fragmentId)
    .update({
      data: updateData
    });
};

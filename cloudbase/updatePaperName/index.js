const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
exports.main = async (event, context) => {
  // updatePaperName
  const {
    paperId,
    paperName
  } = event;
  return await db.collection('paper').doc(paperId).update({
    data: {
      name: paperName
    }
  });
};
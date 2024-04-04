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
  const { videoId, fragmentId } = event;
  // 更新时，将原来的video删除
  const {
    data: { videoUrl: oldVideoId }
  } = await db.collection('courseFragment').doc(fragmentId).field({ videoUrl: true }).get();
  await cloud.deleteFile({
    fileList: [oldVideoId]
  });
  return await db
    .collection('courseFragment')
    .doc(fragmentId)
    .update({
      data: {
        videoUrl: videoId
      }
    });
};

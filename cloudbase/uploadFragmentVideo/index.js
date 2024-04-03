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
  const { video, courseId, fragmentId } = event;
  await cloud.uploadFile({
    cloudPath: `course-fragment-videos/${courseId}/${fragmentId}.mp4`,
    fileContent: video
  });
  // 删除原有的视频
};

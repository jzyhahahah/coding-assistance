const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  const { courseId } = event;

  const { data: VideoInCourseData } = await db
    .collection('courseFragment')
    .where({
      courseId,
      type: 'video'
    })
    .get();

  const videoIds = VideoInCourseData.map((item) => item.videoUrl).filter((item) => item);
  if (videoIds.length > 0) {
    await cloud.deleteFile({
      fileList: videoIds
    });
  }
  await db
    .collection('courseFragment')
    .where({
      courseId
    })
    .remove();
  await db.collection('course').doc(courseId).remove();
  return {
    code: 200,
    msg: '删除成功',
    data: {}
  };
};

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
  const { title, type, courseId } = event;
  const {
    data: { fragments }
  } = await db.collection('course').doc(courseId).field({ fragments: true }).get();
  let nextSeq = 0;
  fragments.forEach((fragment) => {
    if (fragment.seq > nextSeq) {
      nextSeq = fragment.seq;
    }
  });
  const res = await db.collection('courseFragment').add({
    data: {
      fragmentTitle: title,
      type,
      courseId,
      paperId: type === 'paper' ? '' : null,
      videoUrl: type === 'video' ? '' : null
    }
  });
  const newId = res._id;
  return await db
    .collection('course')
    .doc(courseId)
    .update({
      data: {
        fragments: _.push({
          fragmentId: newId,
          seq: nextSeq + 1
        })
      }
    });
};

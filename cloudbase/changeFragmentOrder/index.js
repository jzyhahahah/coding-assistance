const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const { fragmentIds, courseId } = event;
  const {
    data: { fragments }
  } = await db.collection('course').doc(courseId).field({ fragments: true }).get();
  const newFragmentList = fragments.map((fragment) => {
    const seq = fragmentIds.indexOf(fragment.fragmentId);
    return {
      ...fragment,
      seq
    };
  });
  return await db
    .collection('course')
    .doc(courseId)
    .update({
      data: {
        fragments: newFragmentList
      }
    });
};

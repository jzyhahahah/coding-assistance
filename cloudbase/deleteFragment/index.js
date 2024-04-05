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
  const { fragmentId, courseId } = event;
  const {
    data: { videoUrl: oldVideoId, type }
  } = await db
    .collection('courseFragment')
    .doc(fragmentId)
    .field({
      videoUrl: true,
      type: true
    })
    .get();
  if (type === 'video' && oldVideoId) {
    await cloud.deleteFile({
      fileList: [oldVideoId]
    });
  }
  await db.collection('courseFragment').doc(fragmentId).remove();
  const {
    data: { fragments }
  } = await db.collection('course').doc(courseId).field({ fragments: true }).get();
  const newFragmentList = fragments.filter((fragment) => fragment.fragmentId !== fragmentId);
  return await db
    .collection('course')
    .doc(courseId)
    .update({
      data: {
        fragments: newFragmentList
      }
    });

  // return db
  //   .collection('course')
  //   .aggregate()
  //   .match({ _id: courseId })
  //   .project({
  //     fragments: $.filter({
  //       input: '$fragments',
  //       as: 'fragment',
  //       cond: $.neq(['$$fragment.fragmentId', fragmentId])
  //     })
  //   });
};

// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const userId = wxContext.OPENID;
  const courseId = event.courseId;
  const hasChoosed = await db
    .collection('courseProgress')
    .where({
      userId,
      courseId
    })
    .get();
  if (hasChoosed.data.length !== 0) {
    return db
      .collection('courseProgress')
      .where({
        userId,
        courseId
      })
      .update({
        progress: 0
      });
  } else {
    await db.collection('course').update({
      students: _.addToSet(userId)
    });
    return db.collection('courseProgress').add({
      data: {
        userId,
        courseId,
        progress: 0
      }
    });
  }
};

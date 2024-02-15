const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const courseId = event.courseId;
  const wxContext = cloud.getWXContext();

  //可以先在courseProgress查询有没有选择这门课
  const courseIsInProgress = await db
    .collection('courseProgress')
    .where({
      courseId,
      userId: wxContext.OPENID
    })
    .get();
  //console.log(courseIsInProgress.data.length);
  if (courseIsInProgress.data.length === 0) {
    return {
      list: [],
      errMsg: 'NoChoosed'
    };
  }

  return await db
    .collection('courseFragment')
    .aggregate()
    .match({
      courseId
    })
    .addFields({
      fragmentId: '$_id'
    })
    .project({
      _id: 0
    })
    .end();
};

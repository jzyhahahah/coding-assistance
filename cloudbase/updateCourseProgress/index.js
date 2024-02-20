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
  const wxContext = cloud.getWXContext();
  const userId = wxContext.OPENID;
  const courseId = event.courseId;
  const fragmentId = event.fragmentId;
  try {
    const numOfFragementInCourse = await db
      .collection('courseFragment')
      .where({
        courseId
      })
      .count();

    //console.log(numOfFragementInCourse.total);
    await db
      .collection('courseProgress')
      .where({
        userId,
        courseId
      })
      .update({
        data: {
          learnedFragments: _.addToSet(fragmentId)
        }
      });
    const res = await db
      .collection('courseProgress')
      .aggregate()
      .match({
        userId,
        courseId
      })
      .project({
        progress: $.divide([$.size('$learnedFragments'), numOfFragementInCourse.total])
      })
      .end();
    const newProgress = res.list[0].progress;
    return db
      .collection('courseProgress')
      .where({
        userId,
        courseId
      })
      .update({
        data: {
          progress: newProgress
        }
      });
  } catch (e) {
    console.error(e);
  }
};

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const { courseName } = event;

  return await db
    .collection('userAnswerSheet')
    .aggregate()
    .match({ userId: OPENID })
    .lookup({
      from: 'course',
      localField: 'courseId',
      foreignField: '_id',
      as: 'course'
    })
    .lookup({
      from: 'courseFragment',
      localField: 'fragmentId',
      foreignField: '_id',
      as: 'fragments'
    })
    .lookup({
      from: 'paper',
      localField: 'paperId',
      foreignField: '_id',
      as: 'paper'
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$course', 0]), '$$ROOT'])
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$fragments', 0]), '$$ROOT'])
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$paper', 0]), '$$ROOT'])
    })
    .project({
      course: 0,
      fragments: 0,
      paper: 0,
      seq: 0,
      students: 0,
      tags: 0,
      teachers: 0,
      type: 0,
      userAnswerSheet: 0,
      videoUrl: 0,
      createAt: 0,
      problems: 0
    })
    .match({
      courseName: courseName
        ? db.RegExp({
            regexp: courseName,
            //从搜索栏中获取的value作为规则进行匹配。
            options: 'i'
            //大小写不区分
          })
        : undefined
    })
    .end();
};

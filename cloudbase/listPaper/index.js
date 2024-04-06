const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  //listPaper云函数
  const {
    paperId, //查询参数
    name, //查询参数
    current, //当前页
    pageSize //每页条数
  } = event;

  //查询条件
  let condition = {};
  if (paperId) {
    condition._id = paperId;
  }
  if (name) {
    condition.name = db.RegExp({
      regexp: name,
      options: 'i'
    });
  }

  //查询
  const { list } = await db
    .collection('paper')
    .aggregate()
    .match(condition)
    .lookup({
      from: 'courseFragment',
      localField: '_id',
      foreignField: 'paperId',
      as: 'refered'
    })
    .lookup({
      from: 'course',
      localField: 'refered.courseId',
      foreignField: '_id',
      as: 'course'
    })
    .project({
      'course.fragments': 0,
      'course.teachers': 0,
      'course.students': 0,
      'course.tags': 0
    })
    .skip((current - 1) * pageSize)
    .limit(pageSize)
    .end();

  const { total } = await db.collection('paper').where(condition).count();
  return {
    errMsg: 'OK',
    list,
    total
  };
};

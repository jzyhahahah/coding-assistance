const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, teacherId, courseId } = event;
  if (type === 1) {
    // 添加
    const res = await db
      .collection('course')
      .where({
        _id: courseId
      })
      .update({
        data: {
          teachers: _.addToSet(teacherId)
        }
      });
    return {
      code: 200,
      data: res
    };
  } else if (type === 0) {
    // 删除
    const res = await db
      .collection('course')
      .where({
        _id: courseId
      })
      .update({
        data: {
          teachers: _.pull(teacherId)
        }
      });
    return {
      code: 200,
      data: res
    };
  }
};

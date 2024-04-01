// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 将题目添加到试卷中
exports.main = async (event, context) => {
  const { courseName, tags } = event;
  const { OPENID } = cloud.getWXContext();
  const course = await db.collection('course').add({
    data: {
      courseName,
      tags,
      teachers: []
    }
  });
  return course;
};

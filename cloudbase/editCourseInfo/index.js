// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
exports.main = async (event, context) => {
  const { courseName, tags, openid, courseId } = event;
  const isAdmin = await cloud.callFunction({
    name: 'validatePrivilege',
    data: {
      openid,
      expect: 1
    }
  });
  if (isAdmin.result.code !== 0) {
    return {
      code: 1,
      message: '权限不足'
    };
  }
  const course = await db.collection('course').doc(courseId).update({
    data: {
      courseName,
      tags
    }
  });
  return course;
};

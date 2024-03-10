const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const { name = '未命名', problems, totalScore = 0 } = event;

  return await db.collection('paper').add({
    data: {
      name,
      problems: problems?.map((problem) => {
        return {
          pid: problem,
          mark: 0
        };
      }),
      totalScore,
      createAt: new Date().getTime()
    }
  });
};

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const { courseId, paperId, username, current = 1, pageSize = 10 } = event;

  let userId;
  if (username) {
    const res = await db
      .collection('userInfo')
      .where({
        username
      })
      .field({
        _openid: true
      })
      .get();

    userId = res.data[0]._openid;
  }
  if (!courseId || !paperId) {
    return {
      errMsg: 'noSelect',
      list: []
    };
  }
  const { list } = await db
    .collection('userAnswerSheet')
    .aggregate()
    .match({
      userId,
      courseId,
      paperId
    })
    .project({ userAnswerSheet: 0 })
    .lookup({
      from: 'userInfo',
      localField: 'userId',
      foreignField: '_openid',
      as: 'user'
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$user', 0]), '$$ROOT'])
    })
    .project({
      userGetScore: 1,
      userId: 1,
      username: 1,
      _id: 1,
      courseId: 1,
      fragmentId: 1,
      nickName: 1,
      paperId: 1,
      spendTime: 1
    })
    .skip((current - 1) * pageSize)
    .limit(pageSize)
    .end();
  const { total } = await db
    .collection('userAnswerSheet')
    .where({
      userId,
      courseId,
      paperId
    })
    .count();
  return {
    errMsg: 'ok',
    list,
    total
  };
};

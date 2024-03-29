const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  // mode: 'noAnswer' | 'withAnswer'
  const { paperId, mode = 'withAnswer' } = event;
  const getProjection = (mode) => {
    if (mode === 'noAnswer') {
      return {
        problems: 0,
        'problemList.problem.answer': 0,
        'problemList.problem.solution': 0
      };
    } else {
      return {
        problems: 0,
      };
    }
  };
  return await db
    .collection('paper')
    .aggregate()
    .match({
      _id: paperId
    })
    .lookup({
      from: 'problem',
      localField: 'problems.pid',
      foreignField: '_id',
      as: 'problemList'
    })
    .addFields({
      problemList: $.map({
        input: '$problems',
        as: 'p',
        in: {
          problem: $.arrayElemAt([
            $.filter({
              input: '$problemList',
              as: 'pl',
              cond: $.eq(['$$pl._id', '$$p.pid'])
            }),
            0
          ]),
          mark: '$$p.mark',
          seq: '$$p.seq'
        }
      })
    })
    .project(getProjection(mode))
    .end();
};

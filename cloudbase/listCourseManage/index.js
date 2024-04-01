const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    openid,
    name
  } = event;

  const isOk = await cloud.callFunction({
    name: 'validatePrivilege',
    data: {
      openid,
      expect: 2
    }
  });
  if (isOk.result.code !== 0) {
    return {
      code: 1,
      message: '权限不足'
    };
  }
  const privilege = isOk.result.privilege;
  if (privilege === 2) {
    return await db
      .collection('course')
      .aggregate()
      .match({
        courseName: name ?
          db.RegExp({
            regexp: name,
            //从搜索栏中获取的value作为规则进行匹配。
            options: 'i'
            //大小写不区分
          }) : undefined,
        teachers: _.elemMatch(_.eq(openid))
      })
      .lookup({
        from: 'userInfo',
        localField: 'teachers',
        foreignField: '_openid',
        as: 'courseTeachers'
      })
      .project({
        teachers: 0,
        'courseTeachers.password': 0,
        'courseTeachers._openid': 0
      })
      .end();
  }
  const res = await db
    .collection('course')
    .aggregate()
    .match({
      courseName: name ?
        db.RegExp({
          regexp: name,
          //从搜索栏中获取的value作为规则进行匹配。
          options: 'i'
          //大小写不区分
        }) : undefined
    })
    .lookup({
      from: 'userInfo',
      localField: 'teachers',
      foreignField: '_openid',
      as: 'courseTeachers'
    })
    .project({
      teachers: 0,
      'courseTeachers.password': 0,
      'courseTeachers._openid': 0
    })
    .end();
  return {
    code: 200,
    data: res
  };
};
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { _openid, coding, gender, nickName, province, city, avatarUrl, oldAvaUrl } = event;
  let avatarID;
  try {
    const res = await cloud.deleteFile({
      fileList: [oldAvaUrl]
    });
    console.log(res);
    const uploadResult = await cloud.uploadFile({
      cloudPath: `avatar/${_openid}/${new Date().getTime()}.png`,
      fileContent: Buffer.from(avatarUrl, 'base64')
    });
    avatarID = uploadResult.fileID;
  } catch (e) {
    //throw e;
  }
  return await db
    .collection('userInfo')
    .where({
      _openid: _openid
    })
    .update({
      data: {
        coding,
        gender,
        nickName,
        province,
        city: city ?? '',
        avatarUrl: avatarID
      }
    });
};

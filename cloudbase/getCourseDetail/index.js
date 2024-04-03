// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
exports.main = async (event, context) => {
  const { courseId } = event;

  const fragments = await db
    .collection('courseFragment')
    .aggregate()
    .match({
      courseId
    })
    .sort({
      seq: 1
    })
    .project({
      courseId: 0
    })
    .end();
  const videoIds = fragments.list.map((fragment) => fragment.videoUrl).filter(Boolean);
  const fileList = (
    await cloud.getTempFileURL({
      fileList: videoIds
    })
  ).fileList.map((file) => ({
    fileID: file.fileID,
    tempFileURL: file.tempFileURL
  }));
  console.log(fileList);

  const courseInfo = await db
    .collection('course')
    .aggregate()
    .match({ _id: courseId })
    .lookup({
      from: 'userInfo',
      localField: 'teachers',
      foreignField: '_openid',
      as: 'teachers'
    })
    .lookup({
      from: 'userInfo',
      localField: 'students',
      foreignField: '_openid',
      as: 'students'
    })
    .end();
  return {
    ...courseInfo.list[0],
    fragments: fragments.list.map((fragment) => {
      const video = fileList.find((file) => file.fileID === fragment.videoUrl);
      return {
        ...fragment,
        video
      };
    })
  };
};

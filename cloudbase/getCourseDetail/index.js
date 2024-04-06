// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
exports.main = async (event, context) => {
  const {
    courseId
  } = event;

  const courseInfo = await db
    .collection('course')
    .aggregate()
    .match({
      _id: courseId
    })
    .lookup({
      from: 'courseFragment',
      localField: 'fragments.fragmentId',
      foreignField: '_id',
      as: 'fragmentList'
    })
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
  const fragments = courseInfo.list[0].fragments;
  const fragmentList = courseInfo.list[0].fragmentList;
  const newFragmentList = fragmentList?.map((fragment) => {
    const {
      seq
    } = fragments.find((f) => f.fragmentId === fragment._id);
    return {
      ...fragment,
      seq
    };
  });
  const videoIds = newFragmentList?.map((fragment) => fragment.videoUrl).filter(Boolean);
  let fileList = [];
  if (videoIds.length > 0) {
    fileList = (
      await cloud.getTempFileURL({
        fileList: videoIds
      })
    ).fileList.map((file) => ({
      fileID: file.fileID,
      tempFileURL: file.tempFileURL
    }));
  }

  return {
    ...courseInfo.list[0],
    fragmentList: undefined,
    fragments: newFragmentList?.map((fragment) => {
      const video = fileList.find((file) => file?.fileID === fragment?.videoUrl);
      return {
        ...fragment,
        video
      };
    })
  };
};
// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    fileName,
    courseId,
    access_token
  } = event;
  const path = `course-fragment-videos/${courseId}/${fileName}`
  const requestUrl = `https://api.weixin.qq.com/tcb/uploadfile?access_token=${access_token}`;
  const result = await rp({
    url: requestUrl,
    method: "POST",
    json: true,
    body: {
      env: "cloud1-7gr4qibk4a519753",
      path: path
    }
  })
  return result;
}
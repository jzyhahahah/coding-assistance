// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();
var $ = cloud.database().command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    // const withProgress = event.withProgress;
    // if (!withProgress) {
    //     return await db.collection("course").get();
    // } else {
    //     return await db.collection("course").aggregate().
    //     lookup({
    //         from: "courseProgress",
    //         localField: "_id",
    //         foreignField: "courseId",
    //         as: 'userProgress'
    //     }).match({
    //         userProgress: {
    //             userId: event.userInfo.openId
    //         }
    //     }).end()
    // }
    return await db.collection("course").get();
}
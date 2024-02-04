// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();
var $ = db.command.aggregate


// 云函数入口函数
exports.main = async (event, context) => {
    const openId = cloud.getWXContext().OPENID;
    return await db.collection("courseProgress").aggregate()
        .match({
            userId: openId
        })
        .lookup({
            from: "course",
            localField: "courseId",
            foreignField: "_id",
            as: 'myCourse'
        })
        .replaceRoot({
            newRoot: $.mergeObjects([$.arrayElemAt(['$myCourse', 0]), '$$ROOT'])
        })
        .project({
            myCourse: 0
        })
        .end()
}
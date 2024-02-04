// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();
var $ = cloud.database().command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    const courseName = event?.courseName;
    const result = await db.collection("course").aggregate()
        .match({
            courseName: courseName ? db.RegExp({
                regexp: courseName,
                //从搜索栏中获取的value作为规则进行匹配。
                options: 'i',
                //大小写不区分
            }) : undefined,
        })
        .addFields({
            courseId: '$_id'
        })
        .project({
            _id: 0
        }).end();
    return result
}
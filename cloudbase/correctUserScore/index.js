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
        recordId,
        problemId,
        newScore,
        newStatus
    } = event;

    const {
        data: {
            userAnswerSheet
        }
    } = (await db.collection('userAnswerSheet').doc(recordId).field({
        userAnswerSheet: true
    }).get());
    //console.log(userAnswerSheet)
    userAnswerSheet.forEach(item => {
        if (item.problemId === problemId) {
            item['userScore'] = newScore;
            item['isCorrect'] = newStatus;
        }
    })

    return await db.collection('userAnswerSheet').doc(recordId).update({
        data: {
            userAnswerSheet
        }
    });

}
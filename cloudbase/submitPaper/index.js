const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const { paperId, userAnswer, spendTime, fragmentId, courseId } = event;
  const standardAnswers = await cloud.callFunction({
    name: 'getPaper',
    data: {
      paperId,
      mode: 'withAnswer'
    }
  });
  const paper = standardAnswers?.result?.list?.[0];

  //判断数组内的元素是否相同
  const isSame = (myAnswerArr, standardAnswerArr) => {
    if ((Array.isArray(myAnswerArr) && myAnswerArr.length === 0) || !Array.isArray(myAnswerArr)) {
      return false;
    }
    if (myAnswerArr.length > standardAnswerArr.length) {
      return false;
    } else if (myAnswerArr.length < standardAnswerArr.length) {
      if (myAnswerArr.every((item) => standardAnswerArr.includes(item))) {
        return 0.5;
      }
      return false;
    }
    return myAnswerArr.every((item) => standardAnswerArr.includes(item));
  };

  const problems = paper?.problemList;
  const userAnswerMap = {};
  const userAnswerGetScoreMap = {};
  const userAnswerSituationsMap = {};
  userAnswer?.forEach((answer) => {
    userAnswerMap[answer.problemId] = answer?.answer || undefined;
  });
  const score = problems?.reduce((acc, problemItem) => {
    const userAnswer = userAnswerMap[problemItem.problem._id];
    const standardAnswer = problemItem.problem.answer;
    const problemType = problemItem.problem.type;
    if (problemType === 'singleChoice' || problemType === 'multipleChoice') {
      const same = isSame(userAnswer, standardAnswer);
      if (same === true) {
        userAnswerGetScoreMap[problemItem.problem._id] = problemItem.mark;
        userAnswerSituationsMap[problemItem.problem._id] = 1;
        return acc + problemItem.mark;
      } else if (same === 0.5) {
        userAnswerGetScoreMap[problemItem.problem._id] = problemItem.mark / 2;
        userAnswerSituationsMap[problemItem.problem._id] = 0;
        return acc + problemItem.mark / 2;
      } else {
        userAnswerGetScoreMap[problemItem.problem._id] = 0;
        if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
          userAnswerSituationsMap[problemItem.problem._id] = -1;
        } else {
          userAnswerSituationsMap[problemItem.problem._id] = 0;
        }
        return acc;
      }
    }
    if (problemType === 'TrueOrFalse' || problemType === 'shortAnswer') {
      if (userAnswer === standardAnswer) {
        userAnswerGetScoreMap[problemItem.problem._id] = problemItem.mark;
        userAnswerSituationsMap[problemItem.problem._id] = 1;
        return acc + problemItem.mark;
      } else {
        userAnswerGetScoreMap[problemItem.problem._id] = 0;
        if (!userAnswer || userAnswer === '') {
          userAnswerSituationsMap[problemItem.problem._id] = -1;
        } else {
          userAnswerSituationsMap[problemItem.problem._id] = 0;
        }
        return acc;
      }
    }
    if (problemType === 'fillInBlank') {
      if (
        !userAnswer ||
        (Array.isArray(userAnswer) &&
          (userAnswer.length === 0 || userAnswer.every((item) => item === '')))
      ) {
        userAnswerGetScoreMap[problemItem.problem._id] = 0;
        userAnswerSituationsMap[problemItem.problem._id] = -1;
        return acc;
      }
      const itemScore = problemItem.mark / standardAnswer?.length;
      let temp = 0;
      let isCorrect = true;
      standardAnswer?.forEach((item, index) => {
        if (item === userAnswer?.[index]) {
          temp += itemScore;
        } else {
          isCorrect = false;
        }
      });
      if (isCorrect) {
        userAnswerSituationsMap[problemItem.problem._id] = 1;
      } else {
        userAnswerSituationsMap[problemItem.problem._id] = 0;
      }
      userAnswerGetScoreMap[problemItem.problem._id] = temp;
      return acc + temp;
    }
    userAnswerGetScoreMap[problemItem.problem._id] = 0;
    return acc;
  }, 0);

  const userAnswerSheet = problems.map((problemItem, index) => {
    return {
      problemId: problemItem.problem._id,
      userAnswer: userAnswerMap[problemItem.problem._id],
      userScore: userAnswerGetScoreMap[problemItem.problem._id],
      isCorrect: userAnswerSituationsMap[problemItem.problem._id]
    };
  });

  return await db.collection('userAnswerSheet').add({
    data: {
      paperId,
      userId: OPENID,
      userGetScore: score,
      spendTime,
      userAnswerSheet,
      fragmentId,
      courseId
    }
  });
};

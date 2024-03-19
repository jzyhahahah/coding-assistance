const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

/**
 * 
 *   "userAnswer": [
    {
      "problemId": "63ca5b1365ed8569019ef0bc2c6456bf",
      "answer": [
        "A",
        "B",
        "C"
      ]
    },
    {
      "problemId": "538e32fb65d99baa00a6689d17ea1d8a",
      "answer": "gfdsgdfgdfg"
    },
    {
      "problemId": "4972958165d991c500001e8d27ffbc92",
      "answer": true
    },
    {
      "problemId": "538e32fb65d98fa000a64495224069d5",
      "answer":  ["B"]
    },
    {
      "problemId": "1ef1307f65d9987600621f2e4bcc1f4d",
      "answer": ["123", "456", "789"]
    }
  ]
 * 
 */

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const { paperId, userAnswer, spendTime } = event;
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
  console.log('problems', problems);
  const userAnswerMap = {};
  const userAnswerGetScoreMap = {};
  userAnswer.forEach((answer) => {
    userAnswerMap[answer.problemId] = answer.answer;
  });
  const score = problems.reduce((acc, problemItem) => {
    const userAnswer = userAnswerMap[problemItem.problem._id];
    const standardAnswer = problemItem.problem.answer;
    const problemType = problemItem.problem.type;
    if (problemType === 'singleChoice' || problemType === 'multipleChoice') {
      const same = isSame(userAnswer, standardAnswer);
      if (same === true) {
        userAnswerGetScoreMap[problemItem.problem._id] = problemItem.mark;
        return acc + problemItem.mark;
      } else if (same === 0.5) {
        userAnswerGetScoreMap[problemItem.problem._id] = problemItem.mark / 2;
        return acc + problemItem.mark / 2;
      } else {
        userAnswerGetScoreMap[problemItem.problem._id] = 0;
        return acc;
      }
    }
    if (problemType === 'TrueOrFalse' || problemType === 'shortAnswer') {
      if (userAnswer === standardAnswer) {
        userAnswerGetScoreMap[problemItem.problem._id] = problemItem.mark;
        return acc + problemItem.mark;
      }
      userAnswerGetScoreMap[problemItem.problem._id] = 0;
    }
    if (problemType === 'fillInBlank') {
      const itemScore = problemItem.mark / standardAnswer.length;
      let temp = 0;
      standardAnswer.forEach((item, index) => {
        if (item === userAnswer[index]) {
          temp += itemScore;
        }
      });
      userAnswerGetScoreMap[problemItem.problem._id] = temp;
      return acc + temp;
    }
    userAnswerGetScoreMap[problemItem.problem._id] = 0;
    return acc;
  }, 0);
  console.log('score', score);
  const userAnswerSheet = problems.map((problemItem, index) => {
    return {
      problemId: problemItem.problem._id,
      userAnswer: userAnswerMap[problemItem.problem._id],
      userScore: userAnswerGetScoreMap[problemItem.problem._id],
      // problem: problemItem.problem,
      // seq: problemItem.seq,
      // mark: problemItem.mark
    };
  });
  console.log('userAnswerSheet', userAnswerSheet);
};

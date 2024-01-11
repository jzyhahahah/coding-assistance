// 云函数入口文件
const { Interface } = require('readline');
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();

/* interface getResponse {
    data: string;
    msg:"ok"
    code: number;
} */

// 云函数入口函数
exports.main = async (event, context) => {
  const lists = await db.collection('demo').get();
  return {
    data: lists.data[0]
  };
};

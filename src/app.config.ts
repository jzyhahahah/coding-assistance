export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/course/index',
    'pages/activity/index',
    'pages/account/index',
    'pages/login/index',
    'pages/course-detail/index',
    'pages/problem-bank/index',
    'pages/paper/index',
    'pages/paper-report/index',
    'pages/wrong-book/index',
    'pages/like/index',
    'pages/chat/index',
    'components/account/settings/index',
    'components/account/userInfo-edit/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '信友队',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#000000',
    backgroundColor: '#000000',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/course/index',
        text: '课程'
      },
      {
        pagePath: 'pages/activity/index',
        text: '成绩'
      },
      {
        pagePath: 'pages/account/index',
        text: '我的'
      }
    ]
  }
});

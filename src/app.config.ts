export default defineAppConfig({
  pages: ['pages/home/index', 'pages/course/index', 'pages/activity/index', 'pages/account/index', 'pages/login/index', 'components/account/settings/index'],
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
        text: '活动'
      },
      {
        pagePath: 'pages/account/index',
        text: '我的'
      }
    ]
  }
});
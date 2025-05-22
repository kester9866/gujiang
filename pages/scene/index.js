Page({
  data: {
    longitude: 113.324520,  // 示例经度
    latitude: 23.099994     // 示例纬度
  },

  // 返回首页
  goBackHome: function () {
    wx.navigateTo({
      url: '/pages/home/home'  // 替换为实际的首页路径
    });
  },

  // 行程选择按钮点击处理
  chooseItinerary: function () {
    wx.showToast({
      title: '选择了行程',
      icon: 'success',
      duration: 2000
    });
  },

  // 开始VR导览按钮点击处理
  startVRGuide: function () {
    wx.showToast({
      title: '开始VR导览',
      icon: 'success',
      duration: 2000
    });
  }
});

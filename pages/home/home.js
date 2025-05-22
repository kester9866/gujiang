Page({
  data: {},
  onLoad() {
    // 可加入未来数据请求，如推荐路线动态获取
  },
  goToGuide() {
    wx.navigateTo({
      url: '/pages/scene/index'
    });
  },
  goToGoods() {
    wx.switchTab({
      url: '/pages/goods/goods'
    });
  }
  
});

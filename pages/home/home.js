Page({
    data: {},
    onLoad() {
      // 可预留未来扩展
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
    },
    dou() {
      wx.navigateTo({
        url: '/pages/dou/index' 
      });
    }
  });
  
Page({
    data: {
      userInfo: {}
    },
  
    onLoad() {
      // 获取用户信息
      this.getUserInfo();
    },
  
    getUserInfo() {
      // 这里可以替换为实际的用户信息获取逻辑
      wx.getUserProfile({
        desc: '用于展示用户信息',
        success: (res) => {
          this.setData({
            userInfo: res.userInfo
          });
        },
        fail: (err) => {
          console.log('获取用户信息失败', err);
        }
      });
    },
  
    // 跳转到我的信息
    navigateToUserInfo() {
      wx.navigateTo({
        url: '/pages/user-info/index'
      });
    },
  
    // 跳转到商城订单
    navigateToOrders() {
      wx.navigateTo({
        url: '/pages/orders/order'
      });
    },
  
    // 跳转到功能反馈
    navigateToFeedback() {
      wx.navigateTo({
        url: '/pages/feedback/index'
      });
    },
    // 返回首页
    navigateBack() {
        wx.navigateBack();
      }
  });
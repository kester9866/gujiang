Page({
    // 选择行程类型
    selectItinerary(e) {
      const type = e.currentTarget.dataset.type;
      let title = '';
      
      switch(type) {
        case 'family':
          title = '亲子趣味路线';
          break;
        case 'culture':
          title = '非遗文化路线';
          break;
        case 'hiking':
          title = '生态徒步路线';
          break;
      }
      
      wx.showToast({
        title: `已选择${title}`,
        icon: 'success'
      });
      
      // 这里可以添加路线规划逻辑
      // 然后返回地图页面
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    },
    
    // 返回地图
    navigateBack() {
      wx.navigateBack();
    }
  });
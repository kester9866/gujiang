Page({
    data: {
      longitude: 113.324520,
      latitude: 23.099994,
      markers: [] // 存储打卡点标记
    },
  
    onLoad() {
      // 获取用户当前位置
      this.getUserLocation();
    },
  
    // 获取当前位置
    getUserLocation() {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude
          });
        },
        fail: (err) => {
          console.error('获取位置失败:', err);
          wx.showToast({
            title: '获取位置失败',
            icon: 'none'
          });
        }
      });
    },
  
    // 打卡功能
    checkInLocation() {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          const newMarker = {
            id: Date.now(),
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/images/location.png', // 请准备一个打卡图标
            width: 30,
            height: 30,
            callout: {
              content: '打卡点 ' + new Date().toLocaleTimeString(),
              color: '#000000',
              fontSize: 14,
              borderRadius: 10,
              bgColor: '#ffffff',
              padding: 5,
              display: 'ALWAYS'
            }
          };
          
          this.setData({
            markers: [...this.data.markers, newMarker]
          });
          
          wx.showToast({
            title: '打卡成功',
            icon: 'success'
          });
        },
        fail: (err) => {
          wx.showToast({
            title: '获取位置失败',
            icon: 'none'
          });
        }
      });
    },
  
    // 跳转到行程选择页面
    navigateToItinerary() {
      wx.navigateTo({
        url: '/pages/itinerary/index' // 请创建对应的行程选择页面
      });
    },
  
    // 保持原有方法不变
    goBackHome() {
      wx.navigateTo({
        url: '/pages/home/home'
      });
    },
  
    startVRGuide() {
      wx.showToast({
        title: '开始VR导览',
        icon: 'success',
        duration: 2000
      });
    }
  });
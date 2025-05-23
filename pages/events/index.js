Page({
  data: {
    activity: {
      title: "古法豆腐制作体验", // 活动标题
      location: "古豆文化村", // 活动地点
      tags: ["亲子", "豆腐制作", "古法体验"], // 标签列表
      description: "体验传统手工豆腐制作的过程，带您了解古老的豆腐文化。", // 活动描述
      hasJoined: false // 是否已报名
    }
  },

  onLoad(options) {
    const db = wx.cloud.database();
    const postId = options.id;

    let openid = wx.getStorageSync('openid');
    if (!openid) {
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          openid = res.result.openid;
          wx.setStorageSync('openid', openid);
          this.fetchPost(postId, openid);
        }
      });
    } else {
      this.fetchPost(postId, openid);
    }
  },

  fetchPost(postId, openid) {
    const db = wx.cloud.database();
    db.collection('activities').doc(postId).get({
      success: (res) => {
        this.setData({
          activity: res.data,
          hasJoined: res.data.joinedBy?.includes(openid) || false
        });
      }
    });
  },

  handleJoin() {
    if (this.data.activity.hasJoined) {
      wx.showToast({ title: '您已报名', icon: 'none' });
      return;
    }

    const db = wx.cloud.database();
    const _ = db.command;
    const postId = this.data.activity._id;
    const openid = wx.getStorageSync('openid');

    db.collection('activities').doc(postId).update({
      data: {
        participants: _.inc(1),
        joinedBy: _.push(openid),
        updatedAt: db.serverDate()
      },
      success: () => {
        wx.showToast({ title: '报名成功', icon: 'success' });
        this.setData({
          'activity.participants': this.data.activity.participants + 1,
          'activity.hasJoined': true
        });
      }
    });
  }
});

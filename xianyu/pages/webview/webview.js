const app = getApp();

Page({
  data: {
    url: ''
  },
  onLoad(query) {
    let { url, title } = query;

    if (title) {
      my.setNavigationBar({ title })
    }

    this.setData({ url })
  },
  onmessage(e) {
    //适配手淘bug，多了data的层级
    let deliverId = e.detail.deliverId || (e.detail.data && e.detail.data.deliverId)
    app.globalData.deliverId = deliverId
    // my.alert({ content: '拿到数据' + JSON.stringify(deliverId) });
  },
});

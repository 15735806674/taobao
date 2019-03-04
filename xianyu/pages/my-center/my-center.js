// const app = getApp();

Page({
    data:{
      avatar:'',
      nickName:''
    },
    onReady() {
      this.getAuthUserInfo()
    },
    getAuthUserInfo(){
      let _that = this
      my.getAuthUserInfo({
        success(userInfo) {
          console.log(userInfo)
          _that.setData({
            avatar:userInfo.avatar,
            nickName:userInfo.nickName
          })
        }
      })
    },
    billPay(){ // 账单支付
      
    },
    leaseManage(){ // 租约管理
      my.navigateTo({
        url: 'pages/my-center/zyManage/zyManage'
      });
    }, 
    // bindUser(){ // 绑定账号
    //   my.navigateTo({
    //     url: 'pages/my-center/bind-user/bind-user'
    //   });
    // }
  });
  
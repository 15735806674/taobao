import { fetch } from '/utils/api.js'
Component({
    props: {
        houseDataList: null,
    },
    data:{
       detailId:'',
       toDetail:{
        houseId:null,
        hostingType:null
       }
    },
    didUpdate() {},
    didUnmount() {
    },
    methods:{
        handleToDetail(event){
            //   let url = 'https://market.m.taobao.com/app/idleFish-F2e/widle-taobao-rax/page-detail?id=572619211063&no_silent_callapp=1&wh_weex=true&wx_navbar_transparent=true';
            //   my.navigateTo({
            //     url: `/pages/webview/webview?url=${url}`,
            //   });
            this.setData({
                toDetail:{
                    houseId:event.currentTarget.dataset.mainId,
                    hostingType:event.currentTarget.dataset.type
                }
            })
            let params = Object.assign(this.data.toDetail,{"devId": "744ef9c41ad311e9ab14d663bd873d93"})
            let id = null
            let url = ''
            fetch('house',  {
                params:params,
                method:'obtanIdleFishId'
              }).then((res)=>{
                if(res.data){
                  id = res.data.idleFishId
                //   url = 'fleamarket://item?id='+id;
                  url = 'fleamarket://item?flutter=true&itemId='+id
                  my.navigateTo({
                    url: url,
                  });
                }
                console.log('到详情页的地址2',url) 
            })
           
        }
    }
})
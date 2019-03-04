const app = getApp();
import { fetch } from '../../utils/api.js'

Page({
  data: {
    todos: app.todos,
    curCity:'杭州市',
    cityId:330100,
    pageNo:1,
    totalPages:null,
    iconList:[{
      title:'整租',
      picUrl:'/images/zz@2x.png',
      val:{
        houseRentType:1
      }
    },
    {
      title:'合租',
      picUrl:'/images/hz@2x.png',
      val:{
        houseRentType:2,
      }
    },
    {
      title:'月付',
      picUrl:'/images/yuefu@2x.png',
      val:{
        rentQuantities:['1']
      }
    },
    {
      title:'品牌公寓',
      picUrl:'/images/jingpin@2x.png',
      val:{
        type:1
      }
    }],
    lookHouseList:[
      {
        text:'VR看房子',
        tips:'不一样的看房感觉',
        picUrl:'/images/guanjia2@2x.png',
        val:{
          hasVr:true
        }
      },
      {
        text:'管家带看',
        tips:'给你极致看房体验',
        picUrl:'/images/vrtu@2x.png',
        val:{
          tags:["fhd"]
        }
      }
    ],
    houseDataList:[],
  },
  onShow() {
    my.getStorage({
      key:'CURRENT_CITY',
      success:(res) => {
        if(!res || !res.data) {
          if(this.data.houseDataList.length === 0) {
            this.getHouseList()
          }
          return
        }
        try {
          let { cityId, cityName } = JSON.parse(String(res.data))
          if(this.data.houseDataList.length !== 0 && this.data.cityId === cityId) {
            return
          }
          this.setData({
            cityId: cityId,
            curCity: cityName
          })
        } catch (e) {
          my.alert({
            content: 'error'
          })
          console.info(e)
        }
        this.setData({
          houseDataList: []
        })
        this.getHouseList()
      },
      fail:()=>{
        this.getHouseList()
      }
    })
  },
  onLoad(query){
    my.removeStorageSync({
      key: 'CURRENT_CITY'
    })
    // let that = this
    // // 判断是否选择过城市
    // let queryData = Object.keys(query);
    // if(queryData.length!==0 && query.cityId){
    //   that.setData({
    //     cityId: query.cityId,
    //     curCity:query.cityName
    //   })
      
    //   return false
    // }
    // // 获取城市定位
    // // that.getLocation()
    // this.getHouseList();
  },
  // 获取房源列表信息
  getHouseList(config={}){
    let params= {
      "devId": "744ef9c41ad311e9ab14d663bd873d93",
      cityId:this.data.cityId,
      // fullRentType:2,
      hasIdlefishPublish:true
    }
    fetch('search', {
        params:Object.assign(params,config),
        method:'searchByPage'
    }).then((res)=>{
      if(res.data && res.data.resultList) {
        this.setData({
          houseDataList:this.data.houseDataList.concat(res.data.resultList),
          totalPages:res.data.totalPages
        })
      }
    })
  },
  //链接去列表页
  tohouseList(event){
    let obj = Object.assign(event.currentTarget.dataset.obj,{
      cityId:this.data.cityId
    })   
    my.navigateTo({ url: 'pages/house/house?Obj=' + encodeURIComponent(JSON.stringify(obj)) });
  },
  //获取当前位置
  getLocation() {
    let that = this
    my.getLocation({
      success: (res) => {        
        let locationString =  res.longitude+ ',' +res.latitude
        my.httpRequest({
          url: 'https://restapi.amap.com/v3/geocode/regeo?key=c5d3e491f380a520dc18d1befabc87e2&location='+ locationString,
          data: {
            // key:'c5d3e491f380a520dc18d1befabc87e2',
            // "location": locationString
          },
          method: 'GET',
          success: function(res) {
            that.setData({
              cityId:res.data.regeocode.addressComponent.adcode.substr(0,4)*1+'00' || 330100 ,
              curCity:res.data.regeocode.addressComponent.city || '杭州市'
            })
            that.getHouseList();
          },
        });
      },
    })
  },
  //上拉加载更多
  setCanPullDown(){
    if(this.data.pageNo > this.data.totalPages){
        return false
    }
    this.data.pageNo++
    if(this.data.pageNo>1){
      this.getHouseList({pageNo:this.data.pageNo})
    }
  },
  // 打开城市选择页面
  changeCity(){
    my.navigateTo({ url: 'pages/city/city?cityId='+this.data.cityId});
  },
  toSearchPage(){ //去搜索页
    my.navigateTo({ url: 'pages/search/search?cityId='+this.data.cityId});
  }
});

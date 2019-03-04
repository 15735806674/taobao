const app = getApp();
import { fetch } from '/utils/api.js'
Page({
  data: {
    houseDataList:[],
    pageNo:1,
    totalPages:'',
    params:{
      cityId:'',
      houseRentType:null,//1-整租，2-合租
      fullRentType:2,
      devId: "744ef9c41ad311e9ab14d663bd873d93",
      keyWords:'',
      hasIdlefishPublish:true,
      pageNo:1
    },
    houseDatafalse:false
  },
  onLoad(query){
    console.log(query)
    if(query){
      this.data.params.cityId = query.cityId
      this.setData({
        params:this.data.params
      })
    }

  },
  // 获取房源列表信息
  getHouseList(type){
    let params = Object.assign( this.data.params)
    fetch('search', {
        params: params,
        method:'searchByPage'
    }).then((res)=>{
      if(type==='search'&&res.data){
        this.setData({
          houseDataList:res.data.resultList
        })
        return
      }else if(!res.data){
        this.setData({
          houseDataList:[]
        })
        return
      }
      console.log(res)
      if(res.data ==null || res.data.resultList == null){
        this.setData({
          houseDatafalse:true
        })
      }
      if(res.data!==null && res.data.resultList !== null){
        this.setData({
          houseDataList:this.data.houseDataList.concat(res.data.resultList),
          totalPages:res.data.totalPages
        })
      }else{
        this.setData({
          houseDataList:this.data.houseDataList
        })
      }
    })
  },
  onBlur(event){
      console.log(event.detail.value)
      this.data.params.keyword = event.detail.value
     this.setData({
      params:this.data.params
    })
  },
  searchHandel(){
    this.getHouseList('search')
  },
  //上拉加载更多
  setCanPullDown(){
    if(this.data.params.pageNo > this.data.totalPages){
      return false
    }
    this.data.params.pageNo++
    if(this.data.params.pageNo>1){
      this.getHouseList()
    }
  },
});

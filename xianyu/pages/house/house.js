const app = getApp();
import { fetch } from '/utils/api.js'
Page({
  data: {
    houseDataList:[],
    totalPages:2,
    searchDefault:Object,
    params:{
      cityId:'',
      fullRentType:1,
      devId: "744ef9c41ad311e9ab14d663bd873d93",
      keyword:'',
      pageNo:1,
      pageSize:'10',
      hasIdlefishPublish:true
    },
    houseDatafalse: false
  },
  onLoad(query){
    let that = this
    if(query && query.Obj){
      that.setData({
        params:Object.assign(that.data.params,JSON.parse(query.Obj))
      })
      that.getHouseList();
      this.setData({
        searchDefault:JSON.parse(query.Obj)
      })
    }
    // console.log('query',query)
    // 隐藏底部菜单
    // my.hideTabBar({
    //   animation: false,
    //   success:(res)=>{
    //       console.log('调用成功', res)
    //   }
    // })
  },
  onChangeData(data){  // 子组件传过来的参数
    this.setData({
      params:Object.assign(this.data.params,data)
    })
    // console.log('选择的参数',this.data.params)
    this.data.params.pageNo = 1
    this.setData({
      houseDataList:[],
      params:this.data.params
    })
    this.getHouseList()
  },
  // 获取房源列表信息
  getHouseList(type){
    let that = this
    let params =this.data.params
    // console.log('params',params)
    fetch('search', {
        params: params,
        method:'searchByPage'
    }).then((res)=>{
      if(type === 'search'&&res.data){
        that.setData({
          houseDataList:res.data.resultList 
        })
        return 
      }else if(!res.data){
        that.setData({
          houseDataList:[],
          houseDatafalse:true
        })
        return
      }
      if(res.data ==null && this.data.params.pageNo){
        that.setData({
          houseDatafalse:true
        })
      }  
      // console.log('返回的数据',res)
      if(res.data!==null && res.data.resultList !== null){
        that.setData({
          houseDataList:this.data.houseDataList.concat(res.data.resultList),
          totalPages:res.data.totalPages
        })
      }else{
        that.setData({
          houseDataList:this.data.houseDataList
        })
      }
    })
  },
  onBlur(event){
    this.data.params.keyword = event.detail.value
    this.setData({
      params:this.data.params
    })
  },
  // 搜索失去焦点 查询
  searchData(event){
    this.getHouseList('search')
  },
  //上拉加载更多
  setCanPullDown(){
    // console.log(this.data.params.pageNo÷+
    if(this.data.params.pageNo > this.data.totalPages){
       return false
    }
    if(this.data.params.pageNo>1){
      this.getHouseList()
    }
    this.data.params.pageNo++
  }
});

import { fetch } from '../../utils/api.js'
Page({
    data: {
        curCityId: '',
        cityList: []
    },
    onLoad(query){
       console.log(query)
       this.data.curCityId = query.cityId
    },
    onShow(){
        this.getCityData()
    },
    //选择城市
    handleCityToIndex(event){
        event.stopPropagation()
        let { id, name } = event.currentTarget.dataset
        //my.navigateTo({ url: 'pages/index/index?cityId='+ id+'&cityName='+ name});
        my.setStorage({
            key: 'CURRENT_CITY',
            data: JSON.stringify({
                cityId: id,
                cityName: name
            }),
            success: () => {
                my.navigateBack()
            }
        });
    },
     // 获取城市列表
    getCityData(){ 
        fetch('home', {
            params: {
                "devId": "744ef9c41ad311e9ab14d663bd873d93",
                appType:4
            },
            method:'homeCityList'
        }).then((res)=>{
            this.setData({
                cityList:res.data.normalCityList,
            })
            this.data.cityList.map((item)=>{
               if(this.data.curCityId*1 == item.cityId){
                    item.active = true
               }else{
                    item.active = false
               }
            })
            this.setData({
                cityList:res.data.normalCityList,
            })
        })
    }
}); 
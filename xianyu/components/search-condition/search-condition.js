import { fetch } from '../../utils/api.js'
Component({
    props:{
        onChangeData: data => {console.log('data',data)},
        defalutData:Object
    },
    data:{
        areaId:'', 
        cityName:'',
        selectAreaShow:false,
        regionList:[],
        curIndex:'',
        curObj:'',
        districtList:[],// 区域板块
        zones:[],
        currentText:'',
        curObjList:'',// 当前渲染的那个字段
        searchData:{
            "decorationDegrees":[], // 装修程度
            "chamberCounts": [], // 卧室数量范围
            "toiletCounts": [], // 卫生间数量范围
            "keyword": '',
            "orderBy":null, //minRentPrice（最低租金）, roomArea（房间面积）
            'sortType':null, // asc、desc，不传默认asc
            'regionId':'', // 区域id
            'zoneId':'',   // 板块
            'minPrice':'', //  租金最小值
            'maxPrice':'', // 租金最大值
            'houseRentType':'', //类型
            'pageNo':1
        },
        showPopupObj: {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false
        },
        selectOptions: [
            {
              defalutText:0,
              text: '区域',
              active: false,
              textId:0,
              obj:'zones'
            },
            {
              defalutText:0,
              text: '类型',
              active: false,
              textId:0,
              obj:'rentTypeList'
            },
            {
              defalutText:0,
              text: '价格',
              textId:0,
              active: false,
              obj:'priceList'
            },
            {
              defalutText:0,
              text: '更多',
              textId:0,
              active: false,
              obj:'decorationList'
            },
            {
              text: '',
              active: false,
              src:'/images/filter.png',
              obj:'filterList'
            }
          ],
          filterList:[
            {
              text:'租金从低到高',
              active:false,
              val:{
                "orderBy":'minRentPrice', //minRentPrice（最低租金）, roomArea（房间面积）
                'sortType':'asc', // asc、desc，不传默认asc  正序
              }
            },
            {
              text:'租金从高到低',
              active:false,
              val:{
                "orderBy":'minRentPrice', //minRentPrice（最低租金）, roomArea（房间面积）
                'sortType':'desc', // asc、desc，不传默认asc  正序
              }
            },
            {
              text:'面积从小到大',
              active:false,
              val:{
                "orderBy":'roomArea', //minRentPrice（最低租金）, roomArea（房间面积）
                'sortType':'asc', // asc、desc，不传默认asc  正序
              }
            },
            {
              text:'面积从大到小',
              active:false,
              val:{
                "orderBy":'roomArea', //minRentPrice（最低租金）, roomArea（房间面积）
                'sortType':'desc', // asc、desc，不传默认asc  正序
              }
            }
          ],
          rentTypeList: [
            {
              val: null,
              text: '不限',
              active:true
            },
            {
              val: 3,
              text: '品牌公寓',
              active:false
            },
            {
              val: 1,
              text: '整租',
              active:false
            },
            {
              val: 2,
              text: '合租',
              active:false
            }
          ],
          priceList: [
            {
              text: '不限',
              active:true,
              val: {
                minPrice: null,
                maxPrice: null
              }
            },
            {
              text: '1500元以下',
              active:false,
              val: {
                minPrice: null,
                maxPrice: 1500
              }
            },
            {
              text: '1500-2000元',
              active:false,
              val: {
                minPrice: 1500,
                maxPrice: 2000
              }
            },
            {
              text: '2000-2500元',
              active:false,
              val: {
                minPrice: 2000,
                maxPrice: 2500
              }
            },
            {
              text: '2500-3000元',
              active:false,
              val: {
                minPrice: 2500,
                maxPrice: 3000
              }
            },
            {
              text: '3000-4000元',
              active:false,
              val: {
                minPrice: 3000,
                maxPrice: 4000
              }
            },
            {
              text: '4000-5000元',
              active:false,
              val: {
                minPrice: 4000,
                maxPrice: 5000
              }
            },
            {
              text: '5000元以上',
              active:false,
              val: {
                minPrice: 5000,
                maxPrice: null
              }
            }
          ],
          decorationList: [
            {
              text: '毛坯',
              checked: false,
              isChecked: false,
              val: '1'
            },
            {
              text: '简装',
              checked: false,
              isChecked: false,
              val: '2'
            },
            {
              text: '精装',
              checked: false,
              isChecked: false,
              val: '3'
            },
            {
              text: '豪华',
              checked: false,
              isChecked: false,
              val: '4'
            }
          ],
          chamberList: [
            {
              text: '一室',
              range: {
                min: 1,
                max: 1
              },
              checked: false,
              isChecked: false
            },
            {
              text: '二室',
              range: {
                min: 2,
                max: 2
              },
              checked: false,
              isChecked: false
            },
            {
              text: '三室',
              range: {
                min: 3,
                max: 3
              },
              checked: false,
              isChecked: false
            },
            {
              text: '四室',
              range: {
                min: 4,
                max: 4
              },
              checked: false,
              isChecked: false
            },
            {
              text: '四室及以上',
              range: {
                min: 4,
                max: null
              },
              checked: false,
              isChecked: false
            }
          ],
          toiletList: [
            {
              text: '一卫',
              range: {
                min: 1,
                max: 1
              },
              checked: false,
              isChecked: false
            },
            {
              text: '二卫',
              range: {
                min: 2,
                max: 2
              },
              checked: false,
              isChecked: false
            },
            {
              text: '二卫以上',
              range: {
                min: 2,
                max: null
              },
              checked: false,
              isChecked: false
            }
          ],
    },
    didUpdate() {},
    didMount() { 
      // 给组件传默认值
      let that = this
      let defalutData = that.props.defalutData
      // console.log('default',that.props.defalutData)
      if(defalutData.houseRentType){
        if(defalutData.houseRentType==1){
          this.data.selectOptions[1].text = '整租'
          this.data.selectOptions[1].textId = 2
          this.data.rentTypeList[2].active = true
        }else if(defalutData.houseRentType==2){
          this.data.selectOptions[1].text = '合租'
          this.data.selectOptions[1].textId = 3
          this.data.rentTypeList[3].active = true
        }
      }
      if(defalutData.type && defalutData.type == 1){
        this.data.selectOptions[1].text = '品牌公寓'
        this.data.rentTypeList[1].active = true
        this.data.selectOptions[1].textId = 1
      }
      this.data.selectOptions[1].active = true
      this.data.rentTypeList[0].active = false
      //获取城市区域 板块
      this.getDistrictList()
    },
    methods:{
      //判断选中的状态
      checkHover(event){
         let setData = this.data.searchData
        this.data.selectOptions.map((item)=>{
          if(item.textId == item.defalutText){
              item.active = false
          }else{
             item.active = true
          }
       })
        if(setData.toiletCounts.length == 0 && setData.chamberCounts.length == 0 && setData.decorationDegrees.length == 0){
          this.data.selectOptions[3].active = false
        }else{
          this.data.selectOptions[3].active = true
        }
      },
      handelCurSelect(event){
            event.stopPropagation()
            console.log( event.currentTarget.dataset)
            let { index, obj, text} = event.currentTarget.dataset
            // let index = event.currentTarget.dataset.id
            // let obj =  event.currentTarget.dataset.obj
            // let text =  event.currentTarget.dataset.text
            let showPopupObj = this.data.showPopupObj
            let selectOptions = this.data.selectOptions
            

            this.setData({
              curIndex:index,
              curObj:'',
              currentText:text
            })
             
            //判断选中状态
            this.checkHover()

            console.log(this.data.curIndex,this.data.currentText)
            // 再次点击同一个位置
            if (showPopupObj[index]) {
                showPopupObj[index] = false;
                this.setData({
                    selectOptions:this.data.selectOptions,
                    showPopupObj:this.data.showPopupObj
                })
                return;
            }
            //  展开选项
            for (let n in showPopupObj) {
                if (index == n) {
                    showPopupObj[index] = true;
                    selectOptions[index].active = true
                } else {
                    showPopupObj[n] = false;
                }
            }
           
            this.setData({
                selectOptions:this.data.selectOptions,
                showPopupObj:this.data.showPopupObj,
                curObjList:obj
            })
        },
        getDistrictList(event){ // 获取区域列表
            fetch('search',{
                params:{
                    cityId: 330100,
                    "devId": "5555998cccf2492db015c442f087f00a"
                },
                method:'areaListWithHouse'
            }).then((response)=>{
              response.data.areaZones.forEach((item, index) => {
                this.data.districtList.push({
                  id: item.areaId,
                  name: item.areaName,
                  checked: false,
                  isChecked: false,
                  zones: item.zones || [{
                    zoneId: -1,
                    zoneName: "全部",
                    active:true
                  }]
                });
              })
              this.setData({
                zones:this.data.districtList[0].zones
              })
              this.data.districtList[0].checked = true;
            })
        },
        // 条件选择
        changeRentType(event){ 
            event.stopPropagation();
            let that = this
            let curObjList = this.data.curObjList
            let searchData = that.data.searchData;
            let index=event.currentTarget.dataset.index
            let dataSet = event.currentTarget.dataset
            for(let n in this.data[curObjList]){
                if(index == n){
                  that.data[curObjList][index].active=true
                    if(curObjList == 'zones'){ // 区域选择
                      that.data.searchData.zoneId = dataSet.zoneId
                      that.data.selectOptions[this.data.curIndex].text =  this.data[curObjList][index].zoneName
                      that.data.selectOptions[this.data.curIndex].textId = index
                      if((!that.data.areaId||that.data.areaId*1==-1)&&dataSet.zoneId*1 == -1){
                        that.data.selectOptions[this.data.curIndex].text = '区域'
                      }
                      if(this.data[curObjList][index].zoneName == '全部'&&that.data.areaId*1!=-1) {
                        that.data.selectOptions[this.data.curIndex].text = that.data.cityName
                        that.data.selectOptions[this.data.curIndex].textId = that.data.areaId
                      }
                    }else {
                      that.data.selectOptions[this.data.curIndex].text =  this.data[curObjList][index].text
                      that.data.selectOptions[this.data.curIndex].textId = index
                    }
                }else{
                  that.data[curObjList][n].active=false
                }
            }  
            that.setData({
              curObjList:this.data[curObjList]
            })
            // 过滤选中的参数
            that.data.filterList.filter(item => item.active).map(item=>{
                searchData.orderBy  = item.val.orderBy 
                searchData.sortType  = item.val.sortType
            })
            searchData.minPrice = that.data.priceList.filter(item => item.active).map(item => item.val)[0].minPrice || null
            searchData.maxPrice = that.data.priceList.filter(item => item.active).map(item => item.val)[0].maxPrice || null
            searchData.houseRentType = that.data.rentTypeList.filter(item => item.active)[0].val || null
            
            if(searchData.houseRentType == 3){
              searchData.houseRentType =null
              searchData.type = 1
            }
             //  判断选中状态
            this.checkHover()
            // 隐藏弹窗
            that.data.showPopupObj[this.data.curIndex]=false
            that.setData({
                showPopupObj:that.data.showPopupObj,
                selectOptions:that.data.selectOptions,
                searchData:that.data.searchData
            })
            // console.log('参数',that.data.searchData)
            this.props.onChangeData( this.data.searchData );   
        },
        // 切换区域
        changeRegion(event){
          let dataSet = event.currentTarget.dataset
          let index=dataSet.index
          this.data.zones.forEach(item=>{
            item.active = false
          })
          this.setData({
            zones:this.data.districtList[index].zones || null
          })
          for(let n in this.data.districtList){
            if(index == n){
              this.data.districtList[index].checked = true
            }else{
              this.data.districtList[n].checked = false
            }
          }
          this.data.searchData.regionId = this.data.districtList[index].id || null
          this.setData({
            districtList:this.data.districtList,
            searchData:this.data.searchData
          })
          console.log(dataSet.id)
            this.setData({
              areaId:dataSet.id
            })
          this.setData({
            cityName:event.currentTarget.dataset.name,
          })
        },
        // 更多选择
        handleMore(event){
          // let index = event.currentTarget.dataset.index;
          // let obj= event.currentTarget.dataset.obj
          let {index, obj} = event.currentTarget.dataset
          if(!this.data[obj][index].checked){
            this.data[obj][index].checked = true
          }else{
            this.data[obj][index].checked = false
          }
          this.setData({
            obj:this.data[obj]
          })
        },
        //确定
        handleSureBtn(){
          this.setData({
            searchData:{
              decorationDegrees:[],
              chamberCounts:[],
              toiletCounts:[]
            }
          })
          let setData = this.data.searchData
  
          this.data.decorationList.filter((item)=>{
              if(item.checked){
                setData.decorationDegrees.push(item.val)
              }
          })
          this.data.chamberList.filter((item)=>{
            if(item.checked){
              setData.chamberCounts.push(item.range)
            }
          })
          this.data.toiletList.filter((item)=>{
            if(item.checked){
              setData.toiletCounts.push(item.range)
            }
          })
          this.setData({
            searchData:this.data.searchData,
            selectOptions:this.data.selectOptions
          })
          this.props.onChangeData( this.data.searchData ); 
          this.data.showPopupObj[3]=false
          this.setData({
            showPopupObj:this.data.showPopupObj
          })
          if(setData.toiletCounts.length == 0 && setData.chamberCounts.length == 0 && setData.decorationDegrees.length == 0){
            this.data.selectOptions[this.data.curIndex].active = false
            this.setData({
              selectOptions:this.data.selectOptions
            })
          }
        },
        // 重置
        handleRestBtn(){
          this.data.decorationList.filter((item)=>{
            if(item.checked){
              item.checked = false
            }
          })
          this.data.chamberList.filter((item)=>{
            if(item.checked){
              item.checked = false
            }
          })
          this.data.toiletList.filter((item)=>{
            if(item.checked){
              item.checked = false
            }
          })
          this.setData({
            searchData:this.data.searchData
          })
        },
        onPopupClose(){
          this.data.showPopupObj[this.data.curIndex] = false
          this.setData({
            showPopupObj:this.data.showPopupObj
          })
          //  判断选中状态
          this.checkHover()
        }
    }
})
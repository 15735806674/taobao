Page({
    data:{},
    formSubmit(){
        my.navigateTo({
            url: 'pages/my-center/my-center'
        });
    },
    onReady(){
        this.hideTabBar()
    },
    hideTabBar(){
        console.log(1)
        my.hideTabBar({
            animation: false,
            success:()=>{
                console.log(2)
            },
            fail:(error)=>{
                console.log(error)
            }
        })
    }
});
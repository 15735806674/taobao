Component({
    props: {
        onSelectCity: data => {},
        cityList: null,
        cityData: null
    },
    data: {},
    didUpdate(){},
    didMount(){},
    methods:{
    changeCity(event){
        event.stopPropagation();
        this.props.onSelectCity(event.currentTarget.dataset); 
    },
    },
      
}); 
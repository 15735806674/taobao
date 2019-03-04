const defaultConfig = {
    reqId: "xianyu",
    sessionId: "MTM1Nw==",
    sign: "8F4C4A8E9D850EDD9692DE38723D0543",
    timestamp: 1547201261748,
    v: "3.0.2"
  }
// const basePath = 'https://tapi244.mdguanjia.com/myhome/api/'
const basePath = 'https://papi.mdguanjia.com/myhome/api/'
// const basePath = 'https://tapi240.mdguanjia.com/myhome/api/'

const fetch = (url, data, params={})=>{
    const promise = new Promise((resolve, reject)=>{
        defaultConfig.v=params.v || defaultConfig.v
        const postData = Object.assign(data, defaultConfig)
        my.httpRequest({
            url: basePath + url,
            method: params.method || 'POST',
            data: postData,
            headers: { 'Content-Type': 'application/json' },
            success: function(res) {
              if(res.data.code == 0){
                resolve(res.data)
              }
            },
            fail: function(res) {
                console.log(1)
            },
            complete: function(res) {
                resolve(res.data)
            }
          });
    })
    return promise
}
export {
    fetch
}
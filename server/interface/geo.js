//获取数据的前提：有签名
//接口签名！！！
//腾讯的key:52XBZ-P4UCD-FTF4P-PWYSM-KE6P5-DCB6Q
import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})

let key='52XBZ-P4UCD-FTF4P-PWYSM-KE6P5-DCB6Q'
router.get('/getPosition', async (ctx) => {
  let res=await axios.get(`http://whois.pconline.com.cn/ipJson.jsp?json=true`)
  //console.log('res为',res)
  // let ip=res.data.ip
  //上面为本机ip，下面将为了进行更好的测试选用一个北京的ip
  let ip='61.135.17.68'

  //console.log('ip地址为',ip)
  let {status:status,data:data}= await axios.get(`https://apis.map.qq.com/ws/location/v1/ip?ip=${ip}&key=${key}`)
  //console.log(data)
  if(status===200&&data.status===0){
    //console.log(data)
    ctx.body={
      province:data.result.ad_info.province,
      city:data.result.ad_info.city
    }
  }else{
    ctx.body={
      province:'',
      city:''
    }
  }
})

router.get('/province',async(ctx)=>{
  // let province=await Province.find()
  // ctx.body={//到底啥意思！！！
  //   province:province.map(item=>{
  //     return{
  //       id:item.id,
  //       name:item.value[0]
  //     }
  //   })
  // }
  //以上为在本地数据库中查询

  //以下为线上查询
  let {status,data:{
    province
  }}=await axios.get(`http://cp-tools.cn/geo/province`)
  ctx.body={
    province:status===200?province:[]
  }
})

router.get('/province/:id', async (ctx) => {
  //本接口亦非自行实现
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }
  let {status, data: {
    city
  }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city',async(ctx)=>{
  // let city=[]
  // let result=await City.find()
  // result.forEach(item=>{
  //   city=city.concat(item.value)
  // })
  // ctx.body={
  //   code:0,
  //   city:city.map(item=>{
  //     return {
  //       province:item.province,
  //       id:item.id,
  //       name:item.name==='市辖区'||item.name==='省直辖县级行政区划'
  //       ?item.province
  //         :item.name
  //     }
  //   })
  // }
  //以上为本地查询
  let {status, data: {
    city
  }} = await axios.get(`http://cp-tools.cn/geo/city`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

//hotCity也不是自己写的
router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  let {status, data: {
    hots
  }} = await axios.get(`http://cp-tools.cn/geo/hotCity`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

router.get('/menu',async(ctx)=>{
  let {status,data:{menu}}=await axios.get(`http://cp-tools.cn/geo/menu`)
  if(status===200){
    ctx.body={
      menu
    }
  }else{
    ctx.body={
      menu:[]
    }
  }

})


export default router

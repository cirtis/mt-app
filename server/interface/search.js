import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'


let router=new Router({
  prefix:'/search'
})
router.get('/top',async(ctx)=>{
  //可以走线上和线下查询两种方式
  //线下方式的代码未写？
  let {status,data:{top}}=await axios.get(`http://cp-tools.cn/search/top`,{
    params:{//查询的关键词
      input:ctx.query.input,
      city:ctx.query.city,
    }
  })
  ctx.body={
    top:status===200?top:[]
  }

})

router.get('/hotPlace',async(ctx)=>{
  let  city=ctx.store?ctx.store.geo.position.city:ctx.query.city
  let {status,data:{result}}=await axios.get(`http://cp-tools.cn/search/hotPlace`,{
    params:{
      // city:encodeURIComponent(city)
      city//不需要编码
    }
  })
  ctx.body={
    result:status===200?result:[]
  }
})

router.get('/resultsByKeywords',async(ctx)=>{
  const {city,keyword}=ctx.query
  let {status,data:{count,pois}}=await axios.get(`http://cp-tools.cn/search/resultsByKeywords`,{
    params:{
      city,
      keyword
    }
  })
  ctx.body={
    count:status===200?count:0,
    pois:status===200?pois:[]
  }
})

//products接口非自己编写
router.get('/products', async (ctx) => {
  //console.log('进入了这个接口')
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()//判断是否登录
    }
  }else{
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router

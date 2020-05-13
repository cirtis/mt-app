import Router from 'koa-router'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

let router = new Router({prefix: '/cart'})
//let router = new Router({prefiex: '/cart'})再写错剁手

router.get('/test',async ctx=>{
  ctx.body={
    head:'ok',
    msg:'test success'
  }
})

router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    console.log('进入/cart/create并且通过了身份验证')
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString()

    let {
      params: {
        id,
        detail
      }
    } = ctx.request.body
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    let result = await cart.save()
    if (result) {
      console.log('存取成功')
      ctx.body = {
        code: 0,
        msg: 'ok',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'failed'
      }
    }
  }
})

router.post('/getCart', async ctx => {
  let {id} = ctx.request.body
  try {
    let result = await Cart.findOne({
      cartNo: id
    })
    ctx.body={
      code:0,
      data:result?result.detail[0]:{}
    //新增一个商品创建一个购物车
    }
  }catch(e){
    ctx.body={
      code:-1,
      data:{}
    }
  }
})//post('/url',middleware)!!!

export default router

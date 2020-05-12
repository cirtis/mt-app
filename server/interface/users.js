 import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code//验证码
  } = ctx.request.body
  if (code) {//验证码不为空
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      //验证码正确
      console.log('验证码正确')
      if (new Date().getTime() - saveExpire > 0) {
        //验证码过期
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {//验证码填写错误
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {//未填写验证码
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  //经过以上验证：验证码通过
  console.log('验证码在规定的时间内校验通过')

  //验证密码
  let user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  //账号（昵称）未被注册
  let nuser = await User.create({
    username,
    password,
    email
  })//在mongodb中存储用户实例
  console.log('该昵称可用，新创建用户信息为',nuser)//尝试打印新创建的user信息
  if (nuser) {
    console.log('正开始进行调用/users/signin接口')
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    //signin接口坏掉了
    console.log(res)//打印从/users/signin接口的返回结果
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      console.log(res.data)
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    console.log('开始对校验结果进行分支判断')
    console.log('ctx',ctx)
    console.log('user',user)
    console.log('err',err)
    console.log('info',info)
  if(err){
   console.log('第一个分支：出现错误')
    ctx.body={
      code:-1,
      msg:err
    }
  }else{
    if(user){
      console.log('登录成功')
      ctx.body={
        //boy???
        code:0,
        msg:'登录成功',
        user
      }
      //以下这条语句到底有什么作用
      return ctx.login(user)
    }else{
      console.log('point 2')
      ctx.body={
        code:1,
        msg:info
      }
    }
  }
  })(ctx,next)//固定写法，API规定
})

router.post('/verify',async(ctx,next)=>{
  let username=ctx.request.body.username
  const saveExpire=await Store.hget(`nodemail:${username}`,'expire')
  //测试时注释掉了此处
  if(saveExpire&&new Date().getTime()-saveExpire<0){
    //限制频繁刷接口
    ctx.body={
      code:-1,
      msg:'验证请求过于频繁，最多一分钟一次'
    }
    return false
  }
  let transporter=nodeMailer.createTransport({
    host:Email.smtp.host,
    port:587,//QQ邮箱端口为587
    secure:false,
    auth:{
      user:Email.smtp.user,
      pass:Email.smtp.pass
    }
  })
  let ko={
    code:Email.smtp.code(),
    expire:Email.smtp.expire(),
    email:ctx.request.body.email,
    user:ctx.request.body.username
  }
  let mailOptions={
    from:`认证邮件<${Email.smtp.user}>`,
    to:ko.email,
    subject:'美团网注册码',
    html:`您在美团网进行了注册，您的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      return console.log(error)
    }else{
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })
  ctx.body={
    code:0,
    msg:'验证码已发送，可能会有延时，有效期一分钟'
  }
})

router.get('/exit',async(ctx,next)=>{
  await ctx.logout()
  if(!ctx.isAuthenticated()){//二次验证，是否成功注销
    ctx.body={
      code:0
    }
  }else{
    ctx.body={
      code:-1
    }
  }
})

router.get('/getUser',async(ctx)=>{
  if(ctx.isAuthenticated()){
    const {username,email}=ctx.session.passport.user
    ctx.body={
      user:username,
      email
    }
  }else{
    ctx.body={
      user:'',
      email:''
    }
  }
})

export default router




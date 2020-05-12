// import passport from 'koa-passport'
// import LocalStrategy from 'passport-local'
// import UserModel from'../../dbs/models/users'
//
// passport.use(new LocalStrategy(function (username,password,done) {
//   let where={
//    username
//     //不要画蛇添足写成：username：username
//   }
//   let result=UserModel.findOne(where)
//   if(result!=null){
//     if(result.password===password){
//       return done(null,result)//验证成功
//     }else{
//       return done(null,false,'密码错误')
//     }
//   }else{
//     return done(null,false,'用户不存在')
//   }
// }))
//
// passport.serializeUser(function (user,done) {
//   return done(null,user)
// })
//
//
// passport.deserializeUser(function (user,done) {
//   return done(null,user)
// })
//
// export default passport


import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'


passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  console.log('开始在mongodb中核验用户信息')
  let result = await UserModel.findOne(where)
  console.log('查找到的用户信息为',result)
  if(result!=null){
    if(result.password===password){
      console.log('passport校验密码成功')
      return done(null,result)//已经测试为校验成功
    }else{
      console.log('密码错误')
      return done(null,false,'密码错误')
    }
  }else{
    console.log('用户不存在')
    return done(null,false,'用户不存在')
  }

}))

passport.serializeUser(function(user,done){
  done(null,user)
})

passport.deserializeUser(function(user,done){
  return done(null,user)
})

export default passport




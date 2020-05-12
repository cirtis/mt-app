export default{
  dbs:'mongodb://127.0.0.1:27017/mtapp',
  redis:{
    get host(){
      return '127.0.0.1'
    },
    get port(){
      return 6379//默认端口号
    }
  },
  smtp:{
    //163邮箱为CIWXXUPLICNRSLON
    get host(){//使用腾讯的qq邮箱
      return 'smtp.qq.com'
    },
    get user(){
      return '316318771@qq.com'
    },
    get pass(){
      return 'skoqngpkanddbicc'
    },
    get code(){//生成验证码
      return ()=>{
        return Math.random().toString().slice(2,6).toUpperCase()
      }
    },
    get expire(){
      return ()=>{
        return new Date().getTime()+60*60*1000//一分钟
      }
    }
  }
}

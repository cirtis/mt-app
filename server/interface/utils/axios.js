import axios from 'axios'
const instance=axios.create({
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:3000,
  //axios官网对配置项有详细说明
  headers:{
    "Content-Type": "application/x-www-form-urlencoded;charset=GBK"
  },

})

export default instance

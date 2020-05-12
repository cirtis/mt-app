<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/"
           class="site-logo"/>
        <span class="login">
            <em class="bold">已有美团账号？</em>
            <a href="/login">
              <el-button
                type="primary"
                size="small">
                登录
              </el-button>
            </a>
          </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">

        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"/>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"/>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册
          </el-button>
          <div class="error">{{error}}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="https://rules-center.meituan.com/rules-detail/2"
            target="_blank">《美团点评隐私政策》</a>
          <a
            class="f1"
            href="https://rules-center.meituan.com/rules-detail/4"
            target="_blank">《美团点评用户服务协议》</a>
        </el-form-item>

      </el-form>
    </section>
  </div>
</template>

<script type="module">
  import CryptoJS from 'crypto-js'

  export default {
    data() {
      //再写成date就剁手！！！
      return {
        statusMsg: '',
        error: '',
        ruleForm: {
          name: '',
          code: '',
          pwd: '',
          cpwd: '',
          email: ''
        },
        rules: {
          name: [{
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }],
          email: [{
            require: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }],
          pwd: [{
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }],
          cpwd: [{
            required: true,
            message: '确认密码',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
        }
      }
    },
    layout: 'blank',//使用blank.vue作为模板
    methods: {
      // test:function(){
      //   console.log('wangwang')
      // },

      // sendMsg: function () {
      //   //   console.log('触发了事件')
      //   const self = this
      //   let namePass
      //   let emailPass
      //   if (self.timerid) {
      //     return false
      //   }
      //   this.$refs['ruleForm'].validateField('name', (valid) => {
      //     namePass = valid
      //   })
      //   self.statusMsg = ''
      //   if (namePass) {
      //     return false
      //   }
      //   this.$refs['ruleForm'].validateField('email', (valid) => {
      //     emailPass = valid
      //   })
      //   if (!namePass && !emailPass) {
      //     self.$axios.post('/users/verify', {
      //       //需要将'@nuxtjs/axios'在nuxt.config.js中引入才可以使用
      //       username: encodeURIComponent(self.ruleForm.name),
      //       email: self.ruleForm.email
      //     }).then(({
      //                status,
      //                data
      //              }) => {
      //       if (status === 200 && data && data.code === 0) {
      //         let count = 60;
      //         self.statusMsg = `验证码已发送,剩余${count--}秒`
      //         self.timerid = setInterval(function () {
      //           self.statusMsg = `验证码已发送,剩余${count--}秒`
      //           if (count === 0) {
      //             clearInterval(self.timerid)
      //           }
      //         }, 1000)
      //       } else {
      //         self.statusMsg = data.msg
      //       }
      //     })
      //   }
      // },


      sendMsg: function () {
        //   console.log('触发了事件')
        const self = this
        let namePass
        let emailPass
        if (self.timerid) {
          return false
        }
        this.$refs['ruleForm'].validateField('name', (valid) => {
          namePass = valid
        })
        self.statusMsg = ''
        if (namePass) {
          return false
        }
        this.$refs['ruleForm'].validateField('email', (valid) => {
          emailPass = valid
        })
        if (!namePass && !emailPass) {
          this.$axios.post('/users/verify', {
            //需要将'@nuxtjs/axios'在nuxt.config.js中引入才可以使用
            username: encodeURIComponent(this.ruleForm.name),
            email: this.ruleForm.email
          }).then(({
                     status,
                     data
                   }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              self.statusMsg = `验证码已发送,剩余${count--}秒`
              self.timerid = setInterval(function () {
                self.statusMsg = `验证码已发送,剩余${count--}秒`
                if (count === 0) {
                  clearInterval(self.timerid)
                }
              }, 1000)
            } else {
              self.statusMsg = data.msg
            }
          })
        }
      },

      // register: function () {
      //   let self = this
      //   this.$refs['ruleForm'].validate((valid => {
      //     if (valid) {
      //       self.$axios.post('/users/signup', {
      //         username: window.encodeURIComponent(self.ruleForm.name),
      //         password: CryptoJS.MD5(self.ruleForm.pwd).toString(),//一定要使用toString方法
      //         //md5的加密方式
      //         email: self.ruleForm.email,
      //         code: self.ruleForm.code
      //       }).then(({status, data}) => {
      //         if (status === 200) {
      //           if (data && data.code === 0) {
      //             location.href = '/login'
      //           } else {
      //             self.error = data.msg
      //           }
      //         } else {//通信失败
      //           self.error = `服务器出错，错误码:${status}`
      //         }
      //         //error对象不会自动清空
      //         setTimeout(function () {
      //           self.error = ''
      //         },1000)
      //       })
      //     }
      //   }))
      //
      // }


      register: function () {
        let self = this;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            console.log('正在调用/users/signup接口')
            self.$axios.post('/users/signup', {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            }).then(({
                       status,
                       data
                     }) => {
              if (status === 200) {
                console.log('能够调用到/users/signup接口')
                if (data && data.code === 0) {
                  location.href = '/login'
                } else {
                  self.error = data.msg
                }
              } else {
                self.error = `服务器出错，错误码:${status}`
              }
              setTimeout(function () {
                self.error = ''
              }, 2000)
            })
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/register/index.scss";
</style>


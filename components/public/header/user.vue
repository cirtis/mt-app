<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您,<span class="username">{{user}}</span>
      [
      <nuxt-link to="/exit">退出</nuxt-link>
      ]
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登录</nuxt-link>
      <nuxt-link class="register" to="/register">注册</nuxt-link>
    </template>

  </div>
</template>

<script type="module">
  export default {
    data() {
      return {
        user: ''
      }
    },
    //不用vuex的话，如何用异步的方式去获取user
    //用vue的生命周期：mounted
    async mounted() {//解构赋值的使用
      //axios.get的返回值
      const {status, data: {user}} = await this.$axios.get('/users/getUser')
      if (status === 200) {
        this.user = user
      }
    }
  }
</script>

<style scoped>

</style>

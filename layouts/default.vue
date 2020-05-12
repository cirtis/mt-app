<template>
  <el-container class="layout-default">
    <el-header height="197px">
<!--      修改elementui默认属性 height-->
<!--      css杀我！！。-->
      <my-header/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer height="100%">
      <my-footer/>
    </el-footer>
  </el-container>
</template>
<script type="module">
  import MyHeader from '@/components/public/header/index.vue'
  //@问题的解决方式！ webpack.conf.js文件！
  import MyFooter from '@/components/public/footer/index.vue'
  export default{
    components:{
      MyHeader,
      MyFooter
    }
  }
</script>

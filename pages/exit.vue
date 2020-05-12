<template>
  <div class=""/>
</template>

<script type="module">
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    //组件中中间件在什么时候执行的？？？
    let {status,data}=await ctx.$axios.get('/users/exit')
    if(status===200&&data&&data.code===0){
      window.location.href='/'
    }
  }
}
</script>

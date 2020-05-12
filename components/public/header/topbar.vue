<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="5">
      <geo/>
    </el-col>
    <el-col :span="5">
      <user/>
    </el-col>
    <el-col :span="14">
      <navi/>
    </el-col>
  </el-row>
</template>

<script type="module">
  import Geo from './geo.vue'
  import User from './user'
  import Navi from './nav'
  export default {
    components: {
      Geo,
      User,
      Navi
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import "@/assets/css/public/layout.scss";
</style>

<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select/>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hots/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>
</template>

<script type="module">
  import iSelect from '@/components/changeCity/iselect.vue'
  import hots from '@/components/changeCity/hot.vue'
  import Category from '@/components/changeCity/category.vue'

  export default {
    components: {
      iSelect,
      hots,
      Category
    }
  }
</script>

<style scoped>

</style>

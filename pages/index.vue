<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu/>
      </el-col>
      <el-col :span="19">
        <life/>
<!--        lefe 和下面的 artistic组件都不是自己手打的-->
      </el-col>
    </el-row>
    <el-row :span="24">
      <artistic/>
    </el-row>
  </div>
</template>

<script type="module">
import Emenu from '@/components/index/menu.vue'
import Artistic from "@/components/index/artistic.vue";
import Life from "@/components/index/life.vue"

export default {
  components: {
    Artistic,
    Emenu,
    Life
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>


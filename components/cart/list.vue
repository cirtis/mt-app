<template>
  <el-table
    :data="cartdata"
    style="width: 980px">
    <el-table-column
      label="项目"
      prop="name"
      width="532"/>
    <el-table-column
      label="单价"
      prop="price"
      width="132"/>
    <el-table-column
      label="数量"
      width="212">
      <template slot-scope="scope">
        <el-input-number
          v-model="scope.row.count"
          :min="0"/>
      </template>
    </el-table-column>
    <el-table-column
      label="总价">
      <template slot-scope="scope">
       <div class="">
<!--         实现和count的绑定-->
         {{scope.row.price*scope.row.count}}
       </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props:{
      cartdata:{
        type:Array,
        default:()=>{
          return []
        }
      }
    }
  }
</script>

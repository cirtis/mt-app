<template>
    <div class="m-menu">
      <dl class="nav" @mouseleave="mouseleave">
        <dt>全部分类</dt>
        <dd
          v-for="(item,idx) in $store.state.home.menu"
          :key="idx"
        @mouseenter="enter">
          <i :class="item.type"/>{{item.name}}<span class="arrow"/>
        </dd>
      </dl>
      <div
        class="detail"
        v-if="kind"
        @mouseenter="sover"
        @mouseleave="sout"
      >
        <template v-for="(item,idx) in curdetail.child">
          <h4 :key="idx">{{item.title}}</h4>
          <span
            v-for="v in item.child"
            :key="v">{{v}}</span>
        </template>
      </div>
    </div>
</template>

<script>
    export default {
      methods:{
        mouseleave:function () {
          let self=this
          self._timer=setTimeout(function(){
            self.kind=''
          },150)
        },
        enter:function (e) {
          this.kind=e.target.querySelector('i').className
        },
        //这两个函数非常精巧
        sover:function () {
          //右移光标也可以选中菜单
          clearTimeout(this._timer)
        },
        sout:function () {
          this.kind=''
        }
      },
        data(){
          return{
            kind:'',
            menu:[]
          // {
          //   type:'food',
          //     name:'美食',
          //   child:[{
          //   title:'美食',
          //   child:['代金券','甜点','饮品','自助餐','小吃快餐']
          // }]
          // },{
          //   type:'takeout',
          //     name:'外卖',
          //     child:[{
          //     title:'外卖',
          //     child:['小吃','主食']
          //   }]
          // },{
          //   type:'hotel',
          //     name:'酒店',
          //     child:[{
          //     title:'酒店',
          //     child:['经济型','舒适/三星级','豪华/四星级','尊贵/五星级']
          //   }]
          // }
          }
        },
      computed:{
          curdetail:function (){
            //此处必须如此写！！！
            return this.$store.state.home.menu.filter((item)=>item.type===this.kind)[0]
          }
      }
    }
</script>

<style scoped>

</style>

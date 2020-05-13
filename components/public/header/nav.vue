<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my">我的美团</nuxt-link>
<!--        用css来控制【我的美团】项在hover和点击后的样式-->
        <dl>
          <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
          <dd><nuxt-link to="/favor">我的收藏</nuxt-link></dd>
          <dd><nuxt-link to="/coupon">抵用券</nuxt-link></dd>
          <dd><nuxt-link to="/account">账户设置</nuxt-link></dd>
        </dl>
      </li>
      <li>
        <nuxt-link to="/phone">手机APP</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
          <dd><nuxt-link to="/userCenter">登录商家中心</nuxt-link></dd>
          <dd><nuxt-link to="coop">我想合作</nuxt-link></dd>
          <dd><nuxt-link to="wap">免费手机开店</nuxt-link></dd>
          <dd><nuxt-link to="receipt">商家申请开票</nuxt-link></dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
      <div class="subContainer">
        <dl class="hotel">
          <dt>酒店旅游</dt>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
          <dd>国际机票</dd>
        </dl>
        <dl class="food">
          <dt>吃美食</dt>
          <dd>烤鱼</dd>
          <dd>特色小吃</dd>
          <dd>烧烤</dd>
          <dd>啤酒</dd>
        </dl>
        <dl class="movie">
          <dt>最新电影</dt>
          <dd>喜剧</dd>
          <dd>恐怖片</dd>
          <dd>动作片</dd>
          <dd>剧情片</dd>
        </dl>
        <dl class="app">
          <dt>手机应用</dt>
          <dd>
            <a href="#">
              <img src="https://s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png"alt="">
            </a>
          </dd>
          <dd>
            <a href="#">
              <img src="https://s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png"alt="">
            </a>
          </dd>
          <dd>
            <a href="#">
              <img src="https://p0.meituan.net/travelcube/162c3308d9622f6d9cfaa49e60be4dca8573.png"alt="">
            </a>
          </dd>
          <dd>
            <a href="#">
              <img src="https://s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png"alt="">
            </a>
          </dd>
          <dd>
            <a href="#">
              <img src="https://s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"alt="">
            </a>
          </dd>
        </dl>
      </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang="scss">
  @import "~@/assets/css/public/header/topbar.scss";
</style>

<template>
  <div class="header">
    <div class="bg-photo"></div>
    <div class="bg-color"></div>
    <div class="content">
      <div class="headline">
        <div class="logo f-l">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="store-content f-l">
          <p class="title"><img src="static/images/brand.png"/>{{seller.name}}</p>
          <p class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟到达</p>
          <div class="online-pay">
            <div class="off f-l" v-if="seller.supports">{{seller.supports[0].description}}</div>
            <span class="num f-r" v-if="seller.supports" @click="showNotice">{{seller.supports.length}}个<i class="iconfont icon-jiantou"></i></span>
          </div>
        </div>
      </div>
      <div class="abstract" @click="showNotice">
        <img src="/static/images/bulletin.png"/>
        {{seller.bulletin}}
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <transition name="fade">
      <div class="notice-wrapper" v-if="show">
        <div class="notice-bg">
        </div>
        <div class="notice-content">
          <h1>{{seller.name}}</h1>
          <div class="rating">
            <v-star :starType="30" :score="seller.score"></v-star>
          </div>
          <div class="sale-title">
            <div class="line"><span></span></div>
            <div class="title">优惠信息</div>
            <div class="line"><span></span></div>
          </div>
          <div class="sale-details">
            <ul>
              <li v-for="(item ,index) in seller.supports" :key="index">
                <span class="icon f-l" :class="classMap[item.type]"></span><span class="text f-l">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <div class="sale-title">
            <div class="line"><span></span></div>
            <div class="title">商家公告</div>
            <div class="line"><span></span></div>
          </div>
          <p class="annoucement">{{seller.bulletin}}</p>
        </div>
        <div class="notice-close"><i class="iconfont icon-close" @click="closeNotice"></i></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from "@/pages/common/star"
  export default {
    name: 'Header',
    props:{
      seller:Object
    },
    data () {
      return {
        show:false
      }
    },
    computed:{
      classMap(){
        return ["decrease","discount","special","invoice","guarantee"]
      }
    },
    methods:{
      showNotice(){
        this.show=true;
      },
      closeNotice(){
        this.show=false;
      }
    },
    components :{
      "v-star":Star
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~styles/css/mixins.styl"
  .header
    position: relative
    width:100%
    height:8.4rem
    box-sizing:border-box
    hidden()
    .bg-photo
      background :url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg") no-repeat center
      background-size: cover
      height :100%
      width :100%
      -webkit-filter: blur(10px);
      -moz-filter: blur(10px);
      -o-filter: blur(10px);
      -ms-filter: blur(10px);
      filter: blur(10px);
    .bg-color
      position:absolute
      left :0
      top :0
      height :100%
      width :100%
      background-color :rgba(7,17,27,0.5)
      filter: blur(10px);
    .content
      position:absolute
      height:100%
      width :100%
      left :0
      top :0
      color:rgb(255,255,255)
      hidden()
      .headline
        padding :1.5rem 0rem 1.2rem 1.5rem
        hidden()
        .logo
          width :4rem
          height :4rem
          border-radius:0.125rem
          hidden()
          marginRight(1rem)
          img
            width :100%
        .store-content
          .title
            font-size:1rem
            marginRight(0.5rem)
            img
              width:2rem
              marginRight(0.375rem)
              marginBottom(0.5rem)
          .delivery
            font-size:0.75rem
            color:rgb(255,255,255)
            marginBottom(0.625rem)
          .online-pay
            font-size:0.625rem
            .num
              display :inline-block
              line-height:1.5rem
              width:2.5rem
              background-color :rgb(0,0,0,0.2)
              padding-left:0.5rem
              border-radius:0.8rem
              i
                float :right
                marginRight(0.4rem)
      .abstract
        position:absolute
        left:0
        bottom:0
        background-color :rgba(7,17,27,0.2)
        font-size:0.625rem
        height:1.75rem
        line-height:1.75rem
        width:100%
        box-sizing :border-box
        padding-right:1.5rem
        ellipsis()
        img
          width :1.6rem
          marginLeft(0.75rem)
          marginRight(0.25rem)
        i
          position :absolute
          right:0.3rem
          top:0
    .fade-enter-active,.fade-leave-active
      transition:all 1s
      background-color :rgba(7,17,27,0.8)
    .fade-enter,.fade-leave-to
      opacity:0
      background-color :rgba(7,17,27,0)
    .notice-wrapper
      position :fixed
      left:0
      top:0
      width: 100%
      height: 100%
      background-color :rgba(7,17,27,0.8)
      z-index:200
      overflow :auto
      .notice-bg
        position :absolute
        left :0
        top:0
        width: 100%
        height:100%
        filter:blur(10px)
      .notice-content
        min-height:100%
        color :rgb(255,255,255)
        padding :4rem 2.25rem 2rem 2.25rem
        box-sizing :border-box
        h1
          font-size :1rem
          text-align :center
          font-weight:700
          line-height:1rem
          marginBottom(1rem)
        .rating
          marginBottom(1rem)
        .sale-title
          display: flex
          marginBottom(1rem)
          .line
            flex:1
            span
              display :inline-block
              width: 100%
              border-bottom :2px solid rgba(255,255,255,0.2)
          .title
            font-size:0.875rem
            font-weight:700
            line-height :0.875rem
            marginLeft(0.75rem)
            marginRight(0.75rem)


        .sale-details
          marginLeft(0.75rem)
          marginBottom(1rem)
          ul
            li
              marginBottom(0.75rem)
              overflow :hidden
              .icon
                marginRight(0.375rem)
                display :inline-block
                width :0.75rem
                height :0.75rem
                background-repeat :no-repeat
                background-size :contain
                background-position :center
                &.decrease
                  background-image :url("./images/decrease.png")
                &.discount
                  background-image :url("./images/discount.png")
                &.guarantee
                  background-image :url("./images/guarantee.png")
                &.special
                  background-image :url("./images/special.png")
                &.invoice
                  background-image :url("./images/invoice.png")
              .text
                display :inline-block
                font-size:0.65rem
                font-weight :200
                line-height:0.75rem
        .annoucement
          marginLeft(0.75rem)
          marginRight(0.75rem)
          font-size:0.75rem
          font-weight:200
          line-height :1.5rem
      .notice-close
        text-align :center
        position :relative
        marginTop(-2rem)
        i
          font-size:2rem
          color:rgba(255,255,255,0.5)

</style>

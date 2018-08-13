<template>
  <div class="shop-cart">
    <div class="content-left">
      <div class="shop-cart-logo">
        <i class="iconfont icon-ziyuan" :class="{'actived':totalPrice>0}" @click="toggleShopCart"></i>
        <span class="shop-cart-num" v-if="totalPrice>0">{{totalCount}}</span>
      </div>
      <div class="shop-cart-price border-right f-l" :class="{'actived':totalPrice>0}">￥{{totalPrice}}</div>
      <div class="shop-cart-desc f-l">另需配送费￥4元</div>
    </div>
    <div class="content-right" :class="{'actived':delivery=='去结算'}">
      {{delivery}}
    </div>
   <transition name="slide">
     <div class="shop-cart-detail" v-show="fold">
       <div class="detail-title">
         <span class="detail-cart f-l">购物车</span>
         <span class="detail-clear f-r" @click="clearShopCart">清空</span>
       </div>
       <div class="detail-food-list" ref="detailFoodList">
         <ul>
           <li v-for="(food ,index) in selectFoods" :key="index" class="border-bottom">
             <div class="detail-content-left f-l">
               <span class="name f-l">{{food.name}}</span>
               <span class="price f-r">￥{{food.price}}</span>
             </div>
             <div class="detail-content-right f-r">
               <cart-control :food.sync="food"></cart-control>
             </div>
           </li>
         </ul>
       </div>
     </div>
   </transition>
    <transition name="out">
      <div v-show="fold" class="detail-mask" @click="hideShopCart"></div>
    </transition><!--遮罩层-->
    <div class="ball-container">
      <div v-for="(item ,index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="item.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapGetters} from "vuex"
  export default {
    name: "shopcart",
    props: {
      /*selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }*/
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],//存储下落的小球
        fold: false//购物车详情页一开始折叠起来
      }
    },
    computed: {
      ...mapGetters(["selectFoods"]),
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach(function (item) {
          total += item.price * item.num;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach(function (item) {
          count += item.num;
        });
        return count;
      },
      delivery() {
        var price = 20 - this.totalPrice;

        if (price <= 0) {
          return "去结算";
        } else if (price > 0 && price < 20) {
          return "还差￥" + price + "起送";
        } else {
          return "￥20元起送";
        }
      }
    },
    methods: {
      drop(el) {
        //console.log(el); //验证是否能正确输出
        //遍历balls，拿到第一个show为false的球，做一个动画
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //show为false的球
            ball.show = true; //小球下落
            var ball2 = document.querySelector(".ball");
            ball.el = el;//保留当前的DOM对象，用来计算位置
            this.dropBalls.push(ball); //dropBalls存的是已经下落的小球,后续要对已经下落的小球进行处理
            return;
          }
        }
      },
      //定义三个钩子函数实现动画
      beforeEnter(el) {
        //el为当前执行transition动画的DOM对象
        //先找到所有为true的小球（连续点击的情况）
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) { //这个是要运动的小球true
            let rect = ball.el.getBoundingClientRect();//获得元素相当于视口的位置
            let x = rect.left - 36;
            let y = -(window.innerHeight - rect.top - 45);
            el.style.display = ''; //v-show默认display：none，设置为空，让它显示
            //外层元素是纵向的动画，内层元素是横向的动画
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el) {
        /* 触发浏览器重绘，重绘之后才可以设置transform*/
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => { //样式重置
          el.style.webKitTransform = 'translate3d(0,0,0)';//没有变量时只能用单引，不能用反引
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();//删除并返回第一个ball
        if (ball) {
          ball.show = false; //重置ball.show的状态
          el.style.display = 'none';
        }
      },
      clearShopCart() {
        //清空购物车
        this.selectFoods.forEach(function (food) {
          food.num = 0;
        });
        this.fold = false;
      },
      toggleShopCart() {
        if(this.selectFoods.length==0){
          return ;
        }
        this.fold = !this.fold;
        if(this.fold){
          this.$nextTick(()=>{
             if(!this.scroll){
               this.scroll = new BScroll(this.$refs.detailFoodList,{
                click:true
               });
             }else {
              this.scroll.refresh();
             }
          })
        }
      },
      hideShopCart(){
        this.fold=false;
      }
    },
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/css/mixins.styl"
  .shop-cart
    height: 3rem
    boxSizing()
    width: 100%
    position: fixed
    left: 0
    bottom: 0
    display: flex
    line-height: 3rem
    color: rgba(255, 255, 255, 0.4)
    z-index:20
    .content-left
      flex: 1
      background-color: #141d27
      padding: 0.6rem
      line-height: 1.7rem
      .shop-cart-logo
        /*margin :0 1.2rem*/
        position: absolute
        left: .8rem
        top: -.6rem
        width: 3rem
        height: 3rem
        border-radius: 3rem
        background-color: #141d27
        text-align: center
        z-index: 200
        i
          display: inline-block
          width: 2.5rem
          height: 2.5rem
          text-align: center
          line-height: 2.5rem
          border-radius: 2.5rem
          background-color: #2B333B
          marginTop(0.2rem)
          &.actived
            background-color: #008ADE
            color: #ffffff
        .shop-cart-num
          display: inline-block
          position: absolute
          right: 0
          top: -.2rem
          width: 1.5rem
          line-height: .9rem
          border-radius: .5rem
          background-color: #F01414
          font-size: .3rem
          color: #ffffff
      .shop-cart-price
        marginLeft(3.5rem)
        font-size: .8rem
        paddingRight(.5rem)
        width: 2.5rem
        &.actived
          color: #ffffff
      .shop-cart-desc
        text-indent: .5rem
        font-size: .8rem
    .content-right
      width: 5.5rem
      line-height: 3rem
      text-align: center
      font-size: .8rem
      background-color: #2B333B
      &.actived
        color: #ffffff
        background-color: #048A40
    .shop-cart-detail
      position: fixed
      bottom: 3rem
      left: 0
      width: 100%
      color: rgb(7, 17, 27)
      background-color: #ffffff
      box-sizing: border-box
      z-index:20
      .detail-title
        overflow: hidden
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .detail-cart
          font-size: 0.875rem
          margin-left: 1.125rem
        .detail-clear
          font-size: 0.8rem
          color: rgb(0, 160, 220)
          margin-right: 1.125rem
      .detail-food-list
        padding: 0 1.125rem
        box-sizing: border-box
        max-height: 12rem
        overflow hidden
        li
          overflow: hidden
          height: 3rem
          .detail-content-left
            line-height: 3rem
            width: 12.5rem
            .name
              color: rgb(7, 17, 27)
              font-size: 0.875rem
              font-weight: 700
            .price
              color: rgb(240, 20, 20)
              font-size: 0.7rem
              font-weight: 700
          .detail-content-right
            overflow hidden
            margin-top: .7rem
        .border-bottom
          &:before
            border-color: rgba(7, 17, 27, 0.5)
        .border-bottom:last-child
          &:before
            border: none
    .slide-enter-active,.slide-leave-active
      transition:all 3s
    .slide-enter,.slide-leave-to
      opacity:0
    .out-enter-active,.out-leave-active
      transition:opacity 3s
    .out-enter,.out-leave-to
      opacity :0
    .detail-mask
      position: fixed
      left: 0
      top: 0
      height :100%
      width: 100%
      bottom: 17rem
      background-color: rgba(7, 17, 27, 0.6)
      z-index :-1
    .ball-container
      .ball
        position: fixed
        left: 2rem
        bottom: 1.7rem
        z-index: 200
        transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          height: 0.8rem
          width: .8rem
          border-radius: 50%
          background-color: #00A0DC
          transition: all 0.4s linear
</style>

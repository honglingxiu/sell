<template>
  <transition name="move">
    <div class="food-detail" ref="foodDetail">
      <div class="content">
        <div class="detail-food">
          <img :src="food.image" alt="">
          <div class="food-info">
            <h1>{{food.name}}</h1>
            <p class="sales"><span>月售{{food.sellCount}}份</span>好评率{{food.rating}}</p>
            <div class="detail">
              ￥<span class="price">{{food.price}}</span>
              <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              <span class="add-cart f-r" v-show="!food.num||food.num==0" @click="addToCart">加入购物车</span>
              <div class="food-control f-r" v-show="food.num>0">
                <cart-control :food.sync="food" @cart-add="cartAdd"></cart-control>
              </div><!--加减号-->
            </div>
          </div>
          <i class="iconfont icon-fanhui" @click="goBack"></i>
        </div>
        <sell-space></sell-space>
        <div>
          <div class="detail-ratings">
            <h1>商品评价</h1>
            <div class="rating-select">
              <rating-select :ratings="food.ratings" :desc="desc" :onlyContent="onlyContent"
                             @changeSelectType="changeSelectType" :selectType="selectType"
                             @toggleOnlyContent="toggleOnlyContent"></rating-select>
            </div>
          </div>
          <div class="rating-list">
            <ul>
              <div v-show="ratingList.length==0">暂无数据</div>
              <li v-for="(item ,index) in ratingList" class="border-bottom">
                <div class="related-info">
                  <span class="time">{{item.rateTime|formatDate}}</span>
                  <img class="avatar f-r" :src="item.avatar"/>
                  <span class="username f-r">{{item.username}}</span>
                </div>
                <div class="content" v-if="item.text"><i class="iconfont" :class="{'icon-dianzan_active':item.rateType==0,'active':item.rateType==0,'icon-zan1':item.rateType==1}"></i>{{item.text}}</div>
                <div class="content" v-if="!item.text"><i class="iconfont icon-dianzan_active active"></i>暂无评论信息</div>
              </li>
            </ul>
          </div>
        </div>
        <sell-space></sell-space>
        <div class="detail-desc" v-if="food.info">
          <h1>商品介绍</h1>
          <p>{{food.info}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  /*import axios from "axios"*/
  import BScroll from 'better-scroll'
  import {mapActions} from "vuex"
  import {formatDate} from "@/assets/js/utils"
  import Vue from "vue"

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    name: "FoodDetail",
    data() {
      return {
        desc: {
          positive: "推荐",
          all: "全部",
          negative: "吐槽"
        },
        onlyContent: false,
        selectType: ALL
      }
    },
    props: {
      food: Object
    },
    computed: {
      ratingList() {
        var ratingArr = [];
        if(this.onlyContent){//只看有内容的
          if (this.selectType == POSITIVE) {
            this.food.ratings.forEach((item) => {
              if (item.rateType == POSITIVE&&item.text) {
                ratingArr.push(item);
              }
            });
          } else if (this.selectType == NEGATIVE) {
            this.food.ratings.forEach((item) => {
              if (item.rateType == NEGATIVE&&item.text) {
                ratingArr.push(item);
              }
            });
          } else {//就是全部的
            this.food.ratings.forEach((item) => {
              if (item.text) {
                ratingArr.push(item);
              }
            });
          }
        }else {
          if (this.selectType == POSITIVE) {
            this.food.ratings.forEach((item) => {
              if (item.rateType == POSITIVE) {
                ratingArr.push(item);
              }
            });
          } else if (this.selectType == NEGATIVE) {
            this.food.ratings.forEach((item) => {
              if (item.rateType == NEGATIVE) {
                ratingArr.push(item);
              }
            });
          } else {//就是全部的
            ratingArr = this.food.ratings;
          }
        }
        return ratingArr;
      }
    },
    methods: {
      goBack() {
        this.$emit("goBack");
      },
      cartAdd(event) {
        //第一次加入购物车
        this.$emit('cartAdd', event);//加入购物车派发事件
      },
      addToCart() {
        this.$emit('cartAdd', event);//加入购物车派发事件
        Vue.set(this.food, 'num', 1);
        this.changeCart(this.food);//vuex处理
      },
      ...mapActions(['changeCart']),
      changeSelectType(selectType) {
        //处理评价菜单选项
        this.selectType = selectType;
        this.$nextTick(()=>{
          this.scroll.refresh();//需要重新计算高度
        });
      },
      toggleOnlyContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(()=>{
          this.scroll.refresh();//需要重新计算高度
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
      /*  if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          });
          this.scroll.refresh();
        } else {
          this.scroll.refresh();
        }
      });*/
      setTimeout(()=>{
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          });
          this.scroll.refresh();
        } else {
          this.scroll.refresh();
        }
      });
      },1000);
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,"yyyy-MM-dd hh:mm");
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/css/mixins.styl"
  .move-enter-active, .move-leave-active
    transition all .5s

  .move-enter, .move-leave-to
    transform translate3d(100%, 0, 0)

  .food-detail
    position fixed
    left 0
    top 0
    width 100%
    bottom 3rem
    box-sizing border-box
    overflow hidden
    background-color #ffffff
    .detail-food
      img
        width 100%
      .food-info
        padding 1.125rem
        boxSizing()
        h1
          font-weight 700
          font-size .9rem
          marginBottom(.5rem)
        .sales
          font-size .625rem
          color rgb(147, 153, 159)
          marginBottom(1rem)
          span:first-child
            marginRight(.75rem)
        .detail
          overflow hidden
          color rgb(240, 20, 20)
          .price
            font-size .8rem
            font-weight 700
            marginRight(.5rem)
          .old-price
            font-size .6rem
            text-decoration line-through
            color rgb(147, 153, 159)
          .add-cart
            background-color rgb(0, 160, 220)
            color #ffffff
            border-radius .75rem
            font-size .8rem
            width 4.8rem
            text-align center
            line-height 1.5rem
      i
        color #ffffff
        position fixed
        left 0
        top 0
        font-size 1rem
        display inline-block
        width 2rem
        height 2rem
        line-height 2rem
        text-align center
        border-radius 50%
        background-color #333333
    .detail-desc
      padding 1.125rem
      boxSizing()
      h1
        font-weight 700
        font-size .9rem
        marginBottom(.4rem)
      p
        boxSizing()
        padding 0 .5rem
        color rgb(77, 85, 93)
        line-height 1.4rem
        font-size .75rem
    .detail-ratings
      padding 1.125rem 1.125rem 0 1.125rem
      border-bottom: 1px solid #E6E7E8
      h1
        font-weight 700
        font-size .9rem
        marginBottom(.4rem)
    .rating-list
      padding 0 1.125rem 0 1.125rem
      li
        margin 1rem 0
        color rgb(147,153,159)
        .related-info
          margin-bottom .375rem
          font-size .625rem
          img
            margin-left .375rem
            width 1rem
            height 1rem
            border-radius 50%
        .content
          font-size .75rem
          color rgb(7,17,27)
          line-height 1rem
          font-weight 700
          i
            margin-right .25rem
            color rgb(147,153,159)
            &.active
              color rgb(0,160,220)


</style>

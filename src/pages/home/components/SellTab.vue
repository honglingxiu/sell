<template>
  <div class="tab">
    <ul class="border-bottom" v-bind:class="{'tab-attach':show}">
      <!--<router-link to="/goods" class="router-link-active" tag="li">商品</router-link>
      <router-link to="/ratings" tag="li">评价</router-link>
      <router-link to="/seller" tag="li">商家</router-link>-->
      <li :class="{'router-link-active':routerLink==1}" @click="changeTab(1)">商品</li>
      <li :class="{'router-link-active':routerLink==2}" @click="changeTab(2)">评价</li>
      <li :class="{'router-link-active':routerLink==3}" @click="changeTab(3)">商家</li>
    </ul>
    <div v-if="routerLink==1">
      <sell-goods :goods="sellFoods" @cart-add="cartAdd"></sell-goods>
      <!--<sell-comments></sell-comments>
      <sell-seller></sell-seller>-->
    </div>
    <div v-if="routerLink==2">
      <rating-detail :seller="seller" :ratings="ratings"></rating-detail>
    </div>
    <div v-if="routerLink==3">
      <sell-seller :seller="seller"></sell-seller>
    </div>
    <shop-cart ref="shopCart"></shop-cart>
  </div>
</template>

<script>
  import SellGoods from "./SellGoods"
  import SellComments from "./SellComments"
  import SellSeller from "./SellSeller"
  import ShopCart from "./ShopCart"
  import RatingDetail from "./RatingDetail"
  import {mapGetters} from "vuex"
  import  Vue from  "vue"

  export default {
    name: 'Tab',
    props: {
      tab: Object,
      seller:Object,
      ratings:Array
    },
    data() {
      return {
        show: false,
        routerLink:1//目前展示哪个tab
      }
    },
    computed: {
      ...mapGetters(["selectFoods"]),
      sellFoods() {
        var foodsArr = [];
        if (this.tab.goods.length > 0) {
          foodsArr=this.tab.goods;
          foodsArr.forEach((item) => {
            item.foods.forEach((food) => {
              for (var i = 0; i < this.selectFoods.length; i++) {
                if (food.name == this.selectFoods[i].name) {
                  Vue.set(food, 'num', this.selectFoods[i].num);
                  break;
                }
              }
            });
          });
        }
        return foodsArr;
      }
    },
    methods: {
      handleScroll() {
        var header = document.querySelector(".header");
        var height = header.offsetHeight;
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolltop >= height) {
          this.show = true;
        } else {
          this.show = false;
        }
      },
      cartAdd(target) {
        this.$nextTick(() => { //回调函数异步执行，两个动画效果就不会卡顿了
          this.$refs.shopCart.drop(target);
        });
      },
      showFoodDetail(food) {
        this.food = food;
      },
      changeTab(routerLink){//切换tab
        this.routerLink=routerLink;
      }
    },
    components: {
      SellGoods,
      SellComments,
      SellSeller,
      ShopCart,
      RatingDetail
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~styles/css/mixins.styl"
  .tab
    ul
      line-height: 2.5rem
      display: flex
      overflow: hidden
      font-size: 0.875rem
      box-sizing: border-box
    .border-bottom
      &:before
        border-color: rgba(7, 17, 27, 0.1)
      li
        float: left
        flex: 1
        text-align: center
        &.router-link-active
          color: rgb(240, 20, 20)
    .tab-attach
      background-color: rgba(7, 17, 27, 0.8)
      color: #ffffff
      z-index: 50
      width: 100%
      position: fixed
      left: 0
      top: 0
</style>

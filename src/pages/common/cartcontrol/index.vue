<template>
  <div class="cart-control">
    <transition name="fade">
      <div class="cart-icon cart-minus iconfont icon-jiansvg f-l" v-show="food.num>0"
           @click="addCart($event,'minus')"></div>
    </transition>
    <div class="cart-num f-l" v-show="food.num>0">{{food.num}}</div>
    <div class="cart-icon cart-add iconfont icon-jia f-l" @click.stop="addCart($event,'add')"></div>
  </div>
</template>

<script>
  import Vue from "vue"
  import {mapGetters,mapActions} from "vuex"

  export default {
    name: "cart-control",
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {}
    },
    computed:{
      ...mapGetters(["selectFoods"])
    },
    methods: {
      addCart(event, flag) {
        if (!this.food.num) {
          this.$emit('cart-add', event);//加入购物车派发事件
          Vue.set(this.food, 'num', 1);
          //foodsArr.push(this.food);//第一次加入购物车
          this.changeCart(this.food);
        } else {
          if (flag == 'add') {
            this.food.num++;
            this.$emit('cart-add', event);
          } else {
            this.food.num--;
          }
          this.changeCart(this.food);
        }
      },
      ...mapActions(['changeCart'])
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/css/mixins.styl"
  .fade-enter-active, .fade-leave-active
    transition: all .5s
    transform: translate3d(0, 0, 0) rotate(0)

  .fade-enter, .fade-leave-to
    opacity: 0
    transform: translate3d(1.125rem, 0, 0) rotate(180deg)

  .cart-icon
    round(1.2rem)
    text-align: center
    font-size: .8rem
    font-weight: 700
    background-color: #00A0DC
    color: #ffffff

  .cart-num
    margin: 0 .6rem
    line-height: 1.2rem
</style>

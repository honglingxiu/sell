<template>
  <div class="goods">
    <div class="hot-sales" ref="hotSales">
      <ul class="content">
        <li class="border-bottom content-hook" @click="scrollToElement($event,index)"  v-for="(item,index ) in goods" :key="index" :class="{'active':selectedIndex===index}"><span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span><span class="text">{{item.name}}</span></li>
      </ul>
    </div>
    <div class="menu" ref="menu">
      <ul class="menu-goods  content" ref="menuGoods">
        <li v-for="(item,index ) in goods" :key="index" class="food-list-hook">
          <h1>{{item.name}}</h1>
          <ul class="food-list">
            <li v-for="(food,key ) in item.foods" :key="key" class="border-bottom" @click="showFoodDetail(food)">
              <div class="food-wrap">
                <div class="img"><img :src="food.icon" alt=""></div>
                <div class="food-title">
                  <h3>{{food.name}}</h3>
                  <p class="desc" v-if="food.description">{{food.description}}</p>
                  <p class="sale-status"><span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span></p>
                  <div class="food-price">
                    ￥<span class="price">{{food.price}}</span>
                    <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
                <div class="food-control">
                  <cart-control :food.sync="food" @cart-add="cartAdd"></cart-control>
                </div><!--加减号-->
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--商品详情页-->
    <food-detail :food="selectFood" v-if="foodDetailFlag" @goBack="goBack" @cartAdd="cartAdd"></food-detail>
  </div>
</template>

<script>
import Bscroll from "better-scroll"
import FoodDetail from "./FoodDeail"
import {urlParse} from "@/assets/js/utils"
  export default {
    name: 'SellGoods',
    data () {
      return {
        listHeight:[],//计算food每个区域的高度
        scrollY:0,//右侧滑动的y轴距离
        foodList:[],//food-list-hook的个数
        liHeight:0,//左边li的高度
        hotSalesHeight:0,//滑动区域的总体高度
        selectedIndex:0,
        selectFood:"",//选中的商品
        foodDetailFlag:false
      }
    },
    props:{
      goods:Array
    },
    computed:{
      classMap(){
        return ["decrease","discount","special","invoice","guarantee"]
      }
    },
    methods:{
      calculateHeight(){
        let height=0;
        this.listHeight.push(height);
        for(let i=0;i<this.foodList.length;i++){
          height+=this.foodList[i].offsetHeight;
          this.listHeight.push(height);
        }
      },
      scrollToElement(event,index){
        if(!event._constructed){
          return ;
        }
        //this.scrollY=this.listHeight[index];
        this.scroll2.off("scroll");
        this.selectedIndex=index;
        //this.scroll2.scrollToElement(this.foodList[index],1000);
        var promise2 = new Promise((resolve, reject)=> {//下次看下promise的用法，关于滑动结束后重新绑定scroll事件
          // 2秒后置为接收状态
          this.scroll2.scrollToElement(this.foodList[index],1000);
        });
        promise2
          .then(()=> {
            this.scroll2.on("scroll",(pos)=>{
              this.scroll(pos);
            });
          })
        /*this.scroll2.on("scroll",(pos)=>{
          this.scroll(pos);
        });*/
      },
      scroll(pos){
        this.scrollY=Math.abs(Math.round(pos.y));
        for(var i=0;i<this.listHeight.length;i++){
          if(this.scrollY>=this.listHeight[i]&&this.scrollY<this.listHeight[i+1]){
            break;
          }
        }
        this.selectedIndex=i;
        var num=Math.floor(this.hotSalesHeight/this.liHeight);
        var tempHeight=this.selectedIndex*this.liHeight;
        var height=num*this.liHeight;
        if(tempHeight>=height){
          this.scroll1.scrollTo(0,-(this.selectedIndex+1)*this.liHeight+this.hotSalesHeight);
        }else {
          this.scroll1.scrollTo(0,0);
        }
      },
      cartAdd(event){
        this.$emit('cart-add', event.target);
      },
      showFoodDetail(food){
        //this.$router.push(`detail/${key}`);
        this.selectFood=food;
        this.foodDetailFlag=true;
      },
      goBack(){
        this.foodDetailFlag=false;
      }
    }
    ,
    mounted(){
      this.$nextTick(() => {
        this.scroll1 = new Bscroll(this.$refs.hotSales,{
          click:true
        });
        this.scroll2 = new Bscroll(this.$refs.menu,{
          click:true,
          probeType:3
        });
        this.scroll2.on("scroll",(pos)=>{
          this.scroll(pos);
        });
        this.foodList=this.$refs.menuGoods.getElementsByClassName("food-list-hook");
      });
      urlParse();
    },
    watch:{
      goods(){
        this.$nextTick(()=>{
          this.calculateHeight();
          this.hotSalesHeight=this.$refs.hotSales.offsetHeight;
          this.liHeight=this.$refs.hotSales.getElementsByClassName("content-hook")[0].offsetHeight;
        })
      }
    },
    components:{
      FoodDetail
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~styles/css/mixins.styl"
  .goods
    display :flex
    position :absolute
    left:0
    top:10.9rem
    bottom :3rem
    overflow :hidden
    box-sizing: border-box
    .hot-sales
      width:5rem
      padding-left :0.75rem
      padding-right:0.75rem
      background-color :#f3f5f7
      box-sizing :border-box
      ul
        li
          height:3.375rem
          font-size:0.75rem
          width:3.5rem
          box-sizing :border-box
          display :table
          .text
            display:table-cell
            vertical-align:middle
            text-align :center
          .icon
            display:table-cell
            vertical-align:middle
            text-align :center
            width :0.75rem
            height :0.75rem
            background-repeat :no-repeat
            background-size :contain
            background-position :center
            &.decrease
              background-image :url("./icons/decrease.png")
            &.discount
              background-image :url("./icons/discount.png")
            &.guarantee
              background-image :url("./icons/guarantee.png")
            &.special
              background-image :url("./icons/special.png")
            &.invoice
              background-image :url("./icons/invoice.png")
          &.active
            font-weight :700

        .border-bottom
          &:before
            border-color:rgba(7,17,27,0.1)
    .menu
      flex:1
      .menu-goods
        h1
          font-size:0.75rem
          line-height:1.625rem
          color:rgb(147,153,159)
          background-color :#f3f5f7
        .food-list
          padding :0 1.125rem
          li
            paddingTop(1.125rem)
            paddingBottom(1.125rem)
          .border-bottom
            &:before
              border-color:rgba(7,17,27,0.1)
              /*border-color:red*/
          .border-bottom:last-child
            &:before
              border:none
          .food-wrap
            display :flex
            position :relative
            .img
              height :2.9rem
              marginRight(0.625rem)
              img
                height :100%
            .food-title
              flex:1
              h3
                font-size:0.8rem
                line-height :0.8rem
                color:rgb(7,17,27)
                font-weight :700
              .desc
                font-size:0.6rem
                line-height :0.6rem
                color:rgb(147,153,159)
                marginTop(0.5rem)
              .sale-status
                font-size:0.6rem
                line-height :0.6rem
                color:rgb(147,153,159)
                marginTop(0.5rem)
              .food-price
                color:red
                font-size:0.5rem
                marginTop(0.5rem)
                .price
                  font-size:0.875rem
                  color:red
                  font-weight :700
                .old-price
                  text-decoration :line-through
                  color:rgb(147,153,159)
                  marginLeft(0.5rem)
                  font-size:0.625rem
            .food-control
              position :absolute
              right:0
              bottom:0

</style>

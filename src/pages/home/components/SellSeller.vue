<template>
  <div class="sell-seller" ref="sellSeller" v-if="seller">
    <div class="content">
      <div class="main-total">
        <div class="main-total-top border-bottom">
          <div class="title f-l">
            <h1>{{seller.name}}</h1>
            <div class="star">
              <sell-star :starType="20" :score="seller.score"></sell-star>
            </div>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect f-r">
            <i class="iconfont icon-xin1-copy active"></i>
            <br/>
            <span>已收藏</span>
          </div>
        </div>
        <div class="main-total-bottom">
          <div class="common min-price">
            <p>起送价</p>
            <span>{{seller.minPrice}}</span>元
          </div>
          <div class="common delivery-rice">
            <p>商家配送</p>
            <span>{{seller.deliveryPrice}}</span>元
          </div>
          <div class="common delivery-time">
            <p>平均配送时间</p>
            <span>{{seller.deliveryTime}}</span>分钟
          </div>
        </div>
      </div>
      <sell-space></sell-space>
      <div class="sell-bulletin">
        <h1>公告与活动</h1>
        <p>{{seller.bulletin}}</p>
        <ul>
          <li v-for="(item,index) in seller.supports" :key="index" class="border-top">
            <span class="icon" :class="classMap[item.type]">index</span>
            <span class="desc">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <sell-space></sell-space>
      <div class="sell-pics">
        <h1>商家实景</h1>
        <div class="pics" ref="sellerPics">
          <div class="content" ref="contentHook">
            <img class="img-hook" v-for="(item,index) in seller.pics" :src="item" alt="">
          </div>
        </div>
      </div>
      <sell-space></sell-space>
      <div class="sell-infos">
        <h1>商家信息</h1>
        <ul>
          <li v-for="(item,index) in seller.infos" :key="index" class="border-top">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'SellSeller',
    props:{
      seller:Object
    },
    computed:{
      classMap(){
        return ["decrease","discount","special","invoice","guarantee"]
      }
    },
    data () {
      return {}
    },
    methods:{
      initImgScroll(){
        if(this.seller.pics){
          var imgArr=document.getElementsByClassName("img-hook");
          var img=imgArr[0];
          var width=document.querySelector(".img-hook").offsetWidth;
          var marginRight=window.getComputedStyle(img).getPropertyValue("margin-right");
          marginRight=parseInt(marginRight.substring(0,marginRight.length-2));
          this.$refs.contentHook.style.width=(width+marginRight)*imgArr.length+"px";
          if (!this.imgScroll) {
            this.imgScroll = new BScroll(this.$refs.sellerPics, {
              scrollX: true
            });
            this.imgScroll.refresh();
          } else {
            this.imgScroll.refresh();
          }
        }
      }
    },
    mounted(){
     /* setTimeout(()=>{
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellSeller, {
            click: true
          });
          this.scroll.refresh();
        } else {
          this.scroll.refresh();
        }
      },1000);*/
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellSeller, {
          click: true
        });
        this.scroll.refresh();
      } else {
        this.scroll.refresh();
      }
      this.initImgScroll();
  },
  watch:{
    seller(){
      this.$nextTick(()=>{
        this.initImgScroll();
      });
    }
  }
  }
</script>
<style lang="stylus" scoped>
.sell-seller
  position absolute
  left 0
  top 10.9rem
  bottom 3rem
  overflow hidden
  width 100%
  box-sizing border-box
  .main-total
    padding 1.125rem
    .main-total-top
      padding-bottom 1.125rem
      overflow hidden
      color rgb(77,85,93)
      &:before
        border-color rgba(7,17,27,.5)
      .title
        h1
          font-weight 700
          font-size .875rem
          line-height .875rem
          margin-bottom .5rem
        .star
          display inline-block
          margin-right .3rem
        .rating-count
          font-size .625rem
          margin-right .5rem
      .collect
        text-align center
        i
          display inline-block
          font-size 1.5rem
          padding-bottom .2rem
          &.active
           color rgb(240,20,20)
        span
          font-size .625rem
          line-height .625rem
          color rgb(77,85,93)
    .main-total-bottom
      display flex
      .common
        flex 1
        padding-top 1.125rem
        text-align center
        font-size .8rem
        p
          color rgb(147,153,159)
          margin-bottom .5rem
          font-size .7rem
        span
          font-size 1.5rem

  .sell-bulletin
    padding 1.125rem 1.125rem 0 1.125rem
    h1
     font-weight 700
     font-size .875rem
     margin-bottom .5rem
    p
      margin 0 .75rem .8rem .75rem
      color rgb(240,20,20)
      font-weight 500
      font-size .75rem
      line-height 1.5rem
    ul
      li
        font-size 0
        padding .625rem 0
        &:before
          border-color rgba(7,17,27,.5)
        span
          font-size .75rem
          display inline-block
          line-height 1rem
        .icon
          width 1rem
          height 1rem
          margin-right .375rem
          text-indent  -9999px
          background-repeat no-repeat
          background-size contain
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
        .desc
          display inline-block
          font-size .75rem
          color rgb(7,17,27)
  .sell-pics
    padding 1.125rem
    h1
      font-size .875rem
      font-weight 700
      margin-bottom .75rem
    .pics
      width 100%
      overflow hidden
      height 5.6rem
      white-space nowrap
      .content
        height 100%
        img
          width 7.5rem
          height 100%
          margin-right .375rem
  .sell-infos
    padding 1.125rem
    h1
     font-weight 700
     font-size .875rem
     margin-bottom .5rem
    ul
      li
        padding 1.125rem .75rem
        font-size .75rem
        line-height 1rem
        color rgb(7,17,27)
        &:before
          border-color rgba(7,17,27,.5)
</style>

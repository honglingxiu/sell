<template>
  <div>
    <div class="star" :class="starClass">
      <span class="icon" v-for="(item,index) in starArr" :key="index" :class="item"></span>
    </div>
  </div>
</template>

<!--用法：<sell-star :starType="20" :score="seller.score"></sell-star>
starType:20 30 45 60
-->
<script>
  const STAR_LEN=5;

  export default {
    name: 'sell-star',
    props:{
      starType:Number,//控制图标大小的
      score:Number //评分
    },
    computed:{
      starClass(){
        return "star-"+this.starType
      },
      onLenth(){
        //满星的数量
        return Math.floor(this.score);
      },
      offFlag(){
        //是否有半颗星，有则返回true
        return this.score%1===0 ? false : true ;
      },
      starArr(){
        var result=[];
        var count=0;
        for(var i=0;i<this.onLenth;i++){
          result.push("on");
          count++;
        }
        if(this.offFlag){
          result.push("half");
          count++;
        }
        while(count<STAR_LEN){
          result.push("off");
          count++;
        }
        return result
      }
    },
    data () {
      return {}
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~styles/css/mixins.styl"
.star
  text-align :center
  .icon
    display :inline-block
    background-size :contain
    background-repeat :no-repeat
    background-position :center
    marginRight(.5rem)
&.star-20
  span
    width :0.625rem
    height :0.6rem
    &.on
      background-image :url("./images/star20_on.png")
    &.half
      background-image :url("./images/star20_half.png")
    &.off
      background-image :url("./images/star20_off.png")
&.star-30
  span
    width :0.9375rem
    height :0.91rem
    &.on
      background-image :url("./images/star30_on.png")
    &.half
      background-image :url("./images/star30_half.png")
    &.off
      background-image :url("./images/star30_off.png")
&.star-45
  span
    width :1.4rem
    height :1.375rem
    &.on
      background-image :url("./images/star45_on.png")
    &.half
      background-image :url("./images/star45_half.png")
    &.off
      background-image :url("./images/star45_off.png")
&.star-60
  span
    width :1.875rem
    height :1.78rem
    &.on
      background-image :url("./images/star60_on.png")
    &.half
      background-image :url("./images/star60_half.png")
    &.off
      background-image :url("./images/star60_off.png")
</style>

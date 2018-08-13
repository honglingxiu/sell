<template>
<div class="rating">
  <div class="tag">
    <span class="all" :class="{active:selectType==2}" @click="select(2,$event)">{{desc.all}}<i>{{ratings.length}}</i></span>
    <span class="positive" :class="{active:selectType==0}" @click="select(0,$event)">{{desc.positive}}<i>{{comments.positives}}</i></span>
    <span class="negative" :class="{active:selectType==1}" @click="select(1,$event)">{{desc.negative}}<i>{{comments.negatives}}</i></span>
  </div>
  <div class="only-content border-bottom">
    <i class="iconfont icon-dagou" :class="{active:onlyContent}" @click="toggleOnlyContent"></i>
    只看有内容的评价
  </div>
</div>
</template>
<!--用法：
<rating-select :ratings="food.ratings" :desc="desc" :onlyContent="onlyContent"
                            :selectType="selectType" @changeSelectType="changeSelectType"
                             @toggleOnlyContent="toggleOnlyContent"></rating-select>
  需传入的数据
  ratings:根据传入的数据统计好评和差评的数量
  desc:传入的tab组名称
  onlyContent:只有内容的评价标签
  selectType:展示对应的评论
  const POSITIVE=0;//好评
  const NEGATIVE=1;//差评
  const ALL=2;//所有
  需要监听事件
   changeSelectType(selectType) {
        //处理评价菜单选项
        this.selectType = selectType;
        this.$nextTick(()=>{
          this.scroll.refresh();//需要重新计算高度
        });
      }
    toggleOnlyContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(()=>{
          this.scroll.refresh();//需要重新计算高度
        });
      }


-->
<script>
  const POSITIVE=0;
  const NEGATIVE=1;
  const ALL=2;
  export default {
    name: "rating-select",
    props:{
      ratings:{
        type:Array,
        default(){
          return [];
        }
      },
      selectType:{
        type:Number,
        default :ALL
      },
      onlyContent:{//只展示有内容的评价
        type:Boolean,
        default:false
      },
      desc:{
        type :Object,
        default(){
          return {
            positive:"满意",
            all:"全部",
            negative:"不满意"
          }
        }
      }
    },
    methods:{
      select(selectType,event){
        this.$emit("changeSelectType",selectType);
      },
      toggleOnlyContent(){
        this.$emit("toggleOnlyContent");
      }
    },
    computed:{
      comments(){
        var positives=0;
        var negatives=0;
        this.ratings.forEach((item)=>{
          if(item.rateType==POSITIVE){
            positives++;
          }else if(item.rateType==NEGATIVE){
            negatives++;
          }
        });
        return {
          positives : positives,
          negatives : negatives
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
.rating
  .tag
    box-sizing border-box
    padding .75rem 0 1.125rem
    span
      display inline-block
      padding .5rem .75rem
      font-size .75rem
      line-height .5rem
      font-weight 700
      margin-right .5rem
      text-align center
      color rgb(77,85,93)
      width 4.5rem
      box-sizing border-box
      i
        font-size .375rem
        margin-left .1rem
      &.all
        background-color rgba(0,160,220,0.2)
        &.active
          background-color rgba(0,160,220,1)
          color #ffffff
      &.positive
        background-color rgba(0,0,220,0.2)
        &.active
          background-color rgba(0,0,220,0.7)
          color #ffffff
      &.negative
        background-color rgba(77,85,93,0.2)
        &.active
          background-color rgba(77,85,93,1)
          color #ffffff
  .border-bottom
    &:before
      border-color rgba(7,17,27,0.2)
  .only-content
    color rgb(147,153,159)
    line-height 1.5rem
    font-size .75rem
    margin .75rem 0 .75rem
    border-bottom: 1px solid rgba(7,17,27,.3)
    padding-bottom 1rem
    i
      display inline-block
      margin-right .25rem
      width 1.4rem
      height 1.4rem
      border-radius 50%
      background-color rgb(147,153,159)
      color #ffffff
      text-align center
      &.active
        background-color #039752
</style>

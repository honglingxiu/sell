<template>
  <div class="rating-wrapper" ref="ratingWrapper">
    <div>
      <div class="rating-total">
        <div class="total-left f-l border-right">
          <h1>{{seller.foodScore}}</h1>
          <p class="grade">综合评分</p>
          <p class="desc">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="total-right f-r">
          <div class="altitude">
            服务态度
            <div class="star">
              <sell-star :starType="30" :score="seller.foodScore"></sell-star>
            </div>
          </div>
          <div class="speed">
            送达时间 <span>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <sell-space></sell-space>
      <div class="rating-select">
        <rating-select :ratings="ratings" :onlyContent="onlyContent"
                       :selectType="selectType" @changeSelectType="changeSelectType"
                       @toggleOnlyContent="toggleOnlyContent"></rating-select>
      </div>
      <div class="rating-list">
        <ul>
          <div v-show="ratings.length==0">暂无数据</div>
          <li v-for="(item ,index) in ratingList" class="border-bottom" :key="index">
            <div class="related-info">
              <!--<span class="time">{{item.rateTime|formatDate}}</span>
              <img class="avatar f-r" :src="item.avatar"/>
              <span class="username f-r">{{item.username}}</span>-->
              <img class="avatar f-r" :src="item.avatar"/>
              <span class="username">{{item.username}}</span>
              <span class="time f-r">{{item.rateTime|formatDate}}</span>
              <br>
              <div class="delivery">
                <div class="star">
                  <sell-star :starType="20" :score="item.score"></sell-star>
                </div>
                <span class="speed">{{item.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <div class="content" v-if="item.text">
              <p>{{item.text}}</p>
              <i class="iconfont"
                 :class="{'icon-dianzan_active':item.rateType==0,'active':item.rateType==0,'icon-zan1':item.rateType==1}"></i>
              <div class="tag" v-if="item.recommend.length>0">
                <span v-if="item.recommend[0]">{{item.recommend[0]}}</span>
                <span v-if="item.recommend[1]">{{item.recommend[1]}}</span>
                <span v-if="item.recommend[2]">{{item.recommend[2]}}</span>
              </div>
            </div>
            <div class="content" v-if="!item.text"><i class="iconfont icon-dianzan_active active"></i>暂无评论信息</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {formatDate} from "@/assets/js/utils"

  const POSITIVE = 0;//好评
  const NEGATIVE = 1;//差评
  const ALL = 2;//所有
  export default {
    name: "RatingDetail",
    props: {
      seller: Object,
      ratings: Array
    },
    data: function () {
      return {
        onlyContent: false,
        selectType: ALL
      }
    },
    computed: {
      ratingList() {
        var ratingArr = [];
        if (this.onlyContent) {//只看有内容的
          if (this.selectType == POSITIVE) {
            this.ratings.forEach((item) => {
              if (item.rateType == POSITIVE && item.text) {
                ratingArr.push(item);
              }
            });
          } else if (this.selectType == NEGATIVE) {
            this.ratings.forEach((item) => {
              if (item.rateType == NEGATIVE && item.text) {
                ratingArr.push(item);
              }
            });
          } else {//就是全部的
            this.ratings.forEach((item) => {
              if (item.text) {
                ratingArr.push(item);
              }
            });
          }
        } else {
          if (this.selectType == POSITIVE) {
            this.ratings.forEach((item) => {
              if (item.rateType == POSITIVE) {
                ratingArr.push(item);
              }
            });
          } else if (this.selectType == NEGATIVE) {
            this.ratings.forEach((item) => {
              if (item.rateType == NEGATIVE) {
                ratingArr.push(item);
              }
            });
          } else {//就是全部的
            ratingArr = this.ratings;
          }
        }
        return ratingArr;
      }
    },
    methods: {
      changeSelectType(selectType) {
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
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    mounted() {
      /*setTimeout(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratingWrapper, {
            click: true
          });
          this.scroll.refresh();
        } else {
          this.scroll.refresh();
        }
      }, 1000);*/
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.ratingWrapper, {
          click: true
        });
        this.scroll.refresh();
      } else {
        this.scroll.refresh();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .rating-wrapper
    position fixed
    width 100%
    left 0
    top 10.9rem
    bottom 3rem
    overflow hidden
    box-sizing border-box
    .rating-total
      overflow hidden
      text-align center
      padding 1.125rem 1rem
      .total-left
        padding-right .75rem
        h1
          font-size 1.5rem
          color rgb(255, 153, 0)
        .grade
          font-size .75rem
          color rgb(7, 17, 27)
          line-height .75rem
          font-weight 700
          margin-top .5rem
        .desc
          font-size .625rem
          color #A8ADB2
          margin-top .5rem
        &:before
          border-color #A8ADB2
      .total-right
        text-align left
        margin-left .5rem
        font-size .6rem
        font-weight 700
        .altitude
          .star
            display inline-block
            margin-left .8rem
        .speed
          margin-top .8rem
          span
            color #A8ADB2
            margin-left .8rem
    .rating-list
      padding 0 1.125rem 0 1.125rem
      li
        padding-left 2rem
        padding-bottom 1.5rem
        color rgb(147, 153, 159)
        box-sizing border-box
        margin-top 1.5rem
        &:before
          border-color rgba(7, 17, 27, .5)
        .related-info
          margin-bottom .375rem
          font-size .625rem
          position relative
          left 0
          top 0
          img
            position absolute
            left -2.2rem
            top 0
            width 1.5rem
            height 1.5rem
            border-radius 50%
          .delivery
            margin-top .5rem
            .star
              display inline-block
        .content
          font-size .75rem
          color rgb(7, 17, 27)
          line-height 1rem
          font-weight 700
          margin-top .5rem
          p
            margin-bottom .5rem
          i
            margin-right .25rem
            color rgb(147, 153, 159)
            &.active
              color rgb(0, 160, 220)
          .tag
            display inline-block
            span
              display inline-block
              width 4rem
              color rgb(147, 153, 159)
              font-size .6rem
              border: 1px solid rgba(7, 17, 27, 0.1)
              margin-right .5rem
              text-align center
              text-overflow ellipsis
              overflow hidden
              white-space nowrap
</style>

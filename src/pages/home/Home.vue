<template>
  <div>
    <sell-header :seller="seller"></sell-header>
    <sell-tab :tab="tab" :seller="seller" :ratings="ratings"></sell-tab>
  </div>
</template>

<script>
  import SellHeader from "./components/SellHeader"
  import SellTab from "./components/SellTab"
  import axios from "axios"
  export default {
    name: 'Home',
    data () {
      return {
        seller:{},
        goods:[],
        ratings:[]
      }
    },
    computed:{
      tab(){
        return {
          goods:this.goods
        }
      }
    },
    components:{
      SellHeader,
      SellTab
    },
    mounted(){
      axios.get('/api')
        .then((response)=>{
          this.seller=response.data.seller;
          this.goods=response.data.goods;
          this.ratings=response.data.ratings;
        })
        .catch((error)=> {
          console.log(error);
        });
    }
  }
</script>
<style lang="stylus" scoped>
</style>

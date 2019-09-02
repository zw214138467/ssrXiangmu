<template>
  <div class="tab">
    <div class="trigger">
      <span :class="{active:conceal===index}" style="padding-left:20px" v-for="(tiem,index) in ['讲师新闻','助教新闻','班主任新闻']" :key="index" @click='cut(index)'>{{tiem}}</span>
      <!-- <span>助教新闻</span>
      <span>班主任新闻</span> -->
    </div>
    <div>
      <ul v-show='conceal===0'>
        <li>震惊，黑马讲师一夜秃头</li>
        <li>震惊，黑马讲师一夜秃头</li>
        <li>震惊，黑马讲师一夜秃头</li>
      </ul>
    </div>
    <div>
      <ul v-show='conceal===1'>
        <li>震惊，黑马助教一夜秃头</li>
        <li>震惊，黑马助教一夜秃头</li>
        <li>震惊，黑马助教一夜秃头</li>
      </ul>
    </div>
    <div>
      <ul v-show="conceal===2">
        <li>震惊，黑马班主任一夜秃头</li>
        <li>震惊，黑马班主任一夜秃头</li>
        <li>震惊，黑马班主任一夜秃头</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
data(){
    return {
        conceal:0
    }
},
methods:{
    cut(index){
        this.conceal=index
    }
}
};
</script>

<style lang="less" scoped>
.tab{
    .trigger{
        cursor: pointer;
        // padding-left: 20px
        .active{
            color:red
        }
    }
}
</style>
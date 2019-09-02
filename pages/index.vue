<template>
  <div class="index">
    <!-- 轮播图组件 -->
 <div class="block">
    <el-carousel height="700px">
      <el-carousel-item v-for="(item,index) in slideshow" :key="index">
        <div class="slideshow-img" :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat`">
        
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
  
  </div>
</template>

<script>
export default {
data(){
  return{
    slideshow:[
      // {
      //   url:"http://157.122.54.189:9095/assets/images/th01.jfif"
      // },
      // {
      //   url:"http://157.122.54.189:9095/assets/images/th02.jfif"
      // },
      // {
      //   url:"http://157.122.54.189:9095/assets/images/th03.jfif"
      // },
      // {
      //   url:'http://157.122.54.189:9095/assets/images/th04.jfif'
      // }
    ]
  }
},
// 动态获取轮播图背景照片
mounted(){
  // axios发起请求
  // console.dir(this.$axios)
  this.$axios({
    url:"/scenics/banners"
  }).then(res=>{
    // console.log(res)
    // 解析函数
    const {data} =res.data
    // console.log({data},'124')
    this.slideshow=data
  })
}
}
</script>

<style lang="less" scoped>
.index{
  height: 700px;
    .block{
      height: 100%;
      .slideshow-img{
        height: 100%;
      }
    }
}

</style>


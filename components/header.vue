<!--这里设置头部导航栏-->
<template>
  <div class="header">
     <el-row type="flex" class="main" justify="space-between">
         <div class="logo">
             <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
         </div>
           <el-row type="flex" class="navs">
              <!-- nuxt-link的作用和使用方法个router-link是一样的  -->
             <nuxt-link to='/'>首页</nuxt-link>
             <nuxt-link to="/post">旅游攻略</nuxt-link>
             <nuxt-link to="/hotel">酒店</nuxt-link>
             <nuxt-link to="/air">国内机票</nuxt-link>
           </el-row>
     
     <!-- 登录跳转 -->
     <div>
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
     </div>
     </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header{
    width: 100%;
    height: 60px;
    // 
    // .logo{
    //     // height: 100%;
    // }

    line-height: 60px;
    border-bottom:1px #ddd solid;
    box-shadow:0 2px 2px #ddd
    
}
.main{
        width: 1000px;
        // height: 60px;
        margin:0 auto;
   }
   .logo{
       padding-top:9px;
      img{
          width: 156px;
           height: 42px;
           display: block
      }
    //    vertical-align: bottom
   }
   .navs{
       flex: 1;
       margin-left:10px;
       a{
           display:block;
           height: 60px;
           padding: 0 20px;
           box-sizing:border-box;
        &:hover{
            color:#409eff;
            border-bottom:4px #409eff solid
        }
       }
       //该class是nuxt会去自动匹配nuxt-link的to的值，如果url和to的值相等会自动加上下面的class
        .nuxt-link-exact-active{
            background:#409eff;
            color:#fff;
            &:hover{
                color:#fff
            }
        }
   }
</style>>

</style>
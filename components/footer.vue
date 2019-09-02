<!-- 设置页脚-->
<template>
  <div class="footer">
    <div class="footer-navs">
      <el-row :gutter="0" class="footer-content">
        <el-col :span="6" class= "one">
          <div class="grid-content bg-purple">
            <h3>闲云旅游旅游网</h3>
            <p>上亿旅行者共同打造的"旅行神器"</p>
            <p>
              <span>60,000</span>
              多个全球旅游目的地
            </p>
            <p>
              <span>600,000</span>
              个细分目的地新玩法
            </p>
            <p>
              <span>760,000,000</span>
              次攻略下载
            </p>
            <p>
              <span>38,000</span>
              家旅游产品供应商
            </p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
              <h3>关于我们</h3>
              <p>隐私政策 商标声明</p>
              <p>服务协议 游记协议</p>
              <p>商城平台服务协议</p>
              <p>网络信息侵权通知指引</p>
              <p>闲云旅游旅游网服务监督员</p>
              <p>网站地图加入闲云旅游</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
              <h3>旅行服务</h3>
              <p>旅游攻略 酒店预订</p>
              <p>旅游特价 国际租车</p>
              <p>旅游问答 旅游保险</p>
              <p>旅游指南 订火车票</p>
              <p>旅游资讯 APP下载</p>
          </div>
        </el-col>
        <el-col :span="6" class="four">
          <div class="grid-content bg-purple">
              <img src="http://157.122.54.189:9093/images/1556522965.png" alt="">
              <p>关注我们</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  background: #333;
  display: block;
  color:#ccc;
  .footer-navs {
    width: 1000px;
    padding-top: 30px;
    margin: 0 auto;
    // color: #fff;
    font-size: 12px;
    .bg-purple{
        // text-align: center;
        h3{
            margin-bottom: 15px;
            font-size: 17px;
            font-weight: 300
        }
        p{
            display: block;
            height: 20px;
        }
        span{
            color:#FFA500
        }
        img{
            width: 140px;
            height: 140px;  
        }
    }
  }
  .footer-content{
      .one{
          margin-left: 4.16667%;
      }
      .four{
          text-align: center
      }
  }
}
</style>>

</style>
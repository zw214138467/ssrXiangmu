<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{order.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 引入二维码组件
import QRCode from "qrcode";
export default {
    data(){
        return{
            order:{},
            timer:null
        }
    },
    methods:{
        checkPay(){
          this.$axios({
            url:"/airorders/checkpay",
            method:"post",
            data:{
              id:this.$route.query.id,
              nonce_str:this.order.price,
              out_trade_no:this.order.orderNo
            },
            // 可以给接口单独加上请求头
            headers:{
              Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
            }
          }).then(res=>{
            // console.log(res,123456  )
            const {statusTxt} =res.data

            if(statusTxt ==="支付成功"){
              // 清楚定时器
              clearInterval(this.timer)
              this.timer =null;

              // 提示支付成功
              this.$alert('支付成功',"提示")
            }

            // const {statusTxt}
          })
        }
    },
  mounted() {
    setTimeout(() => {
      // 获取订单消息，需要id和token值

      //如果没有设置定时器，因为页面已经加载完成，但是token值还没返回，所以会报错说没有token值。
      const { id } = this.$route.query;
      this.$axios({
        url: `/airorders/${id}`,
        // 可以给接口单独加上请求头
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res, 123);
        // 设置机票价钱
        this.order = res.data
        console.log(this.order,7856)
        // 获取到canvas节点元素
                const canvas = document.getElementById("qrcode-stage")
                // console.log(canvas)
                // 要生二维码的连接
                const {code_url} = res.data.payInfo;
                
                QRCode.toCanvas(canvas, code_url, {
                    width: 200
                });

                setInterval(() => {
                    this.checkPay();
                }, 3000);
                // this.checkPay();
      });
    }, 10);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
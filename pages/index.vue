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
  
<!-- 实现tab栏 -->
<!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <span v-for="(items,index) in options" :key="index" :class="{active: index === currentOption}" @click="handleOption(index)">
                        <i>{{items.name}}</i>
                    </span>
                </el-row>
                
                <!-- 输入框 -->
                <el-row 
                type="flex" 
                align="middle" 
                class="search-input">
                    <input
                    :placeholder="options[currentOption].placeholder">
                    <i class="el-icon-search" ></i>
                </el-row>
            </div>
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
    ],
   // 搜索框tab选项
    options:[
      {
        name:'攻略',
        placeholder:'搜索城市',
      },
      {
        name:'酒店',
        placeholder:'请输入城市搜索酒店',
      },
      {
        name:'机票',
        placeholder:'请输入出发地',

      },
    ],
    searchValue: "",    // 搜索框的值
    currentOption: 0,   // 当前选中的选项  
  }
},
// 获取点击后的方法
methods:{
  handleOption(index){
    // console.log(index)
    this.currentOption=index
    // console.log(this.currentOption)
    if(index===2){
      this.$router.push("/air")
    }
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
// 组件内部style设置了scoped所以被渲染的时候会重新生成一个字符，所以需要在标签前面加上/deep/
// /deep/ .el-carousel__container{
//         height:700px;
//     }
.banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }

</style>


<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="flightsDatas" @setDataList="setDataList" />
        </div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
          <!-- 分页 -->
          <!-- size-change：每页条数切换时候触发 -->
          <!-- current-change：页码切换时候触发 -->
          <!-- current-page: 当前的页码 -->
          <!-- page-size: 当前显示的条数 -->
          <!-- total: 总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      // 机票列表返回的总数据，总数据包含4个属性，flights/info/options/tatol
      flightsData: {
        info: {},
        options: {}
      }, // 航班总数据
      // 机票列表返回的总数据，总数据包含4个属性，flights/info/options/tatol
      flightsDatas: {
        info: {},
        options: {}
      }, // 航班总数据
      // 当前显示的列表数组
      dataList: [],

      pageIndex: 1, //当前的页码
      pageSize: 5, //当前的条数
      total: 0 //总条数
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  watch: {
    // watch可以监听this下的所有属性
    
    $route() {
      // 请求航班列表数据
      this.getData()
      // console.log(this.$route,"1246+")
    }
  },
  mounted() {
    // this.$axios({
    //   url: "/airs",
    //   params: this.$route.query // 来自URL的5个参数
    // }).then(res => {
    //   //   console.log(res)
    //   this.flightsData = res.data;
    //   //   console.log(this.flightsData,123465)
    //   // 设置给过滤属性，如果设置flightsData的话，过滤后，再重新过滤会成空
    //   this.flightsDatas = { ...res.data };

    //   //   分页的总数
    //   this.total = res.data.flights.length;

    //   this.dataList = res.data.flights.slice(0, this.pageSize);
    // });
    this.getData()
  },
  methods: {
     getData(){
             // 请求航班列表数据
            this.$axios({
                url: "airs",
                // 路由的url参数
                params: this.$route.query
            }).then(res => {
                // 赋值给总数据
                this.flightsData = res.data;
                // 赋值给缓存总数据
                this.cacheFlightsData = {...res.data};
                // 分页的总条数
                this.total =  this.flightsData.flights.length;
                // 第一页的值
                this.dataList = this.flightsData.flights.slice(0, this.pageSize);
            })
        },
    // 该方法传递给子组件用于修改dataList,用于过滤组件使用
    setDataList(arr) {
      // 修改总的航班列表
      this.flightsData.flights = arr;
      // 重新回到第一页
      this.pageIndex = 1;
      // 由页面算出，如果第一页显示5条数据的情况下slice(0,5),第二算即(5,10)得出，当前显示的数据=第几页减去1乘于页面显示的数据，和第几页乘于页面需要显示的数量
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // 然后重新赋值页面总数
      this.total = arr.length;
    },
    //   每页条数切换时候触发
    handleSizeChange(Val) {
      //   设置当前页面需要显示几组数据，然后在重新给当前显示的列表数组赋值
      this.pageSize = Val;
      this.dataList = this.flightsData.flights.slice(0, this.pageSize);
    },
    //   页面切换时触发
    handleCurrentChange(val) {
      // console.log(val)
      this.pageIndex = val;
      // 由页面算出，如果第一页显示5条数据的情况下slice(0,5),第二算即(5,10)得出，当前显示的数据=第几页减去1乘于页面显示的数据，和第几页乘于页面需要显示的数量
      this.dataList = this.flightsData.flights.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
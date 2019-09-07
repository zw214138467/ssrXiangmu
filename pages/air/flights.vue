<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
            <FlightsFilters :data="flightsData"
            />
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
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from '@/components/air/flightsFilters'
export default {
  data() {
    return {
      // 机票列表返回的总数据，总数据包含4个属性，flights/info/options/tatol
      flightsData: {
        //   info:{}
      }, // 航班总数据
    // 当前显示的列表数组
    dataList:[],

      pageIndex:1,//当前的页码
      pageSize:5, //当前的条数
      total:0 //总条数
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query // 来自URL的5个参数
    }).then(res => {
    //   console.log(res)
      this.flightsData = res.data;
    //   console.log(this.flightsData,123465)

    //   分页的总数
    this.total = res.data.flights.length;

    this.dataList = res.data.flights.slice(0,this.pageSize)
    });
  },
  methods:{
    //   每页条数切换时候触发
      handleSizeChange(Val){
        //   设置当前页面需要显示几组数据，然后在重新给当前显示的列表数组赋值
          this.pageSize = Val;
          this.dataList = this.flightsData.flights.slice(0,this.pageSize)
      },
    //   页面切换时触发
    handleCurrentChange(val){
        // console.log(val)
        this.pageIndex=val;
        // 由页面算出，如果第一页显示5条数据的情况下slice(0,5),第二算即(5,10)得出，当前显示的数据=第几页减去1乘于页面显示的数据，和第几页乘于页面需要显示的数量
        this.dataList = this.flightsData.flights.slice((val-1)*this.pageSize,val*this.pageSize)
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
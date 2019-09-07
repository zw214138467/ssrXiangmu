<template>
  <div class="flight-item">
    <div @click="isShow = !isShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.base_price / 3}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show="isShow">
      <!-- 隐藏的座位信息列表 -->
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        v-for="(item,index) in data.seat_infos"
        :key="index"
      >
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <!-- 可能会有多个座位，需要循环显示 -->
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span>
              | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">￥1345</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- {{data.value}} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制列表的展开
      isShow: false
    };
  },
  props: {
    // 数据
    //data表示组件可以接收的属性
    data: {
      // type不能修改，用于声明属性的类型
      type: Object,
      // 默认是空数组
      // 如果调用组件不传值，采用default的默认值
      default: {}
    }
  },
  // computed和data一样都可以在模板中渲染，区别在computed的属性值是一个函数，
  // 最终的变量的值是由函数返回。
  computed: {
    // 相隔时间
    rankTime() {
      // 出发时间,返回值是数组
      const dep = this.data.dep_time.split(":");
      // 到达时间,返回值是数组
      const arr = this.data.arr_time.split(":");
      // 判断有没有到第二天的，如果出发小时大于到时时间的话则到第二天了
      if (dep[0] > arr[0]) {
        arr[0] += 24;
      }
      // 到达时间的分钟,因为得到的是字符串，需要转译，可以字符串后面-0 或者+arr[1]
      const arrVal = arr[0] * 60 + +arr[1];

      // 出发时间的分钟
      const depVal = dep[0] * 60 + +dep[1];

      // 然后得到的总分钟相减
      const dis = arrVal - depVal;

      // 然后把得到的相差时间除于60得到对应的小时和分钟，时间用向下取整得到
      // 向下取整获取小时
      const hours = Math.floor(dis / 60);

      // 获取分钟
      const min = dis % 60;

      return `${hours}时${min}分`;
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
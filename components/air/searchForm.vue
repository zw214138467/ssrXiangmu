<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <!-- 该表单没有model和rules -->
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo -->

        <!-- fetch-suggestions: 获取搜索建议，并且显示在输入框的下拉框中 -->
        <!-- select：在下拉框中选中时候时候触发的事件 -->

        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          v-model="form.departCity"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          @blur="clearDepartCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          v-model="form.destCity"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          @blur="shishijiao"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // 收集表单内容
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "",
        destCode: "",
        departDate: ""
      },
      temp: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "",
        destCode: ""
      },
      // tab栏
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0
    };
  },
  methods: {
    //   尝试下失焦
    shishijiao() {
      this.form.destCity = this.temp.destCity;
      this.form.destCode = this.temp.destCode;
    },
    // 点击切换tab栏效果
    handleSearchTab(index) {
      if (index === 1) {
        this.$alert("点鸡毛", "警告");
      }
    },
    // 出发城市的搜索建议的事件
    // value是输入框的值
    // cb是一个回调函数必须要调用，参数的值会显示在下拉框中。
    // cb调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性
    queryDepartSearch(value, cb) {
      // 判断如果空值就不显示下拉框
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        //   console.log(res)
        //   解析data内容
        const { data } = res.data;

        // 给数组每个对象添加value属性
        const newData = [];
        data.forEach(v => {
          // 添加value属性
          v.value = v.name.replace("市", "");
          // 把带有value属性的对象添加到新数组中
          newData.push(v);
          // console.log(v.value)
        });
        // 设置不点击下拉的值的时候自动默认为第一个
        // this.form.departCity = newData[0].value;
        // this.form.departCode = newData[0].sort;
        this.temp.departCity = newData[0].value;
        this.temp.departCode = newData[0].sort;
        // 显示下拉菜单列表中
        cb(newData);
      });
    },
    // 解决输入广字自动弹出州字的BUG
    clearDepartCity(){
      this.form.departCity = this.temp.departCity ? this.temp.departCity : "";
        this.form.departCode = this.temp.departCode ? this.temp.departCode : "";
    },
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表

    queryDestSearch(value, cb) {
      // 判断如果空值就不显示下拉框
      if (!value) {
        cb([]);
        return;
      }
      // 请求服务器
      this.$axios({
        url: "/airs/city",
        // 参数
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;

        const newData = [];
        data.forEach(v => {
          // 添加value属性
          v.value = v.name.replace("市", "");
          newData.push(v);
        });
        // 设置不点击下拉的值的时候自动默认为第一个
        this.temp.destCity = newData[0].value;
        this.temp.destCode = newData[0].sort;

        cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item,123456)

      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      // console.log(item)
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    // 确认选择日期时触发
    // value会返回当然选中的日
    handleDate(value) {
      // console.log(value)
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    // 触发和目标城市切换时触发
    handleReverse() {
      // 解析
      const { departCity, departCode, destCity, destCode } = this.form;
      // 交叉赋值
      this.form.departCity = destCity;
      this.form.departCode = destCode;

      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },
    // 提交表单是触发
    handleSubmit() {
      // console.log(this.form)
      // 判断form里面的内容不能为空
      const { departCity, destCity, departDate } = this.form;

      if (!departCity) {
        this.$alert("请输入出发的地址", "提示");
        return;
      }
      if (!destCity) {
        this.$alert("请输入你要到达的目的地", "提示");
        return;
      }
      if (!departDate) {
        this.$alert("请输入出发的日期", "提示");
        return;
      }
      // 搜索成功后跳转到机票页面
      this.$router.push({
        path: "/air/flights",
        // url携带的参数
        query: this.form
      });
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}
.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }
  .active {
    border-top-color: orange;
    background: #fff;
  }
  i {
    margin-right: 5px;
    font-size: 18px;
    &:first-child {
      font-size: 16px;
    }
  }
}
.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;
  .el-autocomplete {
    width: 100%;
  }
}
.reverse {
  position: absolute;
  top: 35px;
  right: 15px;
  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }
  &:after {
    top: 0;
  }
  &:before {
    top: 60px;
  }
  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }
    &:after {
      top: -20px;
    }
    &:before {
      top: 20px;
    }
  }
}
</style>
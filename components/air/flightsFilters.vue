<template>
    <div class="filters">
        <!-- 由于页面已经加载成功，但是父传子的数据还没传过来，所以会报错，需要一个判断，如果有这个data.info这个数据在来渲染页面  -->
        <!-- <div v-if="data.info"> -->
            <div>
            <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in airSizes"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小

            airSizes:[
                {name:"大机",size:"L"},
                {name:"中机",size:"M"},
                {name:"小机",size:"S"}
            ]
        }
    },
    // 拿到父组件传的值
    props:{
        data:{
            type: Object,
            default:{}
        }
    },
    // mounted(){
    //     console.log(this.data,123456)
    // },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            const arr = this.data.flights.filter(v=>{
                // console.log(v,123)
                return v.org_airport_name === value
            })
            // console.log(arr,123)
            this.$emit("setDataList",arr)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            // console.log(value)
            console.log(value)
            // 数组的解构赋值 const [from, to] = [6,12]
            const [from,to] = value.split(",")
            // 过滤数据，只保留选中的出发时间的航班
             const arr = this.data.flights.filter(v=>{
                // console.log(v,123)
                 // 每趟航班出发时间的小时
               const current= v.dep_time.split(":")[0];
               // 需要满足在时间段内 比如 6 - 12;
                return +current >= +from && +current < +to
            })
            // console.log(arr,123)
            this.$emit("setDataList",arr)
        },

         // 选择航空公司时候触发
        handleCompany(value){
            const arr = this.data.flights.filter(v=>{
                // console.log(v,123)
                return v.airline_name === value
            })
            // console.log(arr,123)
            this.$emit("setDataList",arr)
        },

         // 选择机型时候触发
        handleAirSize(value){
           const arr = this.data.flights.filter(v=>{
                // console.log(v,123)
                return v.plane_size === value
            })
            // console.log(arr,123)
            this.$emit("setDataList",arr)   
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport= "";      // 机场
            this.flightTimes= "";   // 出发时间
            this.company= "";       // 航空公司
            this.airSize= "";       // 机型大小

            this.$emit("setDataList",this.data.flights)
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>
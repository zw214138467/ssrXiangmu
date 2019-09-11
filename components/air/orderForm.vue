<template>
    <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" 
                v-for="(item,index) in users"
                :key="index"
                >

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select"
                        v-model="users[index].id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item"
                v-for="(item,index) in infoData.insurances"
                :key="index">
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" 
                    border @change="handleChange(item.id)">
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
         <!-- 模板中引用总价格触发计算 -->
        <span v-show="false">{{allPrice}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
        // 姓名和证件号
        users:[{
            username:'',
            id:''
            }
        ],
        // 获取保险的id
        insurances:[],
         // 机票的数据
        infoData: {},
        // 联系人名字
        contactName:'',
        // 联系人电话
        contactPhone:'',
        // 验证码
        captcha: "",        
        // 是否需要发票
        invoice:false,
        // 作为id
        seat_xid:'',
        // 航班id
        air:''
        }
    
    },
    methods: {
        // 获取保险id的集合
        handleChange(id){
            // console.log(id,123)
            // console.log(this.insurances,456)
            // 如果点击取消，Id也会重新加载进去，所以这里需要判断,判断是否包含该id
            const index = this.insurances.indexOf(id)
            
            // 包含了应该删除
            if(index > -1){
                this.insurances.splice(index,1)
            }else{
                // 添加到数组
                this.insurances.push(id)
            }
            // console.log(index)
            
        },        
        // 添加乘机人
        handleAddUsers(){
            this.users.push(
                {
            username:'',
            id:''
            }
            )
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            // console.log(index)
            // 得到索引，然后设置splice从第几个删除，然后删除多少个
            this.users.splice(index,1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
             // 判断如果手机号码是空，不请求
            if(!this.contactPhone){
                this.$message.error("请输入手机号码");
                return;
            }
            // 发起请求
            this.$axios({
                url:'/captchas',
                method:"POST",
                data: {
                    tel:this.contactPhone
                }
            }).then(res=>{
                // console.log(res)
                const {code} = res.data
                this.$alert(`验证码是:${code}`,"提示")
            })
        },

        // 提交订单
        handleSubmit(){
            
            // console.log(this.users)
            // console.log(this.insurances)
            // console.log(this.contactName)
            const data = {
                users:this.users,
                insurances:this.insurances,
                contactName:this.contactName,
                contactPhone:this.contactPhone,
                captcha:this.captcha,
                invoice:this.invoice,
                seat_xid:this.$route.query.seat_xid,
                air:this.$route.query.id
            }
            // 非空判断
            // if(!this.users[0].username){
            //     this.$message.error('请输入姓名123')
            //     return
            // };
            // if(!this.users[0].id){
            //     this.$message.error('请输入身份证')
            //     return

            // };
            // if(!this.contactName){
            //     this.$message.error('请输入联系人')
            //     return
            // };
            // if(!this.captcha){
            //     this.$message.error('请输入验证码')
            //     return
            // }
            // console.log(data)
            // 提交数据
            // console.log(this.$state,123)
            this.$axios({
                url:"/airorders",
                method:"post",
                headers:{
                Authorization:`Bearer ${this.$store.state.user.userInfo.token}`
                },
                data
            }).then(res=>{
                // console.log(res,123) 
                // 订单id
                const {id} = res.data.data
                // 然后根据id跳转到订单页
                this.$router.push({
                    path:"/air/pay",
                    query:{
                        id
                    }
                })
            })
        }
    },
    computed:{
          // 总价格
        allPrice(){
            // 如果请求未完成，暂时不需要计算，返回0；
            if(!this.infoData.seat_infos){
                return 0;
            }
            let price = 0;
            // 机票单价，取座位信息的第一个价格
            price += this.infoData.seat_infos.org_settle_price;
            // 燃油费
            price += this.infoData.airport_tax_audlet;
            
            // 保险数据
            price += 30 * this.insurances.length;
            price *= this.users.length;
            // console.log(price,123)
            // 把值存到store
            this.$store.commit("air/setAllPirce", price)
            return price;
        },
   
    },
    mounted(){
        // 设置保险数据渲染
        const { id,seat_xid } = this.$route.query;
        this.$axios({
            url:`/airs/${id}`,
            params:{
                seat_xid
                }
        }).then(res=>{
            // console.log(res,123456)
             // 保存机票的数据
            this.infoData = res.data
            // console.log(this.insurances)
            // 调用store的方法，把infoData存到store
            this.$store.commit("air/setInfoData",this.infoData)
        })
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
<template>
  <!-- 获取登录账号和密码 -->
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit(form)">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      // 账号和密码验证
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };
  },

  // 点击确认登录方法
  methods: {
    handleLoginSubmit() {
      //   console.log(form, "64521");
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "post",
            data: this.form
          }).then(res => {
            // console.log(res, "123465");
            // 如何调用mutations下的setUserInfo的方法 commit
           // commit接受两个参数，第一个mutations参数是方法名，第二个参数数据
            this.$store.commit("user/setUserInfo",res.data)

            // 在这里设置返回上一页
            this.$router.back()
            this.$message({
              type:'success',
              message:'登录成功'
            })
            this.$router.push({name:"index"})
            // console.log(this.$store)
          })
          .catch(err=>{
            // console.log(err,res)
            // this.$message.error('请输入正确的账号和密码')
          })
        } else {
            this.$message.error('请输入账号和密码')          
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>>


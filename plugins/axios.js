// 这里是拦截错误信息及提示
// 是用于处理axios的请求拦截插件
// 需要引入message
import {Message} from 'element-ui';

// export default 函数是nuxt插件的固定的格式
// 函数有一个参数，这个参数是nuxt对象
export default ({$axios})=>{
// 错误拦截，onError
$axios.onError(res=>{
// 返回的res是一个错误的对象，Error对象下都有一个response的属性可以访问错误的信息
console.log(res.response,132231)
const {message,statusCode } =res.response.data
if(statusCode ===400){
    // Message=this.$message 但是上面要引入才行import {Message} from 'element-ui';
    Message.error(message)
}
})
}
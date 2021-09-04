const {Service} = require("egg")
const md5 = require("md5")  //单向数据加密
var svgCaptcha = require('svg-captcha'); // 验证码
 
// md5 加密
class ToolService extends Service{
    md5(message){
       return md5(message)
   }
// 生成 验证码
   vertifyImg(){
     var captcha = svgCaptcha.create({
        color:true,
        background: '#FFF'
     });  //生成验证码  是一个对象 {text:"",data:""}  data是返回前端 用户查看 text 后端验证 用户输入银行用的
    //  console.log(captcha);  
    this.ctx.session.codeB = captcha.text
     return captcha.data
   }
}

module.exports = ToolService
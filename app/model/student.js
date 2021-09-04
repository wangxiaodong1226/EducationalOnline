module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let studentSchema = new mongoose.Schema({
       stu_password:{type:String,required:true},// 密码
       stu_name:{type:String,required:true},//姓名 
       stu_sex:{type:String,required:true}, // 性别
       stu_age:{type:Number,required:true}, // 年龄
 
       stu_ckao:{type:String,default:""},//报考考试
       stu_intr:{type:String,default:""},//报考简介
       
    })
    //返回模板 文档
    return mongoose.model("Student",studentSchema)
}
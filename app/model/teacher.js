module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let teacherSchema = new mongoose.Schema({
       te_password:{type:String,required:true},// 密码
       te_name:{type:String,required:true},//姓名 
       te_sex:{type:String,required:true}, // 性别
       te_age:{type:Number,required:true}, //年龄
       te_level:{type:String,required:true},//教室等级
       te_intr:{type:String,required:true},//简介
       
    })
    //返回模板 文档
    return mongoose.model("Teacher",teacherSchema)
}
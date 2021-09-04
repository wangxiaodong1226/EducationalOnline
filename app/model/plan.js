module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let planSchema = new mongoose.Schema({
       te_id:{type:mongoose.Types.ObjectId,required:true},//教室id
       class_id:{type:mongoose.Types.ObjectId,required:true},//课程id
       plan_info:{type:String,default:""} //计划简介
    })
    //返回模板 文档
    return mongoose.model("Plan",planSchema)
}
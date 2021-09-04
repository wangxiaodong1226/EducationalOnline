module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let stucheckclassSchema = new mongoose.Schema({
        
       stu_id:{type:mongoose.Types.ObjectId,required:true},// 学生id
       class_id:{type:mongoose.Types.ObjectId,required:true},//课程id 
       stu_point:{type:Number,default:""} // 成绩
    })
    //返回模板 文档
    return mongoose.model("Stucheckclass",stucheckclassSchema)
}
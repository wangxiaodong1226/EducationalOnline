module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let classSchema = new mongoose.Schema({
        
       class_name:{type:String,required:true},// 名称
       class_point:{type:Number,required:true},// 分数 
       class_info:{type:String,required:true},//课程描述
       class_textTime:{type:String,required:true},//考试时间 
       class_room:{type:String,required:true} // 上课教室
    })
    //返回模板 文档
    return mongoose.model("Class",classSchema)
}
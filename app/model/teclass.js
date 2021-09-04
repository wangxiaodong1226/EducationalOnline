module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let teclassSchema = new mongoose.Schema({
        
       te_id:{type:mongoose.Types.ObjectId,required:true},// 教师id
       class_id:{type:mongoose.Types.ObjectId,required:true},// 课程id
      
    })
    //返回模板 文档
    return mongoose.model("Teclass",teclassSchema)
}
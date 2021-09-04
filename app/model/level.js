module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let levelSchema = new mongoose.Schema({
       level_cname:{type:String,required:true},//考试名称
       level_ctime:{type:String,required:true}, // 考试时间
       level_carea:{type:String,required:true} //考场
    })
    //返回模板 文档
    return mongoose.model("Level",levelSchema)
}
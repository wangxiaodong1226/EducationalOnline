module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let stuannSchema = new mongoose.Schema({
       stuann_info:{type:String,default:""} // 公告内容
    })
    //返回模板 文档
    return mongoose.model("Stuann",stuannSchema)
}
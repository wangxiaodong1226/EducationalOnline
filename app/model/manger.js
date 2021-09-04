module.exports = app =>{
    //插件 挂载在app 上
    const mongoose = app.mongoose

    let mangerSchema = new mongoose.Schema({
        
        admin_password:{type:String,required:true},// 密码
        admin_name:{type:String,required:true},//姓名 
       admin_sex:{type:String,required:true}, // 性别
       admin_age:{type:Number,required:true}, // 年龄
       admin_intr:{type:String,default:""},//简介
        
    })
    //返回模板 文档
    return mongoose.model("Manger",mangerSchema)
}

// module.exports = app =>{
//     //插件 挂载在app 上
//     const mongoose = app.mongoose

//     let staffSchema = new mongoose.Schema({
//         role_id:{type:mongoose.Schema.Types.ObjectId,required:true}, //角色ID
//         username:{type:String,required:true}, // 账号
//         password:{type:String,required:true}, // 密码
//         name:{type:String,required:true},//名称
//         num:{type:String,default:""},// 编号
//         phone:{type:String,default:""},//电话
//         status:{type:Number,default:1}, //1正常 0异常
//         time_create:{type:Number,default:Date.now()}, //创建时间
//         time_last:{type:Number,default:Date.now()}, // 退出时间
//         ip_last:{type:String,default:""}, // ip 退出的时间
//         ip_super:{type:Number,default:0}, //1：超级管理员:0：普通
    
//     })
//     //返回模板 文档
//     return mongoose.model("Staff",staffSchema)
// }
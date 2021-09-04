var application = app =>{
    // 只触发一次 启动服务后，暴露server
    app.once("server",server=>{
        console.log("server is running");
    })
    // 运行时有任何异常 会触发事件
    app.on("error",error=>{
        console.log(error);
    })
    //有请求 触发 并暴露上下文
     app.on("request",ctx=>{
        // console.log("request---");
    })
    //有响应 触发 并暴露上下文
    app.on("response",ctx=>{
        // var time = Date.now() - ctx.starttime; // 获取响应时间
        // console.log("response---" + time);
    })
}

module.exports = application
module.exports = options => {
    //路由 切换的中间件
    return async function loginMiddleWare(ctx, next) {
        let pathname = ctx.path
        let userinfo = ctx.session.info;
        let correct = ctx.session.correct
        console.log(pathname,userinfo,correct);
        // if (userinfo) {
        //     // 添加到全局  app.locals中 
        //     ctx.locals.userinfo = userinfo
        //     let successUrlResult = await ctx.service.access.findSuccessAccessUrl(userinfo.role_id, pathname)
        //     // console.log(successUrlResult);
        //     if (successUrlResult.flag) {
        //         let result = await ctx.service.access.finEndModules(ctx.locals.userinfo.role_id)
        //         if (result.flag) {
        //             ctx.locals.accessAll = result.data;
        //             await next()
        //         } else {
        //             return {
        //                 flag: false,
        //                 msg: "获取登录用户权限错误"
        //             }
        //         }
        //     }else{
        //         ctx.body = "no access pathname now"
        //     }


        // } else {
            if(userinfo){
                if(pathname == "/admin/pass" && correct){
                    await next()
                  ctx.session = null
                }else{
                    await next()
                }
            }else{
                if (pathname == "/admin/login" || pathname == "/admin/vertify" || pathname == "/admin/dologin") {
                    await next()
                } else {
                    ctx.response.redirect("/admin/login")
                }
            }
           
        // }
    };
};
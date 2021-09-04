module.exports = options => {
    //路由 切换的中间件
    return async function upHoldMiddleWare(ctx, next) {
        
        let te = ctx.session.teacherAccess;
        let stu = ctx.session.studentAccess;
        let info = ctx.session.info;
        let identity = ctx.session.type.identity;

        console.log(te,stu,info);
        if(info){
            if( (te=="0" || stu =="0") && identity != "2" ){
                ctx.response.redirect("/admin/login")
            }
        }
        await next()
    };
};
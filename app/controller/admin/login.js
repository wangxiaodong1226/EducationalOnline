
const BaseController = require("./base")
const md5 = require("md5")

class LoginController extends BaseController {
    //登录 页面
    async login() {
        console.log('登录时候的this.ctx.session.info',this.ctx.session.info);
        if (this.ctx.session.info  && this.ctx.session.errormsg == null) {
            if (this.ctx.session.teacherAccess == "0" && this.ctx.session.type.identity == "1") {
                await this.ctx.render("login", { uphold: "老师系统维护中..." })
            } else if (this.ctx.session.studentAccess == "0" && this.ctx.session.type.identity == "0") {
                await this.ctx.render("login", { uphold: "学生系统维护中..." })
            } 
        }   
        else {
            if (this.ctx.session.errormsg) {
                let { error } = this.ctx.session.errormsg
                await this.ctx.render("login", { error })
            } else {
                await this.ctx.render("login")
            }
        }


    }

    async pass() {
        if (this.ctx.session.passmsg) {
            let { error } = this.ctx.session.passmsg

            await this.ctx.render("pass", { error, name: this.ctx.session.info.info, type: this.ctx.session.type.identity })
        } else {
            if (this.ctx.session.correct) {
                let { correct } = this.ctx.session.correct
                await this.ctx.render("pass", { name: this.ctx.session.info.info, type: this.ctx.session.type.identity, correct })
            } else {
                await this.ctx.render("pass", { name: this.ctx.session.info.info, type: this.ctx.session.type.identity })
            }
            // console.log(this.ctx.session.correct.correct);

        }
    }
    async motifyPass() {
        let { _id, password, oldpassword } = this.ctx.request.body;
        console.log(_id, password);
        let passResult = await this.ctx.service.dologin.oldPassTrue(oldpassword)
        if (passResult.flag) {
            this.ctx.session.passmsg = null;
            let updataResult = await this.ctx.service.dologin.motifyPass(_id, password)
            if (updataResult.flag) {
                let correct = "1"
                this.ctx.session.correct = { correct }
                console.log(this.ctx.session.correct);
                this.ctx.response.redirect("/admin/pass")
            } else {
                await this.fail("/admin/pass", updataResult.msg)
            }
        } else {
            let error = passResult.msg
            this.ctx.session.passmsg = { error }
            this.ctx.response.redirect("/admin/pass")
        }


    }
    //处理登录
    async dologin() {
        // let indetity = 0
        // this.ctx.response.redirect(`/admin/${indetity}`) 
        let result = this.ctx.request.body
        let { username, password, code, identity } = result
        console.log('result',result);
        let resultInfo = await this.ctx.service.dologin.dologin(username, md5(password), code, identity)
        console.log('处理登录dologin返回信息',resultInfo);
        if (resultInfo.flag) {
            this.ctx.session.errormsg = null;
            this.ctx.response.redirect(`/adminIndetity/${identity}`)
        }
        else {
            let error = resultInfo.mgs
            this.ctx.session.errormsg = { error }
            this.ctx.response.redirect("/admin/login")
        }
    }
    //验证码 
    async vertify() {
        //设置 响应类型 
        this.ctx.response.type = "image/svg+xml"
        this.ctx.body = this.ctx.service.tools.vertifyImg()
    }
    // 退出登录
    async logout() {
        this.ctx.session.info = null;
        this.ctx.session.type = null;
        this.ctx.session.errormsg = null;
        this.ctx.session.passmsg = null;
        this.ctx.session.correct = null;
        this.ctx.response.redirect("/admin/login")
    }
    // 首页的欢迎 页面
    async welcome() {
        let { identity } = this.ctx.session.type;
        switch (identity) {
            case "0":
                await this.ctx.render("/admin/student/welcome")
                break;
            case "1":
                await this.ctx.render("/admin/teacher/welcome")
                break;
            case "2":
                await this.ctx.render("/admin/manger/welcome")
                break;

            default:
                await this.ctx.render("/admin/welcome")
                break;
        }
    }

}

module.exports = LoginController
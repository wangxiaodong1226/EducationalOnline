const { Service } = require("egg")

class LoginService extends Service {
    // 处理登录
    async dologin(username, password, code, identity) {

        if (code.toLowerCase() == this.ctx.session.codeB.toLowerCase()) {
            switch (identity) {
                case "0":
                    var result = await this.ctx.service.student.findtwo(username, password)

                    if (result) {

                        this.ctx.session.type = {identity}
                        this.ctx.session.info = {info:result}
                        return {
                            flag: true,
                            mgs: "登录成功",
                            data: result,
                        }
                    } else {
                        return {
                            flag: false,
                            mgs: "密码或用户错误"
                        }
                    }
                    break;
                case "1":
                    var result = await this.ctx.service.teacher.findtwo(username, password)

                    if (result) {
                        this.ctx.session.type = {identity}
                        this.ctx.session.info = {info:result}
                        // let { name, role_id, ip_super } = staff
                        // this.ctx.session.userinfo = { name, role_id, ip_super }
                        return {
                            flag: true,
                            mgs: "登录成功",
                            data: result
                        }
                    } else {
                        return {
                            flag: false,
                            mgs: "密码或用户错误"
                        }
                    }
                    break;
                case "2":
                    var result = await this.ctx.service.manger.findtwo(username, password)

                    console.log('2',result);
                    if (result) {
                        this.ctx.session.type = {identity}
                        this.ctx.session.info = {info:result}
                        // let { name, role_id, ip_super } = staff
                        // this.ctx.session.userinfo = { name, role_id, ip_super }
                        return {
                            flag: true,
                            mgs: "登录成功",
                            data: result
                        }
                    } else {
                        return {
                            flag: false,
                            mgs: "密码或用户错误"
                        }
                    }

                    break;

                default:
                    return {
                        flag: false,
                        mgs: "密码或用户错误"
                    }
                    break;
            }
        }else{
            return {
                flag: false,
                mgs: "验证码错误"
            }
        }

    }

    async motifyPass(_id,password){
        let {identity} = this.ctx.session.type;
        switch (identity) {
            case "0":
                let result1 = await this.ctx.model.Student.updateOne({_id},{stu_password:this.ctx.service.tools.md5(password)})
              
                if(result1.nModified>0){
                    return {
                        flag:true,
                        msg:"修改密码成功"
                    }
                }else{
                     return {
                        flag:false,
                        msg:"修改密码失败"
                    }
                }
                break;
            case "1":
                console.log(identity);
                 let result2 = await this.ctx.model.Teacher.updateOne({_id},{te_password:this.ctx.service.tools.md5(password)})
                if(result2.nModified>0){
                    return {
                        flag:true,
                        msg:"修改密码成功"
                    }
                }else{
                     return {
                        flag:false,
                        msg:"修改密码失败"
                    }
                }
                break;
            case "2":
                 let result3 = await this.ctx.model.Manger.updateOne({_id},{admin_password:this.ctx.service.tools.md5(password)})
                  console.log(result3);
                if(result3.nModified>0){
                    return {
                        flag:true,
                        msg:"修改密码成功"
                    }
                }else{
                     return {
                        flag:false,
                        msg:"修改密码失败"
                    }
                }
                break;
        
            default:
            return {
                        flag:false,
                        msg:"修改密码失败"
                    }
                break;
        }
    }

    async oldPassTrue(oldpassword){
        let {identity} = this.ctx.session.type;
        switch (identity) {
            case "0":
                let result1 = await this.ctx.service.student.findById(this.ctx.session.info.info._id)
        
                if(result1){
                    if(this.ctx.service.tools.md5(oldpassword) == result1.data.stu_password){
                        return {
                            flag:true,
                            msg:"密码正确"
                        }
                    }else{
                         return {
                            flag:false,
                            msg:"密码错误"
                        }
                    }
                    
                }
                break;
            case "1":
                let result2 = await this.ctx.service.teacher.findById(this.ctx.session.info.info._id)
        
                if(result2){
                    if(this.ctx.service.tools.md5(oldpassword) == result2.data.te_password){
                        return {
                            flag:true,
                            msg:"密码正确"
                        }
                    }else{
                         return {
                            flag:false,
                            msg:"密码错误"
                        }
                    }
                    
                }
                break;
            case "2":
                let result3 = await this.ctx.service.manger.findById(this.ctx.session.info.info._id)
        
                if(result3){
                    if(this.ctx.service.tools.md5(oldpassword) == result3.data.admin_password){
                        return {
                            flag:true,
                            msg:"密码正确"
                        }
                    }else{
                         return {
                            flag:false,
                            msg:"密码错误"
                        }
                    }
                    
                }
                break;
        
            default:
                return {
                    flag:false,
                    msg:"密码错误"
                }
                break;
        }
    
    }
}

module.exports = LoginService
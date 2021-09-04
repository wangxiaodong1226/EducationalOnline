// const { Controller } = require("egg")
const BaseController = require("./base")
class StaffController extends BaseController {
    // 显示列表
    async info() {
       
        await this.ctx.render("/admin/manger/list", { admin:this.ctx.session.info.info })
    }
    async people() {
       let sturesult = await this.ctx.service.student.findAll()
       let teresult = await this.ctx.service.teacher.findAll()
       if(sturesult.flag&& teresult.flag){
        await this.ctx.render("/admin/manger/people", {stu:sturesult.data,te:teresult.data})
       }else{
        await this.fail("/adminIndetity/2", result.msg)
       }
       
    }
  // 处理添加
  async doadd() {
    let { admin_id, admin_password, admin_name, admin_sex, admin_age, admin_intr} = this.ctx.request.body
    let manger = {
        admin_id,
        admin_password: this.ctx.service.tools.md5(admin_password),
        admin_name,
        admin_sex,
        admin_age,
        admin_intr,
    }
    let result = await this.ctx.service.manger.add(manger)
    if (result.flag) {
        this.ctx.body = "ok"
        // await this.success("/admin/student/list", result.msg)
    } else {
        await this.fail("/admin/manger/add", result.msg)
    }

}
// 显示 添加
async add() {
    await this.ctx.render("/admin/manger/add")
}
    // 处理 修改
    async doedit() {
        var { ctx } = this
        let body = ctx.request.body;
        console.log(body);
        let { username, num, phone, role_id, status, staff_id, name, password } = body
        status = status == "on" ? 1 : 0
        let staff
        //判断 是否更改 密码 
        if (password) {
            staff = {
                username,
                password:this.ctx.service.tools.md5(password),
                num,
                name,
                status,
                phone,
                role_id
            }
        }else{
            staff = {
                username,
                num,
                name,
                status,
                phone,
                role_id
            }
        }

        // console.log(role);
        let result = await ctx.service.staffopt.edit(staff_id, staff)
        console.log(result);
        if (result.flag) {
            await this.success("/admin/staff/list", result.msg)
        } else {
            await this.fail("/admin/staff/edit?id=" + staff_id, result.msg)
        }
    }
    //显示 修改
    async edit() {
        var id = this.ctx.request.query.id
        let resultstaff = await this.ctx.service.staffopt.findById(id)
        let resultrole = await this.ctx.service.role.findAll()
        console.log(resultstaff);
        if (resultstaff.flag && resultrole.flag) {
            let staff = resultstaff.data
            let roles = resultrole.data
            await this.ctx.render("/admin/staff/edit", { staff, roles })
        } else {
            this.ctx.body = result.msg
        }
    }
    // 处理 删除
    async remove() {
        let id = this.ctx.request.query.id;

        let result = await this.ctx.service.staffopt.delete(id)

        if (result.flag) {
            await this.success("/admin/staff/list", result.msg)
        } else {
            await this.fail("/admin/staff/list", result.msg)
        }
    }
    async uphold() {
       let {teacherAccess,studentAccess} = this.ctx.session
        console.log('学生权限',studentAccess);
        console.log('老师权限',teacherAccess);
       await this.ctx.render("/admin/manger/uphold",{stu:studentAccess,te:teacherAccess})  
    }
    async douphold() {
       let body = this.ctx.request.body
    //    console.log(studentAccess,teacherAccess);
       await this.ctx.service.manger.uphold(body)
       await this.success("/admin/manger/uphold","维护生效")
    }
}

module.exports = StaffController
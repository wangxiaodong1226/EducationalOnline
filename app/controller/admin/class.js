// const { Controller } = require("egg")
const BaseController = require("./base")
class StaffController extends BaseController {
    // 显示列表
    async list() {
        let result = await this.ctx.service.staffopt.findAll()
        // console.log(result.data);
        let staffs = result.data
        await this.ctx.render("/admin/staff/list", { staffs })
    }
    // 处理添加
    async doadd() {
        let classItem = this.ctx.request.body
        // let { class_name, class_point, class_info, class_textTime, class_room } = this.ctx.request.body
        // let classItem = {
        //     class_name,
        //     class_point,
        //     class_info,
        //     class_textTime,
        //     class_room,
        // }
        console.log(classItem);
        let result = await this.ctx.service.class.add(classItem)
        if (result.flag) {
        this.ctx.body = result.msg
            // await this.success("/admin/staff/list", result.msg)
        } else {
            this.ctx.body = result.msg
            // await this.fail("/admin/staff/add", result.msg)
        }

    }
    // 显示 添加
    async add() {
      
            await this.ctx.render("/admin/class/add")
       

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
}

module.exports = StaffController
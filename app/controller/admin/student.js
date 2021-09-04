// const { Controller } = require("egg")
const BaseController = require("./base")
class StudentController extends BaseController {
    async home(){

        await this.ctx.render("/student/index")
    }
    // 显示列表
    async list() {
        let result = await this.ctx.service.student.findAll()
        let students = result.data
        await this.ctx.render("/student/list", {students})
    }
    // 处理添加
    async doadd() {
        let { stu_name, stu_password, stu_sex, stu_age,stu_intr} = this.ctx.request.body
        let student = {
            stu_name,
            stu_password: this.ctx.service.tools.md5(stu_password),
            stu_sex,
            stu_age,
            stu_intr
        }
        let result = await this.ctx.service.student.add(student)
        if (result.flag) {
            await this.success("/admin/manger/people", result.msg)
        } else {
            await this.fail("/admin/manger/people", result.msg)
        }

    }
    // 显示 添加
    async add() {
        await this.ctx.render("/admin/student/add")
    }
    async checkclass(){
        
        // 回显用到： let checkedclass = await this.ctx.service.class.findAllWithChecked(stu_id);
        let classresult = await this.ctx.service.class.findCheckClass(this.ctx.session.info.info._id);
        // let checkclass = await this.ctx.service.student.findcheckclass(this.ctx.session.info.info._id);
        if(classresult.flag){
            let classes = classresult.data;
      
            await this.ctx.render('/admin/class/checkclass',{classes})
        }else{
            this.ctx.body = '目前没有任何课程';
        }
    }
    async addclass(){
        let stu_id = this.ctx.session.info.info._id;
        let class_id = this.ctx.request.query.classid;
        let stu_class_point = {
            stu_id,class_id,stu_point:'0'
        }
        // console.log(stu_class_point);
        let result = await this.ctx.service.student.addclass(stu_class_point)
        if (result.flag) {
            // let {identity} = this.ctx.session.type
            await this.success("/admin/student/checkclass", result.msg)
        } else {
            await this.fail("/admin/student/checkclass", result.msg)
        }

    }
    // 处理 修改
    async doedit() {
        var { ctx } = this
        let body = ctx.request.body;
        console.log(body);
        let { _id} = body
        
        let result = await ctx.service.student.edit(_id, body)
        console.log(result);
        if (result.flag) {
            await this.success("/admin/manger/people", result.msg)
        } else {
            await this.fail("/admin/student/edit", result.msg)
        }
    }
    //显示 修改
    async edit() {
        var id = this.ctx.request.query.id
        let result = await this.ctx.service.student.findById(id)
    
        if (result.flag) {
            let stu = result.data
            await this.ctx.render("/admin/student/edit", {stu })
        } else {
            this.ctx.body = result.msg
        }
    }
    // 处理 删除
    async remove() {
        let id = this.ctx.request.query.id;

        let result = await this.ctx.service.student.delete(id)

        if (result.flag) {
            await this.success("/admin/manger/people", result.msg)
        } else {
            await this.fail("/admin/manger/people", result.msg)
        }
    }

    async info(){
        let student = this.ctx.session.info.info
        await this.ctx.render("/admin/student/list",{student})
    }

  
}

module.exports = StudentController
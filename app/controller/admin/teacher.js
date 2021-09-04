// const { Controller } = require("egg")

const BaseController = require("./base")
class StaffController extends BaseController {
    // 显示列表
    async info() {
        let { _id } = this.ctx.session.info.info
        let result = await this.ctx.service.teacher.findById(_id)
        console.log('result',result);
        let url = await this.ctx.service.newImg.read(_id)
        if (result.flag) {
            await this.ctx.render("/admin/teacher/list", { info: result.data ,url})
        } else {
            await this.fail("/admin/teacher/list", result.msg)
        }

    }
 
    async edit() {
        let te_id = this.ctx.request.query.te_id
        //   console.log(te_id);
        // let info = this.ctx.session.info.info
       
        let url = await this.ctx.service.newImg.read(te_id)
        console.log(url);
        let result = await this.ctx.service.teacher.findById(te_id)


        if (result.flag) {
            // console.log(result.data, "2222");
            await this.ctx.render("/admin/teacher/infomodify", { te: result.data, url })
        } else {
            await this.fail("/admin/teacher/info", result.msg)
        }
    }
    async doedit() {
        let body = this.ctx.request.body
        let { te_id } = body
        console.log(body, te_id, "111111");
        // let info = this.ctx.session.info.info
        // let result = await this.ctx.service.teacher.edit(te_id, body)
        let imgresult = await this.ctx.service.upload.uploadImg();
        // console.log(result)
        console.log(imgresult)
        if (imgresult.flag) {
            await this.success("/admin/teacher/info", imgresult.msg)
        } else {
            await this.fail("/admin/teacher/modify", "更新失败")
        }
    }
    // 处理添加
    async doadd() {
        // console.log(this.ctx.request.body);
        let { te_name, te_password, te_sex, te_age, te_level, te_intr } = this.ctx.request.body
        let teacher = {
            te_name,
            te_password: this.ctx.service.tools.md5(te_password),
            te_sex,
            te_age,
            te_level,
            te_intr
        }
        console.log(teacher);
        let result = await this.ctx.service.teacher.add(teacher)
        if (result.flag) {

            await this.success("/admin/manger/people", result.msg)
        } else {

            await this.fail("/admin/manger/people", result.msg)
        }

    }
    //查询 所有考试 的学生
    async text() {
        let result1 = await this.ctx.service.teacher.findCheckClass(this.ctx.session.info.info);
        if (result1.flag) {
            let classArr = result1.data;
            let checkclassArr = []
            let endResult = []
            //查询 该教师所教的所有科目
            for (const value of classArr) {
                if (value.checked) {
                    checkclassArr.push(value)
                }
            }
            // 对于所教的科目 查找所选课的学生
            for (const itemClass of checkclassArr) {
                let result = await this.ctx.service.student.findcheckclass(itemClass._id)
                if (result.flag) {
                    let classArr = result.data;
                    let stu = []
                    let point = []
                    for (const stuItem of classArr) {
                        stu.push(stuItem.stu_id)
                        point.push(stuItem.stu_point)
                    }
                    //  console.log(point);
                    //  console.log(stu); 
                    let i = 0
                    for (const id of stu) {
                        let stuResult = await this.ctx.service.student.findById(id)
                        let stuobj = {}
                        // console.log(stuResult);
                        // 把学生的信息，成绩，返回给模板
                        stuobj.stu_name = stuResult.data.stu_name;
                        stuobj.stu_point = point[i++];
                        stuobj.stu_id = id
                        stuobj.class_name = itemClass.class_name;
                        stuobj.class_id = itemClass._id
                        endResult.push(stuobj)
                    }

                }
            }
            //    console.log(endResult);
            await this.ctx.render("/admin/teacher/modify", { endResult, checkclassArr })
        }
    }
    // 显示 添加
    async add() {
        await this.ctx.render("/admin/teacher/add")

    }
    // 处理 修改 分数
    async dotext() {
        var { ctx } = this
        let body = ctx.request.body;
        console.log(body);
        let { stu_id, stu_point, class_id } = body
        let result = await ctx.service.student.doupdate(stu_id, class_id, stu_point)
        // console.log(result);
        if (result.flag) {
            await this.success("/admin/teacher/text", result.msg)
        } else {
            await this.fail("/admin/teacher/text", result.msg)
        }
    }


    // 处理 删除
    async remove() {
        let id = this.ctx.request.query.id;

        let result = await this.ctx.service.teacher.delete(id)

        if (result.flag) {
            await this.success("/admin/manger/people", result.msg)
        } else {
            await this.fail("/admin/manger/people", result.msg)
        }
    }
    // 显示 当前教师授课界面
    async teachclass() {
        // let te_id; // 教师id
        let result1 = await this.ctx.service.teacher.findCheckClass(this.ctx.session.info.info);
        // 查询所有课程
        let classes = result1.data;
        await this.ctx.render("/admin/teacher/tclass", { classes })
    }
    async addclass() {
        let { classid, classAuth } = this.ctx.request.query;
        console.log(classAuth, 11);
        let { _id } = this.ctx.session.info.info;
        // console.log(this.ctx.request.query);
        let te_class = {
            te_id: _id,
            class_id: classid
        }
        let result;
        if (classAuth) {
            result = await this.ctx.service.teacher.addclass(te_class)
        } else {
            // console.log(classAuth);
            result = await this.ctx.service.teacher.deleteclass(te_class)
        }

        // console.log(te_class);
        if (result.flag) {
            await this.success('/admin/teacher/plan', result.msg);
        } else {
            await this.fail('/admin/teacher/plan', result.msg);
        }
    }

    async arrage() {
        let { _id } = this.ctx.session.info.info
        let result = await this.ctx.service.teacher.findCheckClass(_id)
        let arr = []
        if (result.flag) {
            for (const value of result.data) {
                if (value.checked) {
                    arr.push(value)
                }
            }
            let textResult = await this.ctx.service.level.textArrage(arr)
            if (textResult.flag) {
                // console.log(textResult.data);
                let classes = textResult.data
                await this.ctx.render("/admin/level/te_list", { classes })
            }
            // console.log(arr);
        }
    }
}
module.exports = StaffController
const { Service } = require("egg")

class StaffService extends Service {
    // 通过 username 查询
    async find(username) {
        let result = await this.ctx.model.Staff.findOne({ username })
        if (result) {
            return {
                flag: true,
                data: result,
                msg: "数据查询成功"
            }
        } else {
            return {
                flag: false,
                msg: "数据查询失败"
            }
        }
    }
    // 通过 账号，密码 查询
    async findtwo(stu_name, stu_password) {
        return await this.ctx.model.Student.findOne({ stu_name, stu_password })
    }
    //查询 所有
    async findAll() {
        let result = await this.ctx.model.Student.find()
        if (result) {
            return {
                flag: true,
                data: result,
                msg: "数据查询成功"
            }
        } else {
            return {
                flag: false,
                msg: "数据查询失败"
            }
        }
    }


    // 增加
    async add(student) {
        let result = await this.ctx.model.Student.create(student)
        if (result) {
            return {
                flag: true,
                msg: "保存数据成功"
            }
        } else {
            return {
                flag: false,
                msg: "保存数据失败"
            }
        }
        // let { username, password } = staff
        // let staffinfo = await this.find(username, password)

        // if (staffinfo.length>0) {
        //     return {
        //         flag: false,
        //         msg: "用户名已存在",
        //     }
        // } else {
        //     let staffinfos = new this.ctx.model.Staff(staff)
        //     let staffresult = await staffinfos.save();
        //     if (staffresult) {
        //         return {
        //             flag: true,
        //             msg: "保存数据成功"
        //         }
        //     } else {
        //         return {
        //             flag: false,
        //             msg: "保存数据失败"
        //         }
        //     }

        // }
    }
    //通过 ID 进行查询
    async findById(id) {
        let result = await this.ctx.model.Student.findById(id)
        if (result) {
            return {
                flag: true,
                data: result,
                msg: "数据查询成功"
            }
        } else {
            return {
                flag: false,
                msg: "数据查询失败"
            }
        }
    }
    // 通过ID进行修改
    async edit(id, stu) {
        let infos = await this.ctx.model.Student.updateOne({ _id: id }, stu)
        if (infos.nModified > 0) {
            return {
                flag: true,
                msg: "修改数据成功"
            }
        } else if (infos.nModified == 0) {
            return {
                flag: false,
                msg: "请确认修改信息"
            }
        } else {
            return {
                flag: false,
                msg: "修改数据失败"
            }
        }
    }

    // 删除
    async delete(id) {

        let result = await this.ctx.model.Student.deleteOne({ _id: id })
        let resultchheck = await this.ctx.model.StuCheckClass.deleteMany({ stu_id: id })
        //  console.log(result); { n: 1, ok: 1, deletedCount: 1 }
        if (result.deletedCount > 0 && (resultchheck.deletedCount > 0 || resultchheck.deletedCount == 0)) {
            return {
                flag: true,
                data: result,
                msg: "数据删除成功"
            }
        } else {
            return {
                flag: false,
                msg: "数据删除失败"
            }
        }
    }

    async doupdate(stu_id, class_id, stu_point) {

        let result = await this.ctx.model.StuCheckClass.updateOne({ stu_id, class_id }, { $set: { stu_point } })
        //  console.log(result); { n: 1, ok: 1, deletedCount: 1 }
        console.log(result);
        if (result.nModified > 0) {
            return {
                flag: true,
                data: result,
                msg: "数据更新成功"
            }
        } else {
            return {
                flag: false,
                msg: "数据跟新失败"
            }
        }
    }
    // 增加

    async addclass(stu_class_point) {
        //  console.log(this.ctx.model);
        let stuClassPointresult = this.ctx.model.StuCheckClass.create(stu_class_point)
        if (stuClassPointresult) {
            return {
                flag: true,
                msg: "课程添加成功"
            }
        } else {
            return {
                flag: false,
                msg: "课程添加失败"
            }
        }
    }
    //根据课程id 查学生
    async findcheckclass(class_id) {


        let stuCheckClassresult = await this.ctx.model.StuCheckClass.find({ class_id })
        // console.log(stuCheckClassresult);
        if (stuCheckClassresult) {
            return {
                flag: true,
                msg: "选中课程查询成功",
                data: stuCheckClassresult
            }
        } else {
            return {
                flag: false,
                msg: "选中课程查询失败"
            }
        }
    }
}

module.exports = StaffService
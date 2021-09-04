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
        let result = await this.ctx.model.Level.find()
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
    async add(level) {
        let result = await this.ctx.model.Level.create(level)
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
        let result = await this.ctx.model.Level.findById(id)
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
    async edit(id, text) {
        let result = await this.ctx.model.Level.updateOne({_id:id},text)
        if(result.nModified>0){
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
    // 删除
    async delete(id) {

        let result = await this.ctx.model.Staff.deleteOne({ _id: id })
        //  console.log(result); { n: 1, ok: 1, deletedCount: 1 }
        if (result.deletedCount > 0) {
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

    async doupdate(stu_id, stu_point) {

        let result = await this.ctx.model.StuCheckClass.updateOne({ stu_id }, { stu_point })
        //  console.log(result); { n: 1, ok: 1, deletedCount: 1 }
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
    async textArrage(arr) {
        let newArr = []
        let result = await this.findAll()
        if (result.flag) {
            for (const item of arr) {
                for (const text of result.data) {
                    if (item.class_name.toString() == text.level_cname.toString()) {
                        newArr.push(text)
                    }
                }
            }
            return {
                flag: true,
                data: newArr,
                msg: "查询已交的考试安排成功"
            }
        }
        return {
            flag: false,
            msg: "查询已交的考试安排失败"
        }

    }
}

module.exports = StaffService
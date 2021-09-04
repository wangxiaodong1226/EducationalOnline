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
    async findtwo(username, password) {
        return await this.ctx.model.Staff.findOne({ username, password })
    }
    //查询 所有
    async findAll() {
        let result = await this.ctx.model.StuAnn.find()
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
    async add(stuann) {

        let result = await this.ctx.model.StuAnn.create(stuann)
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
        let result = await this.ctx.model.Staff.findById(id)
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
    async edit(id, staff) {
        let originStaff = await this.ctx.model.Staff.findById(id);
        if (originStaff.username == staff.username) {
            let roleinfos = await this.ctx.model.Staff.updateOne({ _id: id }, staff)
            if (roleinfos.nModified > 0) {
                return {
                    flag: true,
                    msg: "修改数据成功"
                }
            } else if(roleinfos.nModified == 0){
                return {
                    flag: false,
                    msg: "请确认修改信息"
                }
            }else{
                return {
                    flag: false,
                    msg: "修改数据失败"
                }
            }
        }else{
            let otherStaff = await this.find(staff.username)
            if(otherStaff.flag){
                return {
                    flag:false,
                    msg:"用户名已存在"
                }
            }else{ 
                //  { n: 1, nModified: 1, ok: 1 }
                let roleinfos = await this.ctx.model.Staff.updateOne({ _id: id }, staff)
                if (roleinfos.nModified > 0) {
                    return {
                        flag: true,
                        msg: "修改数据成功"
                    }
                }else if(roleinfos.nModified == 0){
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
}

module.exports = StaffService
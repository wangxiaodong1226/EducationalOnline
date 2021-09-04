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
    async findtwo(admin_name, admin_password) {
        // console.log(admin_name,admin_password);

        return await this.ctx.model.Manger.findOne({ admin_name, admin_password })
    }
    //查询 所有
    async findAll() {
        let result = await this.ctx.model.Staff.aggregate(
            [
                // {
                //     $match:{status:1}
                // },
                {
                    $lookup: {
                        from: "roles",
                        localField: "role_id",
                        foreignField: "_id",
                        as: "role"
                    }
                }
            ]
        )
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
    async add(manger) {
        let result = await this.ctx.model.Manger.create(manger)
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
    }
    //通过 ID 进行查询
    async findById(id) {
        let result = await this.ctx.model.Manger.findById(id)
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
    async uphold(accessRole) {
       let {teacherAccess,studentAccess} = accessRole
        this.ctx.session.teacherAccess = teacherAccess
        this.ctx.session.studentAccess = studentAccess 
  }
}

module.exports = StaffService
const { Service } = require("egg")

class StaffService extends Service {


    async findCheckClass(te_id) {
        let classAll = await this.ctx.model.Class.find()
        let checkClass  = await this.ctx.model.Teclass.find({te_id})
         let Allarr = []
         let checkarr = []
          for (const value of classAll) {
            Allarr.push(value)
          }
          for (const value of checkClass) {
            checkarr.push(value.class_id.toString())
          }
          for (const item of Allarr) {
              if(checkarr.indexOf(item._id.toString()) !== -1){
                  item.checked = true
              }
          }
        if (classAll&&classAll.length) {
            return {
                flag: true,
                data:classAll,
                msg: "数据查询成功1"
            }
        } else {
            return {
                flag: false,
                msg: "数据查询失败1"
            }
        }
    }
    async addclass(te_class){
        //  console.log(this.ctx.model);
            let teClassPointresult = await this.ctx.model.Teclass.create(te_class)
            if(teClassPointresult){
         
                return {
                    flag: true,
                    msg: "课程添加成功"
                }
            }else{
                return {
                    flag : false,
                    msg : "课程添加失败"
                }
            }
        }
    async deleteclass(te_class){
        //  console.log(this.ctx.model);
        console.log(te_class);
            let teClassPointresult = await this.ctx.model.Teclass.deleteOne({te_id:te_class.te_id,class_id:te_class.class_id})
         console.log(teClassPointresult);
            if(teClassPointresult.deletedCount > 0){
                return {
                    flag: true,
                    msg: "课程删除成功"
                }
            }else{
                return {
                    flag : false,
                    msg : "课程删除失败"
                }
            }
        }
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
    async findtwo(te_name, te_password) {
        return await this.ctx.model.Teacher.findOne({ te_name, te_password })
    }
    //查询 所有
    async findAll() {
        let result = await this.ctx.model.Teacher.find()
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
    async add(teacher) {
        let result = await this.ctx.model.Teacher.create(teacher)
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
    async findById(_id) {
        let result = await this.ctx.model.Teacher.findById(_id)
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
    async edit(_id,body) {
      let result = await this.ctx.model.Teacher.updateOne({_id},body)
      console.log(result);
      if(result.nModified>0){
          return {
              flag:true,
              msg:"修改数据成功"
          }
      }else{
        return {
            flag:false,
            msg:"修改数据失败"
        }
      }
      

    }


    // 删除
    async delete(id) {

        let result = await this.ctx.model.Teacher.deleteOne({ _id: id })
        let resultTea = await this.ctx.model.Teclass.deleteMany({ te_id: id })

        //  console.log(result); { n: 1, ok: 1, deletedCount: 1 }
        if (result.deletedCount > 0 && (resultTea.deletedCount > 0 || resultTea.deletedCount == 0)) {
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
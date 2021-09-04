// const {Controller} = require("egg")
const BaseController = require("./base")
class AdminController extends BaseController{
    //首页 
     async  home(){
         //查看全局 
        let {type} = this.ctx.params
        let {info} = this.ctx.session.info
        console.log('this.ctx.session.info',info);
        console.log(typeof type);
        switch (type) {
            case "0":
                await this.ctx.render("/admin/student/index",{info}) 
                break;
            case "1":
                await this.ctx.render("/admin/teacher/index",{info}) 
                break;
            case "2":
                await this.ctx.render("/admin/manger/index",{info}) 
                break;
        }
      
        
    }
    async addlevel(){
        //  console.log(this.ctx.request.body)
         let {level_cname,level_ctime,level_carea} =  this.ctx.request.body
         let levelobj = {level_cname,level_ctime,level_carea}
         let result = await this.ctx.service.level.add(levelobj)
         if(result.flag){
             await this.success("/admin/level/arrage",result.msg)
         }else{
            await this.fail("/admin/level/arrage",result.msg)
         }
    } 
    async level(){
        await this.ctx.render("/admin/level/add")
    }

    async arrage(){
        let result =await  this.ctx.service.level.findAll()
        if(result.flag){
            let classes = result.data;
            await this.ctx.render("/admin/level/stu_list",{classes})
        }else {
            // await this.fail(`/adminIndetity/${this.ctx.session.type.identity}`, result.msg)
        }
          
    }
    async edit() {
        let _id = this.ctx.request.query.id
        //   console.log(te_id);
        // let info = this.ctx.session.info.info
        let result = await this.ctx.service.level.findById(_id)
        if (result.flag) {
        
            await this.ctx.render("/admin/level/edit", { class: result.data })
        } else {
            await this.fail("/admin/level/arrage", result.msg)
        }
    }
    async doedit() {
        let body = this.ctx.request.body
        let { _id } = body
        //   console.log(te_id,body);
        // let info = this.ctx.session.info.info
        let result = await this.ctx.service.level.edit(_id, body)
        // console.log(result)
        if (result.flag) {
            await this.success("/admin/level/arrage", result.msg)
        } else {
            await this.fail("/admin/teacher/leveledit", result.msg)
        }
    }
}

module.exports = AdminController

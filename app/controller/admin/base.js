const {Controller} = require("egg")

class BaseController extends Controller{
    async success(url,msg){
        await this.ctx.render("/admin/common/success",{url,msg})
    }
    async fail(url,msg){
        await this.ctx.render("/admin/common/fail",{url,msg})
    }

    async face(){
        
    }
}

module.exports = BaseController
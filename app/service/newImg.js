
const {Service} = require("egg")
const fs = require("fs")
 
// md5 加密
class ReadService extends Service{
    async read(te_id) {
        return new Promise((resolve) => {
            let url
            const type = this.ctx.session.type.identity
            let path = `app/public/temporary/${type}type/${te_id}`
            fs.readdir(path, function (err, files) {
                console.log(files, "------");
                url = files.pop()
                url = `/public/temporary/${type}type/${te_id}/${url}`
                resolve(url)
            })
        })
    }
    
}

module.exports = ReadService
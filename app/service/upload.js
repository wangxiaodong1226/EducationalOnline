const { Service } = require("egg")
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
class IMGService extends Service {
    async uploadImg() {
        // 获取文件流
        
         let stream = await this.ctx.getFileStream();
            console.log(stream);
            // 定义文件名
            const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
            // 目标文件
            // console.log(this.ctx.session);
            const type = this.ctx.session.type.identity
            const ident = type == "1" ? "te_id" : "stu_id"
            const dirName = stream.fields[ident]
            try {
                fs.accessSync(path.join(`app/public/temporary/${type}type/${dirName}`))
            } catch {
                fs.mkdirSync(path.join(`app/public/temporary/${type}type/${dirName}`))
            } finally {

                const target = path.join(`app/public/temporary/${type}type/${dirName}`, filename);
                
                console.log(target, filename);
                const writeStream = fs.createWriteStream(target);
                console.log('-----------获取表单中其它数据 start--------------');
                console.log(stream.fields);
                console.log('-----------获取表单中其它数据 end--------------');
                try {
                    //异步把文件流 写入
                    await awaitWriteStream(stream.pipe(writeStream));
                    return {
                        flag: true,
                        msg: "更新成功"
                    }
                } catch (err) {
                    //如果出现错误，关闭管道
                    await sendToWormhole(stream);
                    // 自定义方法
                    return {
                        flag: false,
                        msg: '更新失败'
                    }
                }
                // 自定义方法
            }


        } 
}

module.exports = IMGService
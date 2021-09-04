const dateformat = require("dateformat")
 // 设置 复杂的js代码 ，在全局的 helper身上
module.exports = {
    timeDate(time) {
      return  dateformat(new Date(time),"yyyy-mm-dd HH:MM:ss")
    },
  };
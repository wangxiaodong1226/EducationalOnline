const config = {}

config.keys="123456"
//配置 模板引擎 
config.view = {
    defaultViewEngine:"nunjucks",//默认的模板引擎
    mapping:{
        ".html":"nunjucks"  //后缀名 用什么模板
    }
}

config.security = {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  }

config.mongoose = {
    client: {
        url: 'mongodb://127.0.0.1:27017/rbac2020',
        options:{}
      },
  }
  /*
    1.可以实现 同一个浏览器访问同一个域的时候 不同页面之间数据共享

    2.实现数据持久化，（关闭浏览器重新打开以后数据依然存在） 默认情况 浏览器关闭以后就销毁了 如果想不销毁 要配置参数 
    
  */
// 配置session 
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24* 3600*1000, // 20 秒
    httpOnly: true,  //客户端无法获取cookie信息  ，不允许被 js 访问
    //encrypt: true,  //加密cookie 在发送 Cookie 前会对这个键值对的值进行加密，客户端无法读取到 Cookie 的明文值
  };
//配置中间件
  // config.middleware= [ 'accessAuth' ],
  // config.accessAuth= {
  //   enable:true, //中间件的开关
  //   match: '/admin', //匹配/xxx开头的 走中间件
  // },
  config.middleware= [ 'upHold' ],
  config.upHold= {
    enable:true, //中间件的开关
    match: '/adminIndetity', //匹配/xxx开头的 走中间件
  },

  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['jpg', '.png', ".jpeg"], // 扩展几种上传的文件格式
  };
module.exports = config
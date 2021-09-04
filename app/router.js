module.exports = app =>{
    const {router,controller} = app 

   //后台
   
    router.get("/adminIndetity/:type",controller.admin.index.home)

   //后台登录
    router.get("/admin/login",controller.admin.login.login)

    router.get("/admin/logout",controller.admin.login.logout)
    //后台欢迎页面
    router.get("/admin/welcome",controller.admin.login.welcome)
    //密码
    router.post("/admin/motifyPass",controller.admin.login.motifyPass)
    router.get("/admin/pass",controller.admin.login.pass)
    
    //考试安排
    router.post("/admin/dolevel",controller.admin.index.addlevel)
    router.get("/admin/level",controller.admin.index.level)

   //人脸识别
    router.post("/veirface",controller.admin.base.face)

    // 后台获取验证码
    router.get("/admin/vertify",controller.admin.login.vertify)

    // 后台处理登录
    router.post("/admin/dologin",controller.admin.login.dologin)

    
    // 管理员：系统维护，人员管理
    // 学生，个人成绩查询，课程课表，选课，等级考试报名。
    // 老师：教师管理，教学计划安排，学生考试安排，修改学生分数 
    // 共有：登录，个人信息修改，公告，修改密码
    
    //老师
    // 添加
    router.get("/admin/teacher/add",controller.admin.teacher.add)
    router.post("/admin/teacher/doadd",controller.admin.teacher.doadd)
    //选课
    router.get("/admin/teacher/teachclass",controller.admin.teacher.addclass)
    router.get("/admin/teacher/addclass",controller.admin.teacher.addclass)
    //教师授课页面
    router.get("/admin/teacher/plan",controller.admin.teacher.teachclass)
    router.get("/admin/teacher/doplan",controller.admin.teacher.addclass)
    
    router.get("/admin/teacher/text",controller.admin.teacher.text)
    router.post("/admin/teacher/dotext",controller.admin.teacher.dotext)
   
    router.get("/admin/teacher/info",controller.admin.teacher.info)
    router.get("/admin/teacher/remove",controller.admin.teacher.remove)
   //个人信息修改
    router.get("/admin/teacher/modify",controller.admin.teacher.edit)
    router.post("/admin/teacher/doinfomodify",controller.admin.teacher.doedit)
   //考试安排
    router.get("/admin/level/arrage",controller.admin.teacher.arrage)
    router.get("/admin/teacher/leveledit",controller.admin.index.edit)
    router.post("/admin/teacher/leveledoedit",controller.admin.index.doedit)
  

    //课程
    router.get("/admin/class/add",controller.admin.class.add)
    router.post("/admin/class/doadd",controller.admin.class.doadd)
    
    //公告
    router.get("/admin/stuann/add",controller.admin.stuann.add)
    router.get("/admin/stuann/list",controller.admin.stuann.list)
    router.post("/admin/stuann/doadd",controller.admin.stuann.doadd)
    

    //学生
    router.get("/addstudent",controller.admin.student.add)
    router.post("/admin/student/doadd",controller.admin.student.doadd)
    
    router.get("/admin/student/checkclass",controller.admin.student.checkclass)
    router.get("/admin/student/addclass",controller.admin.student.addclass)
   
    router.get("/admin/student/info",controller.admin.student.info)
    router.get("/admin/stuann/arrage",controller.admin.index.arrage)
  
    router.get("/admin/student/remove",controller.admin.student.remove)
    router.get("/admin/student/edit",controller.admin.student.edit)
    router.post("/admin/student/doedit",controller.admin.student.doedit)
     
    //管理员
    router.post("/admin/manger/doadd",controller.admin.manger.doadd)
    router.get("/admin/manger/add",controller.admin.manger.add)
   
    router.get("/admin/manger/info",controller.admin.manger.info)
    // 全体人员
    router.get("/admin/manger/people",controller.admin.manger.people)
    // c系统维护
    router.get("/admin/manger/uphold",controller.admin.manger.uphold)
    router.post("/admin/manger/douphold",controller.admin.manger.douphold)
    router.get("/admin/manger/info",controller.admin.manger.info)
}
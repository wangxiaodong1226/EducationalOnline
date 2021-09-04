$(function () {
    app.initAside()
    app.initHeight()
})

var app = {
    initHeight(){
        var height = document.documentElement.clientHeight;
        // console.log(height);
        $("iframe").height(height) 
        // console.log($(document.getElementsByTagName("iframe")[0].parentNode).width());
        $("iframe").width($(document.getElementsByTagName("iframe")[0].parentNode).width()) 
    },
    initAside(){
        $(".text-center ul").hide()
        $(".text-center h4").on("click",function () {
            $(this).siblings("ul").slideToggle()
        })
    }
}
//套件
//1.內建2.自己做3.別人做

const http = require("http")

const server = http.createServer((request , response)=>{
    console.log(request.url)
    let path = request.url;
    response.setHeader("Content-Type","text/html;charset=UTF-8") //UTF-8
    switch(path){
        case "/":
            response.end("這是首頁")
            break;
        case "/member":
            response.end("這是會員頁")
            break;
        default:
            response.statusCode = 404;
    }
    response.end("Hello Node");

});

server.listen(3005,()=>{
    console.log("網站伺服器啟動 在3005")
})
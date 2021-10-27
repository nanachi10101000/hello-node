const fs = require("fs");


// fs.readFile("input.txt" , "utf-8",(err , data) =>{
// if(err) {
//     console.error("發生錯誤" , err);
// } else {
//     console.log("拿到資料:",data);
// }
// })


let p = readFilePromise();
p.then((data)=>{
    console.log("P成功" , data);
})
.catch((err)=>{
    console.log("P失敗" , err)
})


function readFilePromise(){
     return new Promise((resolve , reject)=>{
        fs.readFile("input.txt" , "utf-8",(err , data) =>{
            if(err) {
                reject("發生錯誤" + err);
            } else {
                resolve("拿到資料:"+data);
            }
            })
    });
}

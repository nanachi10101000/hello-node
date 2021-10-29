const express = require("express");

let app = express(); // application

// 路由 route / router
// app.Method(Path, Handler)
// Method: GET, POST, PUT, DELETE, PATCH, ...
// Handler 是一個函式，會有兩個參數 request, response
app.get("/", (req, res) => {
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res) => {
  res.send("我是會員頁");
});


app.listen(3006, () => {
  console.log("express app 啟動 port3006");
});
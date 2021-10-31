const express = require("express");
const path = require("path");
require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST, // 本機 127.0.0.1
  port: process.env.DB_PORT, // 埠號 mysql 預設就是 3306
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

let app = express(); // application

// cors
// https://www.npmjs.com/package/cors
const cors = require("cors");
// let corsOptions = {
//   origin: "*", // 全部
// };
app.use(cors());

app.use(express.static("static"));
//localhost:3001/about.html

// app.use(PATH, express.static(檔案夾))
// express.static(檔案夾名稱) 是內建的中間件
http: app.use("/static", express.static("static"));
// http://localhost:3001/static/about.html

// app.set 設定這個 application 的一些變數
// views: 告訴 app view 的檔案夾是哪一個
// view engine: 告訴 app 你用哪一種 view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use 告訴 express 這裡有一個中間件(middleware)
// middleware 只是一個函式，會有三個參數
app.use((req, res, next) => {
  console.log("我是 AAAA 中間件");

  // 如果沒有 next，那就停在這裡
  next();
  // next 可以讓他往下一關前進
  // 但是目前這個中間件「不需要」知道下一個知道
});

app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來訪問 at ${current.toISOString()}`);

  // 完全不關心 next 是誰
  // 只知道要給下一個
  next();
  // 低耦合
});

// 路由 route / router --> 其實也算是一種中間件
// app.Method(Path, Handler)
// Method: GET, POST, PUT, DELETE, PATCH, ...
// Handler 是一個函式，會有兩個參數 request, response
app.get("/", (req, res) => {
  console.log("我是首頁");
  // res.send("我是 Express 首頁");
  // 告訴 express 這個路由要用的樣板檔案是哪一個
  let data = {
    name: "ashley",
    job: "engineer",
    cities: ["Taipei", "YiLan"],
  };
  res.render("index", data);
});

app.get("/member", (req, res, next) => {
  console.log("我是會員頁 1");
  // res.send("我是會員頁");
  next();
});

app.get("/member", (req, res) => {
  console.log("我是會員頁 2");
  res.send("我是會員頁");
});

app.get("/api/test", (req, res) => {
  res.json({
    name: "ashley",
    job: "engineer",
  });
});

// 列表：全部資料
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

// /api/todos/24
// 根據 id 取得單筆資料
app.get("/api/todos/:todoId", async (req, res) => {
  // req.params.todoId
  let data = await connection.queryAsync("SELECT * FROM todos WHERE id = ?;", [
    req.params.todoId,
  ]);

  // Ａ直接把陣列回給前端
  // res.json(data);
  if (data.length > 0) {
    // Ｂ只回覆一個物件
    res.json(data[0]);
  } else {
    // ? 空的
    // /api/todos/44
    // res.send(null);
    res.status(404).send("Not Found");
    // 都可以，但是團隊一致
  }
});

// 這個中間件是負責做紀錄
app.use((req, res, next) => {
  console.log(`${req.url} 找不到路由`);
  next();
});

// 既然會走到所有路由後面的這個中間件
// 就表示前面所有路由中間件的 path 都比不到
// --> 404 !!
app.use((req, res, next) => {
  console.log("我是路由後面的中間件");
  res.status(404).send("Not Found");
});

// 3001 port
app.listen(3001, () => {
  connection.connect();
  console.log("express app 啟動了喔");
});
const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require('dotenv').config();

let today = moment().format("YYYYMMDD");
let format = "json";

const connection = mysql.createConnection({
  
  host: process.env["DB_HOST"], // 本機 127.0.0.1
  // port: 3306, // 埠號 mysql 預設就是 3306
  user: process.env["DB_USER"],
  password: process.env["DB_PASS"],
  database: process.env["DB_DATABASE"],
});


connection.connect();


function insertPromise(insData){
    new Promise((resolve, reject) => {
        connection.query("insert IGNORE into stock (stock_no, date, deal, amount, count) values (?,?,?,?,?)", insData,(err, results) => {  
            if(err){
                console.error("發生錯誤", err);
            }else{
                console.log("db成功", results);
            }
        })
    })
}

getStockData(format, today);
async function getStockData(format, today){
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log("stockCode", stockCode);

    let get = await axios
    .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
      params: {
        response: format,
        date: today,
        stockNo: stockCode,
      },
    })
    let firstdata = get.data.data[0];
    let insData =
    [
     stockCode,
     firstdata[0],
     firstdata[1],
     firstdata[2],
     firstdata[8]
    ];
    insertPromise(insData)
    connection.end();
};

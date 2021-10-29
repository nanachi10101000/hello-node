const axios = require("axios");

var mysql      = require('mysql');

require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env["DB_HOST"], // 本機 127.0.0.1
  // port: 3306, // 埠號 mysql 預設就是 3306
  user: process.env["DB_USER"],
  password: process.env["DB_PASS"],
  database: process.env["DB_DATABASE"],
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
connection.end();

let stockCode = "0050";
let today = "20211022";
let format = "json";

// "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=" + format + "&date=" + today + "&stockNo=" + stockCode
// `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=${format}&date=${today}&stockNo=${stockCode}`

// axios
//   .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//     params: {
//       response: format,
//       date: today,
//       stockNo: stockCode,
//     },
//   })
//   .then((res) => {
//     // HTTP response
//     console.log(res.data);
//   })
//   .catch((e) => {
//     console.error("發生錯誤啦", e);
//   });

  // async await
async function getData(stockCode, format, today) {
  try {
    let response = await axios.get(
      `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
      {
        params: {
          response: format,
          stockNo: stockCode,
          data: today
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
getData(stockCode, format, today);
 

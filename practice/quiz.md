Q1

```
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    readData(idx);
  }
}

readData(0);
console.log("after");

```

執行結果

```

1
2
3
4
5
...
496
497
498
499
500
after

```
A1

(無使用需放入webapi之函式)

執行readData(0)時,執行for loop，idx從0加到100，是故執行一次idx值增加100，
由於符合<500條件，所以會再執行一次，共五次(1-100,101-200,201-300,301-400,401-500)
當readData(0)執行完畢 call stack會執行console.log("after");
所以當印出500時會印出after.


Q2

```

function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    setTimeout(function () {
      readData(idx);
    }, 0);
  }
}

readData(0);
console.log("after");

```

執行結果

```

1
2
3
4
5
...
99
100
after
101
102
...
496
497
498
499
500

```

A2

(使用放入webapi之函式 setTimeout)

執行readData(0)時,執行for loop，idx從0加到100，是故執行一次idx值增加100，
由於符合<500條件，執行setTimeout，setTimeout會被丟入webapi，再丟進task queue，
此時會先執行完console.log("after");
stack清空後，event loop會把setTimeout裡面的readData(idx)丟進call stack，
執行完接下來的for loop跟setTimeout.


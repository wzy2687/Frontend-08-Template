学习笔记


document 接口不熟悉

```javascript
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement("div") ; //这个我之前不会.   复习document 函数.
                cell.classList.add("cell")
                cell.innerText = p2txt[pattern[i][j]]
                cell.addEventListener("click",()=>move(i,j))
                board.appendChild(cell)
            }
            board.appendChild(document.createElement("br"))
        }
```

克隆的两种方式

```javascript
    function clone(pattern) {
        //return JSON.parse(JSON.stringify(pattern))
        return Object.create(pattern)  //继承了原有的方法和数据.
    }

```


关于promise的理解

[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，
这样我们就不需要在一开始把回调函数作为参数传入这个函数了。

```javascript
aPromiseObj = new Promise(...);  //本质上 Promise 是一个函数返回的对象
aPromiseObj.then(callback_1, callback_2);//我们可以在它上面绑定回调函数

```


#学号:G20200447080056
#班期:第8期
#小组:第2组
#作业&总结链接:https://github.com/wzy2687/Frontend-08-Template/tree/main/Week%2001


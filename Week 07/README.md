# 作业讲解

由于本周作业整体完成情况非常不好，可能由于作业题目不太明确导致同学们没有理解到题目意思，这里把作业统一讲解一下。希望同学们能够抽时间重新完成一下本周作业。

## 一、练习：完成 StringToNumber 和 NumberToString 两个函数

该题目视频中说明了需要支持 4 种进制的字符串数字相互转换，因此两个函数都需要包含两个参数: [字符串/数字，进制]

### StringToNumber 解题过程

1. 处理符号位

```
function StringToNumber(str, radix = 10) {
    ...
    // 若字符串带有负号，将字符串中的符号位去掉，并单独保存符号
    let sign = 1;
    if (str[0] === '-') {
        sign = -1;
        str = str.substr(1);
    }else if(str[0] === '+'){
        str = str.substr(1);
    }
    ...
}
```

2. 处理整数部分

```
function StringToNumber(str, radix = 10) {
    ...
    // 使用字符串/数组/ASCII码表作为字典
    const dict = '0123456789abcdefghijklmnopqrstuvwxyz';
    let num = 0;
    let i = 0;
    // 遍历字符串每个字符
    for (; i < str.length && str[i] !== '.'; i++) {
        let c = str[i].toLowerCase();
        // 查询字符在字典中的位置表示余数
        let idx = dict.indexOf(c);
        if (idx < 0 || idx >= radix) return i === 0 ? NaN : (num * sign);
        // 已有数字乘以进制表示进位
        num *= radix;
        // 并加上余数
        num += idx;
    }
    ...
}
```

3. 处理小数部分

```
function StringToNumber(str, radix = 10) {
    ...
    // 跳过小数点
    if (str[i] === '.') i++;

    // 遍历小数点后每一位字符
    let fraction = 1;
    for (; i < str.length; i++) {
        // 计算当前精度，以10进制为例, 第一位小数精度为1/10，第二位小数精度为1/100
        // 其他进制同理，比如二进制第一位精度为1/2，则二进制0.1表示十进制的0.5
        fraction /= radix;
        let c = str[i].toLowerCase();
        let idx = dict.indexOf(c);
        if (idx < 0 || idx >= radix) return num * sign;
        // 余数乘以精度得到十进制小数
        num += idx * fraction;
    }
    ...
}
```

3. 返回最后的数字乘以符号位

```
function StringToNumber(str, radix = 10) {
    ...
    return num * sign;
}
```

### NumberToString 解题过程

1. 处理符号位

```
function NumberToString(num, radix = 10) {
    // 若num为负数，则将num转为整数，并用字符串单独保存负号
    let sign = num / Math.abs(num) === -1 ? '-' : '';
    num = Math.abs(num);
    ...
}
```

2. 处理整数部分

```
function NumberToString(num, radix = 10) {
    ...
    // 使用字符串/数组/ASCII 码表作为字典
    const dict = '0123456789abcdefghijklmnopqrstuvwxyz';
    // 分别获取整数部分和小数部分
    let fraction = num - Math.floor(num);
    let integer = num - fraction;

    // 字符串每一位为当前整数mod进制所得的余数以字典值表示
    // 每次取值过后数字退位
    let str = '';
    while (integer !== 0) {
        str = dict[integer % radix] + str;
        integer = Math.floor(integer / radix);
    }
    ...
}
```

3. 处理小数部分

```
function NumberToString(num, radix = 10) {
    ...
    if (fraction !== 0) {
        // 小数位不为0则字符串加上小数点
        str += '.';

        // 循环使用小数部分乘以进制，并取其结果整数部分作为当前小数位
        while (fraction !== 0) {
            let temp = fraction * radix;
            str += dict[Math.floor(temp)];
            fraction = temp - Math.floor(temp);
        }
    }
    ...
}
```

3. 返回结果

```
function StringToNumber(str, radix = 10) {
    ...
    return sign + str;
}
```

完整代码地址：https://github.com/TurnerXi/Frontend-08-Template/blob/master/Week%2007/number.js

> 同学们可以先完成整数部分，完成后使用 parseInt(num,radix?)及 N.toString(radix?)对比结果，整数部分完全理解过后再尝试处理小数部分

## 二、尝试找出 JavaScript 引擎里面 Realm 所有的对象，使用一个 JS 数据可视化的框架去做一个可视化。提交至 GitHub。

1. 首先题目要求找出 JavaScript 引擎里面 Realm 所有的对象，因此不需要包含浏览器特有的对象
2. Realm 表示一个独特的全局环境，包含内置对象及全局对象(在浏览器中为 window，node 中为 global)
3. 该表表示知名的内置对象https://262.ecma-international.org/7.0/#table-7

代码地址：https://github.com/TurnerXi/Frontend-08-Template/blob/master/Week%2007/Realm.js
演示地址：https://turnerxi.github.io/Frontend-08-Template/Week%2007/index.html

# 参考资料

1. [WhatareRealms](https://github.com/tc39/proposal-realms#WhatareRealms)

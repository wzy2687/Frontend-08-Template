function StringToNumber(str, radix = 10) {
    if (!str || radix <= 1 || radix > 36) return NaN;
    // 处理符号位
    let sign = 1;
    if (str[0] === '-') {
        sign = -1;
        str = str.substr(1);
    }

    const dict = '0123456789abcdefghijklmnopqrstuvwxyz';
    let num = 0;
    let i = 0;
    // 处理整数部分
    for (; i < str.length && str[i] !== '.'; i++) {
        let c = str[i].toLowerCase();
        let idx = dict.indexOf(c);
        if (idx < 0 || idx >= radix) return i === 0 ? NaN : (num * sign);
        num *= radix;
        num += idx;
    }

    if (str[i] === '.') i++;
    
    // 处理小数部分
    let fraction = 1;
    for (; i < str.length; i++) {
        fraction /= radix;
        let c = str[i].toLowerCase();
        let idx = dict.indexOf(c);
        if (idx < 0 || idx >= radix) return num * sign;
        num += idx * fraction;
    }

    return num * sign;
}

function NumberToString(num, radix = 10) {
    if (num === 0 || Number.isNaN(num) || typeof num !== 'number') return '0';
    if (num === Infinity) return 'Infinity';
    if (num === -Infinity) return '-Infinity';
    if (radix < 2 || radix > 36) throw Error('Uncaught RangeError: NumberToString() radix argument must be between 2 and 36');

    // c处理符号位
    let sign = num / Math.abs(num) === -1 ? '-' : '';
    num = Math.abs(num);


    const dict = '0123456789abcdefghijklmnopqrstuvwxyz';
    // 分别获取整数部分和小数部分
    let fraction = num - Math.floor(num);
    let integer = num - fraction;

    // 处理整数部分
    let str = '';
    while (integer !== 0) {
        str = dict[integer % radix] + str;
        integer = Math.floor(integer / radix);
    }

    if (fraction !== 0) {
        str += '.';

        // 处理小数部分
        while (fraction !== 0) {
            let temp = fraction * radix;
            str += dict[Math.floor(temp)];
            fraction = temp - Math.floor(temp);
        }
    }
    return sign + str;
}
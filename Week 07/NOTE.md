# 学习笔记

# js 中的对象.

用习惯了c/go 中的struct,  python,cpp 中的class,  Js早期中似乎就没有与之对应的东西.
但是有对象,  总之对应不起来. 这是因为:

```
JavaScript 早年却选择了一个更为冷门的方式：原型. 而非类.
从 ES6 开始，JavaScript 提供了 class 关键字来定义类，

“基于原型”的编程看起来更为提倡程序员去关注一系列对象实例的行为，
而后才去关心如何将这些对象，划分到最近的使用方式相似的原型对象，


基于原型的面向对象系统通过“复制”的方式来创建新对象。

```

如何理解上面的这些, 自然也就不会在javascript中找java中类似的class了. 能理解一些早期
版本的问题.

js 中的 对象的属性和方法 都可以作为属性. 这个好理解, c中的结构体有数据成员, 还有持有函数指针.
这两个可以类比.


理解下面的代码, 能更好的理解系统.

```javascript


var cat = {
    say(){
        console.log("meow~");
    },
    jump(){
        console.log("jump");
    }
}

var tiger = Object.create(cat,  {
    say:{
        writable:true,
        configurable:true,
        enumerable:true,
        value:function(){
            console.log("roar!");
        }
    }
})


var anotherCat = Object.create(cat);

anotherCat.say();

var anotherTiger = Object.create(tiger);

anotherTiger.say();


```

现在学习更推荐用es6 语法.

# 对象的定义

* 对象唯一性
* 对象的状态
* 对象的行为.( **改变对象状态的方式** , 这个确实要理解清楚)

关于两个对象一样是否相等的问题, 本意应该说, 两个对象在计算机占用不同的内容
就是两个东西.  比较的话,因为还有重载==的, 比如cpp.  一些语言执行层面的相等
似乎是可以控制的, 比如cpp.

js代码基础不够, 有些暂无法理解.

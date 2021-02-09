// 1. 列举顶层js引擎内置对象
const globalProperties = [
  "Infinity",
  "NaN",
  "undefined",
  "Function",
  "Object",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "Array",
  "ArrayBuffer",
  "BigInt",
  "BigInt64Array",
  "BigUint64Array",
  "Boolean",
  "DataView",
  "Date",
  "Error",
  "EvalError",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Map",
  "Number",
  "Promise",
  "Proxy",
  "RangeError",
  "ReferenceError",
  "RegExp",
  "Set",
  "SharedArrayBuffer",
  "String",
  "Symbol",
  "SyntaxError",
  "TypeError",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "URIError",
  "WeakMap",
  "WeakSet",
  "Atomics",
  "JSON",
  "Math",
  "Reflect",
];

const Node = (function () {
  let id = 1;
  return function ({
    name,
    path,
    object,
    parent
  }) {
    this.id = id++;
    this.name = name;
    this.path = path;
    this.object = object;
    this.parent = parent;
    this.type = typeof object;
  }
})()

const set = new Set();
const queue = [];
const realms = [];

// 2. 将顶层内置对象作为节点加入队列中
for (const p of globalProperties) {
  if (!!window[p] && (window[p] instanceof Object)) {
    queue.push(new Node({
      name: p,
      path: [p],
      object: window[p]
    }));
  }
}


// 3. 广度遍历节点，将节点对象属性加入到realms
while (queue.length > 0) {
  let current = queue.shift();
  if (set.has(current.object)) {
    if (current.object !== Function.prototype) {
      const objects = realms.map(item => item.object);
      const idx = objects.indexOf(current.object);
      if (idx > -1) {
        realms.push(Object.assign({}, current, {
          path: current.path.join('.'),
          ref: realms[idx].id
        }));
      }
    }
    continue;
  };
  set.add(current.object);

  const path = current.path.slice();
  realms.push(Object.assign({}, current, {
    path: current.path.join('.'),
  }));

  if (current.object instanceof Object) {
    // 遍历对象属性名称
    for (const p of Object.getOwnPropertyNames(current.object)) {
      // 获取对象属性描述符
      const property = Object.getOwnPropertyDescriptor(current.object, p);
      // 获取属性值
      if (property.hasOwnProperty('value') && !!property.value && (typeof property.value === 'object' || typeof property.value === 'function')) {
        queue.push(new Node({
          name: p,
          path: path.concat([p]),
          object: property.value,
          parent: current.id
        }))
      }
      // 获取get函数
      if (property.hasOwnProperty('get') && !!property.value && (typeof property.value === 'object' || typeof property.value === 'function')) {
        queue.push(new Node({
          name: p + '[[get]]',
          path: path.concat([p + '[[get]]']),
          object: property.get,
          parent: current.id
        }))
      }
      // 获取set函数
      if (property.hasOwnProperty('set') && !!property.value && (typeof property.value === 'object' || typeof property.value === 'function')) {
        queue.push(new Node({
          name: p + '[[set]]',
          path: path.concat([p + '[[set]]']),
          object: property.set,
          parent: current.id
        }));
      }
    }

  }
}
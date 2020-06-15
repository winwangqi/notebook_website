# JavaScript FAQs

## 如何监听 DOM 的更新？

使用 `MutationObserver` 监听 DOM 树的更新。

详情查阅 [MDN: MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

示例：

```js
// Select the node that will be observed for mutations
const targetNode = document.querySelector('#id')

// Options for the observer (which mutations to observe)
const config = {
  attributes: true,
  childList: true,
  subtree: true
}

// Callback function to execute when mutations are observed
const mutationCallback = (mutationsList) => {
  for (let mutation of mutationsList) {
    switch (mutation.type) {
      case 'childList':
        console.log('A child node has been added or removed.')
        break
      case 'attributes':
        console.log(`The ${mutation.attributeName} attribute was modified.`)
        break
      case 'subtree':
        console.log('The subtree was modified.')
        break
      default:
        break
    }
  }
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationCallback)

// Start observing the target node for configured mutations
observer.observe(targetNode, config)

// Later, you can stop observing
observer.disconnect()
```


## 如何将元素滚动到浏览器窗口可视区域内？

使用 `Element.scrollIntoView()` 方法。

详情查阅 [MDN: Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

示例：

```js
element.scrollIntoView(); // 等同于element.scrollIntoView(true) 
element.scrollIntoView(alignToTop); // Boolean型参数 
element.scrollIntoView(scrollIntoViewOptions); // Object型参数
```


## 如何解析 query string?

[MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

```javascript
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

//Iterate the search parameters.
for (let p of searchParams) {
  console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"
```


## 浏览器标签页间状态共享
   
[在多个标签页之间共享 sessionStorage](http://blog.kazaff.me/2016/09/09/%E8%AF%91-%E5%9C%A8%E5%A4%9A%E4%B8%AA%E6%A0%87%E7%AD%BE%E9%A1%B5%E4%B9%8B%E9%97%B4%E5%85%B1%E4%BA%ABsessionStorage/)

利用 `sessionStorage`、`localStorage`、`storageEvent` 来共享状态


## `Object.keys` 与 `Object.getOwnPropertyNames` 的区别是什么？

[ref](https://stackoverflow.com/questions/22658488/object-getownpropertynames-vs-object-keys)

There is a little difference. `Object.getOwnPropertyNames(a)` returns all own properties of the object a. `Object.keys(a)` returns all enumerable own properties. It means that if you define your object properties without making some of them `enumerable: false` these two methods will give you the same result.

It's easy to test:

```javascript
var a = {};
Object.defineProperties(a, {
    one: {enumerable: true, value: 'one'},
    two: {enumerable: false, value: 'two'},
});
Object.keys(a); // ["one"]
Object.getOwnPropertyNames(a); // ["one", "two"]
```

If you define a property without providing property attributes descriptor (meaning you don't use `Object.defineProperties`), for example:

```javascript
a.test = 21;
```

then such property becomes an enumerable automatically and both methods produce the same array.

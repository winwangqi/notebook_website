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


## 如何讲元素滚动到浏览器窗口可视区域内？

使用 `Element.scrollIntoView()` 方法。

详情查阅 [MDN: Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

示例：

```js
element.scrollIntoView(); // 等同于element.scrollIntoView(true) 
element.scrollIntoView(alignToTop); // Boolean型参数 
element.scrollIntoView(scrollIntoViewOptions); // Object型参数
```

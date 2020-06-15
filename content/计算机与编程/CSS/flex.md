# flex

## 文字不换行的 flex-item 子元素会撑大 flex 父元素宽度

解决方案：

- [CSS Flex positioning gotchas: child expands to more than the width allowed by the parent](https://medium.com/@gaurav5430/css-flex-positioning-gotchas-child-expands-to-more-than-the-width-allowed-by-the-parent-799c37428dd6)
- [StackOverflow: Why don't flex items shrink past content size?](https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size)


## 易混淆概念

### [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)

> The CSS **justify-content** property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.


### [justify-items](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)

> The CSS **justify-items** property defines the default `justify-self` for all items of the box, giving them all a default way of justifying each box along the appropriate axis.

The effect of this property is dependent of the layout mode we are in:

- In block-level layouts, it aligns the items inside their containing block on the inline axis.
- For absolutely-positioned elements, it aligns the items inside their containing block on the inline axis, accounting for the offset values of top, left, bottom, and right.
- In table cell layouts, this property is ignored (more about alignment in block, absolute positioned and table layout)
- In flexbox layouts, this property is ignored (more about alignment in Flexbox)
- In grid layouts, it aligns the items inside their grid areas on the inline axis (more about alignment in grid layouts)


### [justify-self](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self)

> The CSS **justify-self** property set the way a box is justified inside its alignment container along the appropriate axis.


### [align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)

> The CSS **align-content** property sets how the browser distributes space between and around content items along the **cross-axis** of a **flexbox container**, and the **main-axis** of a **grid container**.


### [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)

> The CSS **align-items** property sets the **align-self** value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the `Cross Axis`, in Grid Layout it controls the alignment of items on the Block Axis within their grid area.


### [place-content](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content)

> The place-content CSS property is a shorthand for `align-content` and `justify-content`. It can be used in any layout method which utilizes both of these alignment values.

### [place-items](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items)

> The CSS **place-items** shorthand property sets the `align-items` and `justify-items` properties, respectively. If the second value is not set, the first value is also used for it.

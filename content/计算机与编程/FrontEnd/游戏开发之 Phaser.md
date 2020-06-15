# 游戏开发之 Phaser

## 创建游戏和游戏场景

`const game = new Phaser.Game(width, height, render, parent, state, transparent, antialias, physicsConfig)`

### 游戏构造器参数说明

| param | desc |
| --- | --- |
| width | 游戏宽度 |
| height | 游戏高度 |
| render | 渲染方式（Phaser.CANVAS, Phaser.WEBGL, Phaser.AUTO） |
| parent | 游戏容器 |
| state | 游戏创建后默认运行的场景 |
| transparent | 画布背景是否透明 |
| antialias | 是否开启抗锯齿 |
| physicsConfig | 物理引擎配置对象 |

### 游戏对象属性和方法说明

| prop | method | desc |
| --- | --- |
| game.pause | 是否暂停游戏 |
| game.add | 游戏对象工厂 |
| game.camera | 游戏中摄像机对象 |
| game.input | 游戏中的用户交互事件 |
| game.load | 游戏资源加载模块 |
| game.scale | 游戏缩放模块 |
| game.sound | 游戏声音模块 |
| game.stage | 游戏舞台对象 |
| game.world | 游戏世界对象 |
| game.particles | 游戏粒子系统 |
| game.physics | 游戏物理系统 |
| game.state | 游戏场景管理对象 |

### 场景的概念和作用

场景指的是游戏中不同的界面或内容，比如游戏菜单界面为一个场景，真正玩游戏的界面为一个场景，不同的关卡又是不同的场景等等。场景能把一个复杂的游戏分成许多小块，从而简化游戏的开发。

场景在 Pharse 中叫 State，这个场景的概念十分广泛。例如一个只是执行某些准备工作但没有实质画面显示出来的 State，我们也会把它叫做一个场景。一个 Phaser 开发的游戏正是由众多的场景组成。

#### 场景对象

创建场景对象 Phaser.State 的两种形式：

对象形式

```javascript
{
  init() {},
  preload() {},
  create() {},
  update() {},
  render() {}
}
```

函数形式

```javascript
function() {
  this.init = () => {};
  this.preload = () => {};
  this.create = () => {};
  this.update = () => {};
  this.render = () => {};
}
```

`preload`、`create`、`update`、`render` 至少要存在一个

#### 场景中的方法

| method | desc |
| --- | --- |
| init() | 一些场景的初始化代码 |
| preload() | 用来加载游戏资源 |
| create() | 创建游戏显示对象或注册事件等 |
| update() | 在游戏的每一帧都会调用，用来书写需要在每一帧都执行的代码 |
| render() | 在游戏的每一个渲染周期都会调用，用来做一些自定义的渲染工作 |

> 默认情况下，游戏中的一帧就是一个渲染周期，自定义的渲染图形会在其它图形之上

#### 场景中的方法执行顺序

init() -> preload() -> create() -> update() -> render()

### 场景的管理

Phaser.StateManager 场景管理对象

> game.state 可以引用当前游戏的 Phaser.StateManager 对象

| method | param | desc |
| --- | --- | --- |
| game.state.add | name: 场景名 / state: 场景对象或函数 | 添加场景|
| game.state.start | name: 场景名 | 启动场景 |

示例：

```javascript
const game = new Phaser.Game();
game.state.add(name, state);  // 添加场景
game.state.start(name); // 启动场景
```

> 当运行一个新的场景时，前面的场景就停止了。同一时间，只能运行一个场景。

---

## 游戏资源的加载

图片、声音、其它类型的文件资源

### 游戏资源加载方法

> game.load 可以用来引用当前游戏的 Phaser.Loader 对象

| method | param | desc |
| --- | --- | --- |
| game.load.image | key: 唯一资源名 / url: 文件地址 / overwrite | 加载图片 |
| game.load.spritesheet | key / url / frameWidth: 每一帧的宽度 / frameHeight: 每一帧的高度 | 加载图片集 |
| game.load.atlas | key / textureURL / atlasUTL: 描述图片中各个小图片的大小位置信息 / atlasData: 和第三个参数作用相同 | 加载图片集，可以加载由多张大小不相同，位置不规范的图片组成的图片 |
| game.load.audio | key / urls | 加载声音 |
| game.load.audiosprite | key / urls / jsonURL / jsonData / autoDecode | 加载声音集，由多个音频分段组合成的音频文件 |
| game.load.text | key / url | 加载文本文件 |
| game.load.binary | key / url | 加载二进制文件 |

### 加载事件的处理

> game.load.onFileComplete 返回一个 Phaser.Signal 事件对象，可以在它上面注册事件

```javascript
const game = new Phaser.Game();
// 单个资源加载完成事件
game.load.onFileComplete.add(() => {
  // 此时可以使用 game.load.progress 属性来获取当前资源的加载进度
  const progress = game.load.progress;  // 1 表示 1%；100 表示 100%；
});
// 所有资源加载完成事件
game.load.onLoadComplete.add(() => {
  // ...
});
```

---

## 舞台、世界和摄像机对象

### 舞台

Phaser.Stage 舞台对象

> 可以使用 game.stage 来引用舞台对象

示例:

```javascript
const game = new Phaser.Game();
// 设置舞台背景颜色
game.stage.setBackgroundColor(backgroundColor);
```

### 世界

Phaser.World 世界对象

> 可以使用 game.world 来引用世界对象

示例:

```javascript
const game = new Phaser.Game();
// 设置世界的边界大小
game.world.setBounds(x, y, width, height);
```

### 摄像机

Phaser.Camera 摄像机对象

> 可以使用 game.camera 来引用摄像机对象

示例:

```javascript
const game = new Phaser.Game();
// 改变摄像机在 X 轴上的位置
game.camera.x = 100;
// 改变摄像机在 Y 轴上的位置
game.camera.y = 100;
// 让摄像机定位到 displayObject 物体上
game.camera.focusOn(displayObject);
// 让摄像机定位到 x, y 这个坐标上
game.camera.focusOnXY(x, y);
// 让摄像机跟随目标物体 target
game.camera.follow(target);
```

---

## 游戏的缩放控制

Phaser.ScaleManager 缩放管理对象

通过对游戏缩放，从而达到屏幕适配的目的

> 可以使用 game.scale 来引用当前游戏的 Phaser.ScaleManager 对象

### 主要缩放模式

| mode | desc |
| --- | --- |
| EXACT_FIT | 缩放到父元素的大小，可能会被拉伸 |
| SHOW_ALL | 保持长宽比缩放到可用的最大空间 |
| USER_SCALE | 自定义缩放 |

可以使用 scaleMode 属性来改变缩放模式

`game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;`

### 设置画布在父容器中的位置

水平居中

`game.scale.pageAlignHorizontally = true;`

垂直居中

`game.scale.pageAlignVertically = true;`

---

## 显示对象

### 显示对象概述

显示对象，就是能在舞台上显示的对象，也就是我们在游戏中所能看得见的东西。对于 Phaser 来说，显示对象就是需要在画布中渲染出来的对象。

Phaser 中的游戏画面是由各种显示对象所组成的。

#### 显示对象种类

- 图片
- 精灵
- 图片
- 瓦片精灵
- 按钮
- 瓦片地图
- 文字
- 粒子

![显示对象种类](./note-img/显示对象种类.png)

#### 显示对象列表

显示对象列表是一个层级结构，在 Phaser 中看到的显示对象都在显示列表中，分布在不同的层里

![显示对象列表](./note-img/显示对象列表.png)

#### Phaser 运行机制

![Phaser运行机制](./note-img/Phaser运行机制.png)

### 图片、图形和按钮

### 精灵

### phaser 中的文字

`game.add.text(x, y, text, style, group)`

#### 文字的样式

| key | desc | val |
| --- | --- | --- |
| fill | 填充颜色 | '#fff' |
| font | 字体 | '微软雅黑' |
| fontSize | 文字大小 | 60 |
| fongWeight | 文字粗细 | 'normal' |
| style.backgroundColor | 文字背景颜色 | '#f0f' |
| stoke | 描边颜色 | '#ff0' |
| stokeThickness | 描边厚度 | 10 |
| wordWrap | 是否换行 | true |
| wordWrapWidth | 换行宽度 | 150 |

#### 特殊字体的实现

在 css 中引入自定义字体，并激活自定义字体（设置隐藏文字为自定义字体），然后再需要的地方使用字体

##### webFont

#### BitmapText

#### RetroFont

### phaser 中的组

#### 组的基本概念

Phaser.Group 组是一个虚拟的、无形的显示对象容器，用来把多个显示对象组合在一起使之形成一个整体。同时，组又可以作为其它显示对象或组的子元素。Phaser.World 世界对象是显示对象列表中最顶层的一个组。

#### 组的作用

- 组合多个显示对象，便于整体操作
- 提供了多种便捷方法对组内的元素进行管理
- 为显示对象的回收利用机制提供支持

#### 组的创建

`game.add.group(parent?, name?, addToStage?, enableBody?, physicsBodyType?)`

#### 给组添加子元素的几种方法

- 创建图片或精灵等显示对象时指定组
- group.add() 方法直接添加
- group.create() 方法创建子元素并添加进组

javascript

```javascript
const group = game.add.group();
// 第一种
const cat = game.add.image(0, 0, 'cat', '', group);
// 第二种
group.add(cat);
// 第三种
group.create(x, y, key, frame?, exists?);
```

### phaser 中的动画

#### 动画种类

- Phaser.Tween 补间动画（过渡动画）
- Phaser.Animation 逐帧动画

#### 补间动画

创建

`game.add.tween(object)`

使用

```javascript
const tween = game.add.tween(object);
// 从当前状态过渡到 to 制定的状态，yoyo 是否进行反向动画
tween.to(properties, duration, ease, autoStart, delay, repeat, yoyo);
// 从 from 制定的状态到对象当前的状态
tween.form(properties, duration, ease, autoStart, delay, repeat, yoyo);
// 开始
tween.start();
// 停止
tween.stop();
// 暂停
tween.pause();
// 恢复
tween.resume();
```

#### 逐帧动画

Phaser.Animation 称之为逐帧动画，因为它的每一帧都需要手动指定，而不像补间动画那样只需制定开始和结束的那两个关键帧。同时，Animation 逐帧动画是通过图片来实现的，我们可以给它的每一帧都制定一张图片，然后这些帧连续起来播放，就形成了一个动画。

我们可以通过精灵对象的 animations 属性来使用动画，而且这个精灵对象使用的贴图必须是 spritesheet 或者 atlas 加载过来的。因为只有这两种资源才包含多个帧。

javascript

```javascript
const sprite = game.add.sprite();
// 定义动画
sprite.animations.add(name, frames);
// 播放动画 frameRate 帧播放的速度
sprite.animations.paly(name, frameRate, loop, killOnComplete);
// 停止动画
sprite.animations.stop(name);
```

### Altas 的制作和使用

#### 制作工具

- Texture Packer
- Shoebox

### Phaser 中的粒子系统

在 Phaser 中，粒子扩展子 Phaser.Sprite 对象，它们是由 Phaser 中的粒子发射器所发射出来的。

目前 Phaser 内置的粒子发射器为 Phaser.Particles.Arcade.Emitter，它是以 Phaser 中的 Arcade 物理引擎为基础的一种粒子发射器。通过粒子发射器，能够自由的发射各种粒子，并且控制粒子的形态，包括粒子的种类、数量、速度、方向、生存时间等等，甚至可以在粒子上进行物理碰撞检测。因此只要掌握好了粒子发射器的使用方法，就能作出很多炫目的粒子效果。

#### 粒子发射器的创建

`game.add.emitter(x?, y?, maxParticles?)`

| key | desc |
| --- | --- |
| x | 粒子发射器的横坐标 |
| y | 粒子发射器的纵坐标 |
| maxParticles | 粒子发射器所能产生的最大数量粒子 |

#### 粒子的创建

javascript

```javascript
const emitter = game.add.emitter();
emitter.makeParticles(keys, frames?, quantity?, collide?, collideWorldBounds);
```

| key | desc |
| --- | --- |
| keys | 资源加载中的名称 |
| frames | 帧名 |
| quantity | 要产生的粒子数 |
| collide | 粒子间的是否进行碰撞检测 |
| collideWorldBounds | 粒子是否与边界进行碰撞检测 |

#### 粒子的控制

##### 粒子的发射

`emitter.start(explode?, lifespan?, frequency?, quantity? forceQuantity?)`

| key | desc |
| --- | --- |
| explode | 是否将粒子一次发射出去 |
| lifespan | 粒子生存时间 |
| frequency | 粒子发射间隔 |
| quantity | 需要发射的粒子数 |
| forceQuantity | ？？？ |

`emitter.flow(liftspan?, frequency?, quantity?, total?, immediate?)`

| key | desc |
| --- | --- |
| lifespan | 粒子生存时间 |
| frequency | 粒子发射间隔 |
| quantity | 每次发射的粒子数 |
| total | -1 为无限多粒子 |
| immediate | ？？？ |

##### 速度控制

- `emitter.setXSpeed(min?, max?)`
- `emitter.setYSpeed(min?, max?)`

设置的速度介于 `min` 和 `max` 之间

##### 透明度控制

`emitter.setAlpha(min?, max?, rate?, ease?)`

##### 角度控制

`emitter.setRotation(min?, max?)`

##### 缩放控制

`emitter.setScale(minX?, maxX?, minY?, maxY? rate?)`

##### 结合物理引擎的使用

javascript

```javascript
this.create = function () {
  emitter.gravity = 600;
  emitter.bounce.y = 0.8;
};

this.update = function () {
  game.physics.arcade.collide(emitter);
};
```

### 瓦片地图

#### 瓦片地图的概念

瓦片地图是指可以把一张复杂的地图分解成一些可重复使用的小图块（也被称作瓦片），或者反过来说就是用一些可重复使用的瓦片所构成的小地图叫做瓦片地图。

#### 使用 Tiled 创建瓦片地图

##### Tiled 软件介绍

Tiled 是国外一款免费的瓦片地图编辑器软件，它功能强大，使用简单，很多游戏引擎都能使用 Tiled 制作的瓦片地图。

[Tiled 官网](http://www.mapeditor.org/)

##### Tiled 的使用 [极客学院](http://www.jikexueyuan.com/course/2230_2.html?ss=1)

- 添加瓦片图集
- 新建图层
- 构建地图
- 导出地图

#### Phaser 中瓦片地图的使用

##### 瓦片地图数据的加载

`game.load.tilemap(key, url?, data? , format?)`

##### 瓦片地图的创建

`game.add.tilemap(key?, tileWidth?, tileHeight?, width?, height?)`

##### 瓦片地图的显示

```javascript
const tilemap = game.add.tilemap();
// 加载存放瓦片的图片
tilemap.addTilesetImage(tileset, key?);
// 创建层
tilemap.createLayer(layer);
```

##### 动态修改瓦片地图

- 获取指定位置的瓦片: `const tile = map.getTile(0, 24)`
- 在指定的位置设置指定的瓦片: `map.putTile(tile, 0, 0)`
- 在指定区域填充指定的瓦片: `map.fill(12, 0, 0, 20, 20)`
- 瓦片的复制和粘贴: `map.paste(0, 0, tiles)`
- 在指定区域内用一种瓦片替换另一种瓦片: `map.replace(1, 12, 0, 0, 10, 10)`

##### 瓦片地图的碰撞检测

```javascript
tilemap.setCollision(indexes, collides?, layer?)

tilemap.setCollisionBetween(start, stop, collides?, layer?)
```

---

## Phaser 中的事件系统及用户交互

### Phaser 中的事件系统

在 Phaser 中，有一套内置的事件系统，这个事件系统是基于观察者模式或者说是发布/订阅模式来设计的。

Phaser 中的事件系统与我们在网页开发中常常接触到的事件系统非常类似，只不过 Phaser 中的事件系统功能更加简单，它只负责事件的创建、分发、监听和注销。Phaser 中的事件系统是 Phaser 中各种内部或外部的游戏对象或组件进行通信的桥梁，通过事件系统，我们能很容易的写出可读性以及可维护性都更强的游戏代码。

#### Phaser.Singal 对象介绍

Phaser 中的事件系统是由 Phaser.Singal 对象来实现的。

每一个 Singal 对象都代表这一类事件，当这个事件发生时，所有监听了这个 Singal 对象的事件监听器都会收到事件发生的信号，从而可以执行相应的动作。

正如 singal 的所代表的字面意思一样， Singal 对象就像一个信号发射器，当有需要时就把信号发射出去。我们需要多少种不同信号，就可以创建多少个 Singal 对象。同时，我们可以控制谁需要接收这个信号，从而在游戏对象之间建立起一种低耦合的通信机制。

#### Phaser.Singal 对象的使用

Singal 对象的创建

`const signal = new Phaser.Signal()`

添加事件监听器

`signal.add(listener, listenerContext?, priority?, args?)`

`signal.addOnce(listener, listenerContext?, priority?, args?)`

移除事件监听器

`signal.remove(listener)`

`signal.removeAll()`

分发事件

`signal.dispatch(params?)`

销毁 Singal 对象

`signal.dispose()`

#### 一些重要的系统事件

游戏事件

- game.onBlur - 游戏失去焦点
- game.onFocus - 游戏得到焦点
- game.onPause - 游戏暂停
- game.onResume - 游戏恢复

游戏缩放事件

- game.scale.onFullScreenChange - 当进入或退出全屏时
- game.scale.onOrientationChange - 当设备的横竖屏切换时
- game.scale.onSizeChange - 当游戏尺寸改变时

资源加载中的事件

- game.load.onFileComplete - 当一个文件加载完成时
- game.load.onFileError - 当一个文件加载失败时
- game.load.onFileStart - 当一个文件开始加载时
- game.load.onLoadComplete - 当所有资源加载完成时

tween 补间动画事件

- tween.onStart - 动画开始时
- tween.onComplete - 动画完成时
- tween.onLoop - 动画循环时
- tween.onRepeat - 动画重复时

animation 关键帧动画事件

- animation.onStart - 动画开始时
- animation.onComplete - 动画完成时
- animation.onLoop - 动画循环时
- animation.onUpdate - 动画的帧变化时

### Phaser 中的用户交互管理对象

#### Phaser.Input 对象

Phaser.Input 对象是 Phaser 中的用户交互事件进行一个集中管理，在它下面还有更具体的对象来负责管理不同类型的交互事件。

```javascript
const game = new Phaser.Game();

// 鼠标按下或手指触摸事件
game.input.onDown
// 鼠标抬起或手指离开事件
game.input.onUp
// 鼠标点击或手指轻击事件
game.input.onTap
// 鼠标长按或手指触摸事件
game.input.onHold
// 添加鼠标或手指移动事件侦听器
game.input.addMoveCallback(callback, context)
// 删除鼠标或手指移动事件侦听器
game.input.deleteMoveCallback(callback, context)
```

#### Phaser.Pointer 对象

Phaser.Pointer 代表的是一个指针对象，这个指针可以是鼠标、手指或其它输入设备。在触摸设备上，一个 Pointer 对象代表一个手指，所以可能会有很多个 Pointer 对象，也就是多点触摸。在 PC 上，Pointer 对象代表的是鼠标。

利用 Pointer 对象，我们就能兼容不同设备上的指针输入事件。

```javascript
const game = new Phaser.Game();

// 获取最近一次激活的 Pointer 对象
const pointer = game.input.activePointer;

// 指针事件发生时 x, y 坐标
pointer.clientX;
pointer.clientY;

// 用来判断指针是否按下/释放状态
pointer.isDown;
pointer.isUp;
```

#### 鼠标对象

虽然 Phaser.Pointer 对象已经能够处理大部分的鼠标事件了，但是在依赖鼠标的桌面游戏中，还是有些独特的需求要用到鼠标对象以及专门为鼠标定制的 Pointer 对象。

```javascript
const game = new Phaser.Game();

// 获取鼠标对象
const mouse = game.input.mouse;
// 获取为鼠标定制的 Pointer 对象
const mousePointer = game.input.mousePointer;

// 设置鼠标滚轮事件的回调函数
mouse.mouseWheelCallback
// 鼠标滚轮的滚动方向，1 为向上，-1 为向下
mouse.wheelDelta

// 鼠标左键对象
mousePointer.leftButton
// 鼠标中键对象
mousePointer.middleButton
// 鼠标右键对象
mousePointer.rightButton
```

#### Phaser.Keyboard 键盘对象

```javascript
const game = new Phaser.Game();

// 获取键盘对象
const keyboard = game.input.keyboard;

// 添加按键回调函数
keyboard.addCallbacks(context, onDown, onUp, onPress)
// 创建一个键对象，返回 Phaser.Key 对象
keyboard.addKey(keycode)
// 创建一个包含上下左右方向键的对象
keyboard.createCursorKeys()
```

#### Phaser.Key 对象

```javascript
const game = new Phaser.Game();
const keyboard = game.input.keyboard;

// 使用键盘对象添加一个键，keycode 参数为键的代码
const key = keyboard.addKey(keycode);

// 用来判断该键是否处于按下状态
key.isDown
// 用来判断该键是否处于释放状态
key.isUp
// 键按下时的 Signal 对象
key.onDown
// 键释放时的 Signal 对象
key.onUp

// 判断 alt 键是否被同时按下
key.altKey
// 判断 ctrl 键是否被同时按下
key.ctrlKey
// 判断 shift 键见否被同时按下
key.shiftKey
```

### 特定游戏对象的交互事件处理

#### Phaser.Events 对象

Phaser 中除了有统一的、全局的，例如 Pointer 等交互事件处理对象外，还有特定游戏对象上的交互事件处理对象，这就是 Phaser.Events 对象。

每个 Phaser.Events 对象都有一个宿主，它处理的都是发生在这个宿主上或是跟这个宿主相关的事件。

需要注意的是 Phaser.Events 对象处理的并不全是用户交互事件，也有可能是一些发生在这个宿主的系统事件。

```javascript
const game = new Phaser.Game();
const sprite = game.add.sprite();

// 开启输入事件
sprite.inputEnabled = true;
// 获取该游戏对象的 Phaser.Events 对象
const events = sprite.events;

// 当有指针在该对象上按下时的事件（Signal）
events.onInputDown
// 当有指针在该对象上释放时的事件（Signal）
events.onInputUp
// 当有指针进入该对象上时的事件（Signal）
events.onInputOver
// 当有指针离开该对象上时的事件（Signal）
events.onInputOut
```

#### Phaser.InputHandler 对象

除了有 Phaser.Events 对象外，在某一个特定的游戏对象上，还有一个 Phaser.InputHandler 对象。

Phaser.InputHandler 对象封装了一些与它的宿主相关的用户交互方法以及一些非常有用的用户输入属性。

```javascript
const game = new Phaser.Game();
const sprite = game.add.sprite();

// 开启输入事件
sprite.inputEnabled = true;
// 获取该游戏对象的 Phaser.InputHandler 对象
const inputHandler = sprite.input;

// 使之能够拖动
inputHandler.enableDrag();
// 禁用拖动
inputHandler.disableDrag();

// 判断指针是否在该对象之内
inputHandler.pointerOver();
// 判断指针是否在该对象之外
inputHandler.pointerOut();
// 当指针在该对象内时相对于该对象的 x 坐标
inputHandler.pointerX
// 当指针在该对象内时相对于该对象的 y 坐标
inputHandler.pointerY

// 当设置该值为 true 时，在单机或者拖动该对象时它会自动位于显示列表的最上方
inputHandler.bringToTop
```

---

## Phaser 中音频资源的处理

### Phaser 中音频资源概述

Phaser 中支持两种音频播放模式，分别为 webAudio 和 HTML5 Audio，Phaser 会自动检测运行环境，如果当前环境支持 webAudio，则会优先使用 webAudio 模式，如果不支持则会回退到 HTML5 Audio 模式，以此达到最大的浏览器兼容性。

各种音频格式浏览器支持情况

| Browser | MP3 | Wav | Ogg |
| --- | --- | --- | --- |
| Internet Explorer | YES | NO | NO |
| Chrome | YES | YES | YES |
| Firefox | YES | YES | YES |
| Safari | YES | YES | NO |
| Opear | YES | YES | YES |

#### Phaser.SoundManager 对象

获取 SoundManager 对象

`cosnt soundManager = game.sound`

#### Phaser.Sound 对象

game.add.audio() 方法返回的就是一个 Phaser.Sound 对象

`const sound = game.add.audio(key, volume?, loop?)`

### Phaser 中音频资源加载

#### 加载单一音频资源

`game.load.audio(key, urls, autoDecode?)`

> urls 有两种形式：a.字符串形式；b.数组形式；

#### 加载 audio sprite 资源

`game.load.audiosprite(key, urls, jsonURL?, jsonData?, autoDecode?)`

> audio sprite 数据生成[工具](https://github.com/tonistiigi/autiosprite/)

### Phaser 中音频资源使用和管理

#### 声音播放控制

```javascript
const game = new Phaser.Game();
const sound = game.add.audio('foo');

// 播放声音
sound.play(marker?, position?, volume?, loop?, forceRestart?);

// 暂停播放
sound.pause();
// 恢复播放
sound.resume();
// 停止播放
sound.stop();
```

| param | desc |
| --- | --- |
| marker | 标注名称 |
| position | 播放位置 |
| volume | 音量（0 - 1） |
| loop | 循环播放 |
| forceRestart | 强制重新播放 |

#### 声音分段标注

```javascript
const game = new Phaser.Game();
const sound = game.add.sound('foo');

// 标注声音
sound.addMarker(name, start, duration, volume?, loop?);
// 播放标注声音
sound.paly(name);
// 移除标注
sound.removeMarker(name);
```

#### 声音的淡入和淡出

```javascript
const game = new Phaser.Game();
const sound = game.add.sound('foo');

// 淡入
sound.fadeIn(duration?, loop?, marker?);
// 淡出
sound.fadeOut(duration?);
// 自定义
sound.fadeTo(duration?, volume?);
```

#### 声音事件

```javascript
const game = new Phaser.Game();
const sound = game.add.sound('foo');

// 以下为声音相关的 Singal 对象

// 声音开始播放时
sound.onPlay
// 声音暂停时
sound.onPause
// 声音恢复播放时
sound.onResume
// 声音停止时
sound.onStop
// 声音淡入淡出完成
sound.onFadeComplete
// 标注声音播放完成时
sound.onMarkerComplete
// 循环时
sound.onLoop
// 静音时
sound.onMute
```

---

## Phaser 中的物理引擎

### 物理引擎概述

物理引擎主要用来模拟真实世界中各种物体的运动规律，它通过为刚性物体赋予真实的物理属性来计算物体的位置、旋转以及发生碰撞后的反应等等，物理引擎的使用可以让游戏中的物体呈现出更加真实的效果。

### Phaser 内置的物理引擎

- Arcade Physics
- P2 Physics
- Ninja
- BOX2D

#### Arcade 引擎

Arcade 引擎是 Phaser 中最简单也是最常用的一个物理引擎，它给我们提供了一些基本的物理属性和方法：

- 速度以及加速度
- 角速度都以及加速度
- 质量、重力、摩擦力和弹跳
- 碰撞检测

#### P2 引擎

P2 引擎是一款比较高级的物理引擎，用来制作一些相对复杂的物理效果，其[项目地址](https://github.com/schteppe/p2.js)。相比与 Arcade 引擎，P2 有如下特征：

- 支持更多形状的碰撞检测
- 支持多个物体之间的约束行为
- 支持物体的材质设置

### Arcade 物理引擎的基本用法

#### 开始物理引擎

```javascript
const game = new Phaser.Game();
// 开启物理引擎
game.physics.startSystem(Phaser.Physics.ARCADE);
```

#### 在游戏精灵上开启物理引擎

```javascript
const game = new Phaser.Game();
// 开启物理引擎
game.physics.startSystem(Phaser.Physics.ARCADE);

const sprite = game.add.sprite();
// 在该 sprite 上启用 arcade 物理引擎
// 精灵对象可以使用物理引擎，图片对象不能使用物理引擎
game.physics.enable(sprite, Phaser.Physics.ARCADE);
```

#### 在组中启用物理引擎

```javascript
const game = new Phaser.Game();
// 开启物理引擎
game.physics.startSystem(Phaser.Physics.ARCADE);
// 创建一个组
const group = game.add.group();
// 为组中的每一个子元素启用物理引擎
group.enableBody = true;
// 制定要启用的物理引擎
group.physicsBodyType = Phaser.Physics.ARCADE;
// 之后添加到组中的子元素就会自动启用所制定的物理引擎了
// ...
```

#### 精灵的 body 对象

```javascript
const game = new Phaser.Game();
const sprite = game.add.sprite();
game.physics.enable(sprite, Phaser.Physics.ARCADE);
// 当在一个精灵上启用了物理引擎后，该精灵便会拥有一个 body 属性
// 物理属性都是附加在精灵的 boyd 对象上的
// sprite.body...;
```

#### 设置速度

```javascript
//设置速度使用 velocity 属性

sprite.body.velocity = new Phaser.Point(100, 100);

// sprite.body.velocity.set(x, y)
sprite.body.velocity.set(100);

sprite.body.velocity.x = 100;
sprite.body.velocity.y = 100;
```

#### 设置加速度

```javascript
// 设置加速度使用 acceleration 属性

sprite.body.acceleration = new Phaser.Point(100, 100);

sprite.body.acceleration.set(100);

sprite.body.acceleration.x = 100;
sprite.body.acceleration.y = 100;
```

#### 设置角速度

```javascript
// 设置角速度使用 angularVelocity 属性

sprite.body.angularVelocity = 90;

// 设置角速度的加速度使用 angularAcceleration 属性

sprite.body.angularAcceleration = 45;
```

#### 设置阻力

```javascript
// 设置阻力使用 drag 属性

sprite.body.drag = new Phaser.Point(100, 100);

sprite.body.drag.set(100);

sprite.body.drag.x = 100;
sprite.body.drag.y = 100;
```

#### 设置重力

```javascript
// 设置重力使用 gravity 属性

sprite.body.gravity = new Phaser.Point(100, 100);

sprite.body.gravity.set(100);

sprite.body.gravity.x = 100;
sprite.body.gravity.y = 100;
```

#### 设置弹跳

```javascript
// 设置弹跳使用 bounce 属性

sprite.body.bounce = new Phaser.Point(0.5, 0.5);

sprite.body.bounce.set(0.5);

sprite.body.bounce.x = 0.5;
sprite.body.bounce.y = 0.5;
```

#### 其它重要的属性和方法

```javascript
// 设置与其它物体接触时的摩擦力
sprite.body.friction.set(100);
// 设置角度
sprite.body.rotation = Math.PI;
// 设置该物体是固定的（true）还是不固定的（false）
sprite.body.immovable = true;
// 设置物体的相对质量，默认为 1
sprite.body.mass = 10;
// 设置最大速度
sprite.body.maxVelocity.set(100, 200);
// 设置最大角速度
sprite.body.maxAngular = 1000;

// 设置 body 范围大小，改变 body 对象的作用范围
sprite.body.setSize(width, height, offsetX, offsetY);
// 重置所有的物理属性
sprite.body.rest(x, y);
```

#### Arcade 引擎提供的一些静态方法

```javascript
const game = new Phaser.Game();

// 让某个物体以指定的速度向指定的目的地运动
// 方法返回运动的角度
game.physics.arcade.moveToXY(sprite, x, y, speed);
game.physics.arcade.moveToObject(sprite, destination, speed);
game.physics.arcade.moveToPointer(sprite, speed, pointer);

// 以指定加速度向指定地点运动
game.physics.arcade.accelerateToXY(sprite, x, y, speed);
game.physics.arcade.accelerateToObject(sprite, destination, speed);
game.physics.arcade.accelerateToPointer(sprite, pointer, speed);

// 计算角度
game.physics.arcade.angleBetween(source, target);
game.physics.arcade.angleToPointer(displayObject, pointer);
game.physics.arcade.angleToXY(displayObject, x, y);

// 计算距离
game.physics.arcade.distanceBetween(source, target);
game.physics.arcade.distanceToPointer(displayObject, pointer);

// 计算速度
game.physics.arcade.computeVelocity(axis, body, velocity, acceleration, drag);
game.physics.arcade.velocityFromAngle(angle, speed, point);
```

### 使用 Arcade 物理引擎进行碰撞检测

#### Arcade 的碰撞检测类型

Arcade 物理引擎是一个轻量级的物理引擎，它只支持 AABB（轴对齐矩形边界框）类型的碰撞检测。也就是只能进行矩形和矩形之间的碰撞检测。

#### overlap 方法

```javascript
const game = new Phaser.Game();

const sprite1 = game.add.sprite();
const sprite2 = game.add.sprite();

game.physics.arcade.overlap(sprite1, sprite2, () => {
  console.log('It is overlap!');
});
```

#### collide 方法

```javascript
const game = new Phaser.Game();

const sprite1 = game.add.sprite();
const sprite2 = game.add.sprite();

game.physics.arcade.collide(sprite1, sprite2, () => {
  console.log('It is collide!');
});
```

#### 在 update 方法中使用碰撞检测

```javascript
const game = new Phaser.Game(1200, 500, Phaser.AUTO, 'container', state);

// 场景函数
function state() {
  let sprite1, sprite2;

  this.create = () => {
    sprite1 = game.add.sprite();
    sprite2 = game.add.sprite();
  };

  // 必须在游戏的每一帧中都进行碰撞检测，才能得到一个持续的碰撞物理效果
  this.update = () => {
    game.physics.arcade.collide(sprite1, sprite2);
  };
}
```

#### 单个物体与组之间的碰撞检测

```javascript
const game = new Phaser.Game(1200, 500, Phaser.AUTO, 'container', state);

// 场景函数
function state() {
  let sprite, group;

  this.create = () => {
    sprite = game.add.sprite();
    group = game.add.group();
  };

  // 精灵与组之间进行碰撞检测
  this.update = () => {
    game.physics.arcade.collide(sprite, group);
  };
}
```

#### 组与组之间的碰撞检测

```javascript
const game = new Phaser.Game(1200, 500, Phaser.AUTO, 'container', state);

// 场景函数
function state() {
  let group1, group2;

  this.create = () => {
    group1 = game.add.group();
    group2 = game.add.group();
  };

  // 精灵与组之间进行碰撞检测
  this.update = () => {
    game.physics.arcade.collide(group1, group2);
  };
}
```

#### 组内的碰撞检测

```javascript
const game = new Phaser.Game(1200, 500, Phaser.AUTO, 'container', state);

// 场景函数
function state() {
  let group1, group2;

  this.create = () => {
    group = game.add.group();
  };

  // 精灵与组之间进行碰撞检测
  this.update = () => {
    game.physics.arcade.collide(group);
  };
}
```

#### 与游戏边界进行碰撞检测

`sprite.body.collideWorldBounds = true`

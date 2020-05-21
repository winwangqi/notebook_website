备忘与常见问题

## `Printf` 动词

| verb | desc |
| --- | --- |
|%d          | 十进制整数 |
|%x, %o, %b  | 十六进制，八进制，二进制整数。 |
|%f, %g, %e  | 浮点数： 3.141593 3.141592653589793 3.141593e+00 |
|%t          | 布尔：true或false |
|%c          | 字符（rune） (Unicode码点) |
|%s          | 字符串 |
|%q          | 带双引号的字符串"abc"或带单引号的字符'c' |
|%v          | 变量的自然形式（natural format） |
|%T          | 变量的类型 |
|%%          | 字面上的百分号标志（无操作数） |


## Time format layout

`2006-01-02T15:04:05.000Z`


## 如何在测试中模拟 `time.Now()`？

[How to mock current time in GoLang](https://medium.com/@csmadhav/how-to-mock-current-time-in-golang-fb91007124e)


## [Using goroutines on loop iterator variables](https://github.com/golang/go/wiki/CommonMistakes)

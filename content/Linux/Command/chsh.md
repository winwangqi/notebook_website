## 描述

**chsh** 用来更改登录的 shell。如果在命令行中没有给出 shell，**chsh** 将给出一个提示。

## 用法

**chsh** [options] [username]

## 选项

| 选项 | 说明 |
| --- | --- |
| **-s, --shell** | 定义登录 shell |
| **-l, --list-shells** | 显示 */etc/shells* 中的 shell 列表 |
| **-u, --help** | 显示帮助信息 |
| **-v, --version** | 显示版本 |

## 示例

使用 *bash* shell

```bash
chsh -s /bin/bash
```

给用户 *wangqi* 设置 *bash* shell

```bash
chsh -s /bin/bash wangqi
```

---

## 参考

- [chsh(1) - Linux man page](https://linux.die.net/man/1/chsh)
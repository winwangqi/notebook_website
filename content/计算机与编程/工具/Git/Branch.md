# Git - Branch

## 本地分支

### 查看分支

```bash
git branch
```

### 创建分支

```bash
git branch <branch>
```

或

```bash
git checkout -b <branch>
```

### 合并分支

```bash
git merge <branch>
```

### 删除分支

```bash
git branch -d <branch>
```

**强制删除**

```bash
git branch -D <branch>
```

## 远程分支

### 查看分支

```bash
git branch -r/--remote
```

### 拉取分支

```bash
git checkout -t/--track <remote>/<branch>
```

或

```bash
git checkout -b <branch> <remote>/<branch>
```

### 删除分支

```bash
git push <remote> :<branch>
```

或

```bash
git push <remote> -d/--delete <branch>
```

### 查看分支跟踪状态

```bash
git branch -vv
```

### 跟踪远程分支

```bash
git branch --set-upstream-to=<remote>/<branch> <branch>
```

### 更改远程分支跟踪

```bash
git branch <branch> --set-upstream-to <remove>/<branch>
```

或

```bash
git branch <branchk> -u <remote>/<branch>
```

或

```bash
git branch --set-upstream <branch> <remote>/<branch>
```

### 清理分支

```bash
git remote prune <remote>
```

### 更新分支

```bash
git remote update <remote> --prune
```

### 查看分支记录

```bash
git log <remote>/<branch>
```

### 重置分支记录

> [stackoverflow](https://stackoverflow.com/questions/5816688/resetting-remote-to-a-certain-commit)

```bash
git push -f/--force <remote> <commit-hash>:<remote-branch>
```

或

```bash
git reset --hard <commit-hash>
git push -f/--force <remote> <branch>
```

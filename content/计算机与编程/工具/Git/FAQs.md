# Git - FAQs

## HTTP Basic: Access denied 错误

**Description**

`git push` 提示 HTTP Basic: Access denied 错误 

**Solution**

1. 如果账号密码有变动 用这个命令 `git config –system –unset credential.helper` 重新输入账号密码 应该就能解决了 
2. 如果用了第一个命令 还不能解决问题那么 用这个命令 `git config –global http.emptyAuth true`

## When git push or git pull always requires username and password

**Description**

When try to push or pull from remote repository, it always requires username and password.

**Solution**

*Method 1*

[Switching remote URLs from HTTPS to SSH](https://help.github.com/articles/changing-a-remote-s-url/#switching-remote-urls-from-https-to-ssh)

```bash
git remote set-url origin git@github.com:username/repo.git
```

*Method 2*

Run the following command to enable [credential caching](https://help.github.com/en/github/using-git/caching-your-github-password-in-git#platform-linux):

```bash
git config credential.helper store
```

You should also specify **caching expire**:
```bash
git config --global credential.helper 'cache --timeout 7200'
```

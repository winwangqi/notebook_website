1. /home/docker下创建给jenkins挂挂载数据用的目录 jenkins  (记得 chown 修改目录的权限到docker组)
2. 安装jenkins
3.1 稳定版本使用,不经常更新
    1. 执行启动脚本
3.2 没事喜欢升级版本完的.
    1. 修改启动脚本中的参数, 增加 --rm, 去掉--restart always (这俩冲突)

4. 以上两个区别在于是否在关闭服务的时候自动删除container
5. 手动更新镜像命令 docker pull jenkins/jenkins:latest  //拉取最新版本镜像到本地.


启动脚本内容

docker run -d 
--rm \
--name jenkins \
--publish 10082:8080 \
--volume /home/docker/jenkins:/var/jenkins_home \
jenkins/jenkins:latest


admin
0591df07cd6847ef9c67be5e4b95336f

把你笔记本固定ip. 然后直接路由器DMZ.
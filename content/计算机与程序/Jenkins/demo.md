```jenkinsfile
node {
    def succ_file=[]
    def fail_file=[]
    def file_list
    def JKROOT="${WORKSPACE}/${target_project}"
    def HJROOT="/home/wwwroot/xxxx/app/${target_project}"
    def BAKPATH="${WORKSPACE}/rollback/${target_project}_${BUILD_NUMBER}"
    def ori_version='xxxxx'

    echo "目标项目: ${target_project}"
    echo "目标版本: ${target_version}"
    echo "目标服务器: ${target_server}"

    stage('更新代码') {
        if ( target_files =='' || target_files ==~ /\s+|\*+/ ){
            echo '更新文件不能为空或*'
            return
        }
        if ( fileExists("${JKROOT}") ){
            sh """#!/bin/bash
                rm -fr ${JKROOT}
            """
        }
        checkout([$class: 'SubversionSCM', 
                additionalCredentials: [], 
                excludedCommitMessages: '', 
                excludedRegions: '', 
                excludedRevprop: '', 
                excludedUsers: '', 
                filterChangelog: false, 
                ignoreDirPropChanges: false, 
                includedRegions: '', 
                locations: [[
                            cancelProcessOnExternalsFail: true, 
                            credentialsId: 'b6da4a4f-e51c-4955-9410-16b806783390', 
                            depthOption: 'infinity', 
                            ignoreExternalsOption: true, 
                            local: "${target_project}", 
                            remote: 'svn://svn.xxxxmall.com/xxxx/trunk/app/${target_project}'
                        ]], 
                quietOperation: true, 
                workspaceUpdater: [$class: 'UpdateUpdater']
        ])
    }    
    stage('对比文件') {
        file_list = target_files.split("\\s*\\r?\\n\\s*")

        if ( !fileExists("${HJROOT}") ) {
            echo "${HJROOT} 不存在.\n不支持新发项目"
            return
        }
        if ( target_version != ori_version ){
            sh """#!/bin/bash
            echo "切换版本 ${ori_version}->${target_version}"
            mv -v ${JKROOT}/${ori_version} ${JKROOT}/${target_version} 
            """
        }
        file_list.each{
            if ( it.length()<3 ){
                echo "确定更新 ${it} ??? 这不是个文件吧?"
                return
            }
            if ( !fileExists("${JKROOT}/${it}") ){
                echo "${JKROOT}/${it} 不存在, 检查填写是否正确"
                return
            }
            if (fileExists("${HJROOT}/${it}") ) {
                succ_file.add(it)
            }else{
                fail_file.add(it)
            }
        }

    }
    stage("预处理文件") {
        echo succ_file.join('|')
        echo fail_file.join('|')
        if (fail_file.size()>0){
            echo "文件 ${fail_file.join(' ')} 是新发文件吗?"
            input '确定新发以继续'
            fail_file.each {
                sh """#!/bin/bash
                cd ${JKROOT} && rsync -azRh --exclude='.svn' --exclude='*.log' ${it} ${HJROOT}/
                """
            }
            echo '新发文件处理完成'
        }
        if (succ_file.size()>0){
            succ_file.each {
                echo "${JKROOT}/${it}"
                echo "${HJROOT}/${it}"
                sh (script:"""#!/bin/bash
                diff -u ${JKROOT}/${it} ${HJROOT}/${it} || echo true
                """)
            }
            echo '查看对比记录,确认文件是否正确'
            input '确认修改文件正确?'
            sh "mkdir -p ${BAKPATH}/old && mkdir -p ${BAKPATH}/new"

            succ_file.each {
                sh """#!/bin/bash    
                cd ${HJROOT} && rsync -azRh --exclude='.svn' --exclude='*.log' ${it} ${BAKPATH}/old/
                cd ${JKROOT} && rsync -azRh --exclude='.svn' --exclude='*.log' ${it} ${HJROOT}/
                """
                echo "更新文件${it}处理完成"
            }
        }
    }
    stage('分发服务器') {
        input '是否进行分发?'
        server_list= target_server.tokenize(',')
        send_file = file_list.join(" ")
        echo send_file
        server_list.each {
            echo "分发到${it}"
            sh """#!/bin/bash
            cd ${JKROOT} && rsync -azvR --exclude='.svn' --exclude='*.log' ${send_file} www@${it}:${HJROOT}/
            """
        }
    }
    stage("备份版本") {
        bak_file = file_list.join(" ")
        sh """#!/bin/bash
            mkdir -p ${BAKPATH}/new && cd ${HJROOT} && rsync -azvR --exclude='.svn' --exclude='*.log' ${bak_file} ${BAKPATH}/new/
            rm -fr ${JKROOT}
        """
    }
}node {
    def succ_file=[]
    def fail_file=[]
    def file_list
    def JKROOT="${WORKSPACE}/${target_project}"
    def HJROOT="/home/wwwroot/xxxx/app/${target_project}"
    def BAKPATH="${WORKSPACE}/rollback/${target_project}_${BUILD_NUMBER}"
    def ori_version='2015041703'

    echo "目标项目: ${target_project}"
    echo "目标版本: ${target_version}"
    echo "目标服务器: ${target_server}"

    stage('更新代码') {
        if ( target_files =='' || target_files ==~ /\s+|\*+/ ){
            echo '更新文件不能为空或*'
            return
        }
        if ( fileExists("${JKROOT}") ){
            sh """#!/bin/bash
                rm -fr ${JKROOT}
            """
        }
        checkout([$class: 'SubversionSCM', 
                additionalCredentials: [], 
                excludedCommitMessages: '', 
                excludedRegions: '', 
                excludedRevprop: '', 
                excludedUsers: '', 
                filterChangelog: false, 
                ignoreDirPropChanges: false, 
                includedRegions: '', 
                locations: [[
                            cancelProcessOnExternalsFail: true, 
                            credentialsId: 'b6da4a4f-e51c-4955-9410-16b806783390', 
                            depthOption: 'infinity', 
                            ignoreExternalsOption: true, 
                            local: "${target_project}", 
                            remote: 'svn://svn.xxxxmall.com/xxxx/trunk/app/${target_project}'
                        ]], 
                quietOperation: true, 
                workspaceUpdater: [$class: 'UpdateUpdater']
        ])
    }    
    stage('对比文件') {
        file_list = target_files.split("\\s*\\r?\\n\\s*")

        if ( !fileExists("${HJROOT}") ) {
            echo "${HJROOT} 不存在.\n不支持新发项目"
            return
        }
        if ( target_version != ori_version ){
            sh """#!/bin/bash
            echo "切换版本 ${ori_version}->${target_version}"
            mv -v ${JKROOT}/${ori_version} ${JKROOT}/${target_version} 
            """
        }
        file_list.each{
            if ( it.length()<3 ){
                echo "确定更新 ${it} ??? 这不是个文件吧?"
                return
            }
            if ( !fileExists("${JKROOT}/${it}") ){
                echo "${JKROOT}/${it} 不存在, 检查填写是否正确"
                return
            }
            if (fileExists("${HJROOT}/${it}") ) {
                succ_file.add(it)
            }else{
                fail_file.add(it)
            }
        }

    }
    stage("预处理文件") {
        echo succ_file.join('|')
        echo fail_file.join('|')
        if (fail_file.size()>0){
            echo "文件 ${fail_file.join(' ')} 是新发文件吗?"
            input '确定新发以继续'
            fail_file.each {
                sh """#!/bin/bash
                cd ${JKROOT} && rsync -azRh --exclude='.svn' --exclude='*.log' ${it} ${HJROOT}/
                """
            }
            echo '新发文件处理完成'
        }
        if (succ_file.size()>0){
            succ_file.each {
                echo "${JKROOT}/${it}"
                echo "${HJROOT}/${it}"
                sh (script:"""#!/bin/bash
                diff -u ${JKROOT}/${it} ${HJROOT}/${it} || echo true
                """)
            }
            echo '查看对比记录,确认文件是否正确'
            input '确认修改文件正确?'
            sh "mkdir -p ${BAKPATH}/old && mkdir -p ${BAKPATH}/new"

            succ_file.each {
                sh """#!/bin/bash    
                cd ${HJROOT} && rsync -azRh --exclude='.svn' --exclude='*.log' ${it} ${BAKPATH}/old/
                cd ${JKROOT} && rsync -azRh --exclude='.svn' --exclude='*.log' ${it} ${HJROOT}/
                """
                echo "更新文件${it}处理完成"
            }
        }
    }
    stage('分发服务器') {
        input '是否进行分发?'
        server_list= target_server.tokenize(',')
        send_file = file_list.join(" ")
        echo send_file
        server_list.each {
            echo "分发到${it}"
            sh """#!/bin/bash
            cd ${JKROOT} && rsync -azvR --exclude='.svn' --exclude='*.log' ${send_file} www@${it}:${HJROOT}/
            """
        }
    }
    stage("备份版本") {
        bak_file = file_list.join(" ")
        sh """#!/bin/bash
            mkdir -p ${BAKPATH}/new && cd ${HJROOT} && rsync -azvR --exclude='.svn' --exclude='*.log' ${bak_file} ${BAKPATH}/new/
            rm -fr ${JKROOT}
        """
    }
}
```

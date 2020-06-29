pipeline {
  agent {
    docker {
      image 'node'
      args '-p 3000:3000'
    }
  }

  stages {
    stage("Checkout") {
      steps {
          checkout scm
      }
    }

    stage("Clean") {
      steps {
        sh "npm run clean"
        sh "rm -rf ${WORKSPACE}/node_modules"
      }
    }

      stage("Install Dependencies") {
        steps {
          sh "npm install --registry https://registry.npm.taobao.org"

          sh "npm rebuild node-sass"
        }
      }

      stage("Build") {
        steps {
          sh "npm run build"
        }
      }

      stage("Deliver") {
        // sh "tar -cvf ./archive/release:${BUILD_ID}.tar ./notebook/public"
        steps {
          sh "rm -rf /home/wwwroot/notebook/*"

          sh "mv ./public/*  /home/wwwroot/notebook"
        }
      }
  }
}




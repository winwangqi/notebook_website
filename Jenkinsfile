pipeline {
    agent {
          docker {
              image 'node'
              args '-p 3000:3000'
          }
      }

  stages {
    stage("Checkout") {
         checkout scm
      }

      stage("Prepare") {
      dir("${WORKSPACE}/.cache") {
          deleteDir()
        }

        dir("${WORKSPACE}/public") {
          deleteDir()
        }

        sh "rm -rf /home/wwwroot/notebook/*"


        sh "npm install"
      }

      stage("Build") {
        sh "npm run build"
      }

      stage("Archive") {
        // sh "tar -cvf ./archive/release:${BUILD_ID}.tar ./notebook/public"
        sh "mv  *  /home/wwwroot/notebook"
      }
  }
}

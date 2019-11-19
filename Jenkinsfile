node {
    agent {
          docker {
              image 'node:6-alpine'
              args '-p 3000:3000'
          }
      }

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
    // withEnv(["PATH+NODE=${tool name: 'NodeJS 12.9.1', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    
    // }
    
    // env.NODEJS_HOME = "${tool 'NodeJS 12.9.1'}"
    // on linux / mac
    // env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
}

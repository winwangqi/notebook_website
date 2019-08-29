node {
    def root = tool name: "NodeJS 10.15.1", type: "nodejs"

    withEnv(["PATH+NODEJS=${root}"]) {
        stage("Checkout") {
           checkout scm
        }
        
        stage("Prepare") {
          dir("${WORKSPACE}/public") {
            deleteDir()
          }
          
          sh "npm install"
        }

        stage("Build") {
          sh "npm run build"
        }

        stage("Archive") {
          sh "tar -cvf ./archive/release:${BUILD_ID}.tar ./notebook/public"
          sh "mv ./archive/release:${BUILD_ID}.tar ${CLIENT_ARCHIVE_DIR}"
        }
    }
    // withEnv(["PATH+NODE=${tool name: 'NodeJS 12.9.1', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    
    // }
    
    // env.NODEJS_HOME = "${tool 'NodeJS 12.9.1'}"
    // on linux / mac
    // env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
}
